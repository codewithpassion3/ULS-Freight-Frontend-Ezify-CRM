"use client";
import { Button } from '@/components/ui/button';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export default function AddCardForm({ clientSecret, onOpenChange }: { clientSecret: string, onOpenChange: (open: boolean) => void }) {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const clientQueryClient = useQueryClient();
    const handleSubmit = async (e: any) => {
        setLoading(true);

        e.preventDefault();

        if (!stripe || !elements) return;

        const { error, setupIntent } = await stripe.confirmCardSetup(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement) as any,
                billing_details: { name: 'John Doe' },
            },
        });

        if (error) {
            // console.log("Stripe error:", error);
            return;
        }

        const paymentMethodId = setupIntent?.payment_method;

        if (!paymentMethodId) {
            // console.log("No payment method returned");
            return;
        }

        // console.log("Calling backend...");
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/payments/cards`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: "include",
                body: JSON.stringify({ paymentMethodId }),
            }
        );

        const data = await res.json();
        setLoading(false);
        onOpenChange(false)
        clientQueryClient.invalidateQueries({ queryKey: ['user'] })
    };

    return (
        <form onSubmit={handleSubmit} className="px-4 flex flex-col gap-4">
            <CardElement />
            <div className="flex gap-2 my-2">
                <Button variant="outline" className="w-24">Cancel</Button>
                <Button
                    type="submit"
                    className="bg-primary hover:bg-primary/90 text-white min-w-[120px]"
                    disabled={loading}
                >
                    {loading ? <Loader2 className='animate-spin' /> : ''}
                    Add New Card
                </Button>
            </div>
        </form>
    );
}
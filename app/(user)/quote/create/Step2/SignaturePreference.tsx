import { FormRadio } from "@/components/common/forms/FormRadio"
export default function SignaturePreference() {
    return (
        <div className="border border-border rounded-md p-6 bg-white dark:bg-card space-y-4">
            <FormRadio
                name="signature"
                label="Signature Preference"
                valueType="number"
                defaultValue="1"
                options={[
                    { value: 1, label: "No Signature Required" },
                    { value: 2, label: "Signature Required" },
                    { value: 3, label: "Adult Signature Required" },
                ]}
            />
        </div>
    )
}
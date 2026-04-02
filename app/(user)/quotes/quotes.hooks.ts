import { deleteQuote } from '@/api/services/quotes.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

export type Quote = {
    id: string;
    [key: string]: any;
};

export const useDeleteRecord = () => {
    const queryClient = useQueryClient();

    return useMutation<void, AxiosError<{ message: string }>, string>({
        mutationFn: (id: string) => deleteQuote(id),
        onSuccess: (_, id) => {
            // Invalidate the quotes query
            queryClient.invalidateQueries({ queryKey: ['quotes'] });

            // Optimistically remove the deleted record from cache
            queryClient.setQueryData<Quote[] | undefined>(['quotes'], (oldData) => {
                if (!oldData) return oldData;
                return oldData.filter((record) => record.id !== id);
            });

            toast.success('Record deleted successfully');
        },
        onError: (error) => {
            toast.error(error.response?.data.message || 'Failed to delete record');
        },
    });
};
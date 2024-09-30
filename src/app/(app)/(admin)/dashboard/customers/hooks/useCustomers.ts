import { getAllCustomers } from '@/lib/network/services/customers';
import { useQuery } from '@tanstack/react-query';

const useCustomers = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['customers'],
    queryFn: getAllCustomers,
  });

  return { data: data ?? [], isLoading };
};

export default useCustomers;

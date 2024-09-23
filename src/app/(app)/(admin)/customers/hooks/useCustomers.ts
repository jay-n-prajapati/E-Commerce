import { axiosInstance } from '@/lib/network';
import { useQuery } from '@tanstack/react-query';

const useCustomers = () => {
  const getAllCustomers = async () => {
    const { data } = await axiosInstance.get('/customers');
    return data.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ['customers'],
    queryFn: getAllCustomers,
  });

  return { data: data ?? [], isLoading };
};

export default useCustomers;

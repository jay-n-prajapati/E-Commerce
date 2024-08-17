import { axiosInstance } from '@/lib/network';
import { useQuery } from '@tanstack/react-query';

const useCustomers = () => {
  const getAllCustomers = async () => {
    const { data } = await axiosInstance.get('/customers');
    return data.data;
  };

  const { data } = useQuery({
    queryKey: ['customers'],
    queryFn: getAllCustomers,
  });

  console.log('query', data);

  return { data: data ?? [] };
};

export default useCustomers;

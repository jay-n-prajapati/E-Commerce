import { useToast } from '@/components/ui/use-toast';

const useCustomToast = () => {
  const { toast } = useToast();

  const showToast = (
    variant: 'default' | 'success' | 'warn' | 'destructive' = 'default',
    title: string = 'this is toast',
    description: string = 'this is description'
  ) => {
    toast({
      variant,
      title,
      description,
    });
  };

  return { showToast };
};

export default useCustomToast;

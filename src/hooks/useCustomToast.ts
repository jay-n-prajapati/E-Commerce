import { useToast } from '@/components/ui/use-toast';

const useCustomToast = () => {
  const { toast } = useToast();
  const showToast = (
    variant: 'default' | 'success' | 'warn' | 'destructive' = 'default',
    title: 'Success' | 'Warning!' | 'Error!' | 'Info' = 'Success',
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

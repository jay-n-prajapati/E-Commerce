'use client';

import { Button } from '@/components/ui/button';
import { ECommerceForm } from '@/components/ui/common/ECommerceForm';
import { FcGoogle } from 'react-icons/fc';
import { z } from 'zod';
import Heading2 from '@/components/ui/headings/Heading2';
import { signIn } from 'next-auth/react';
import useCustomToast from '@/hooks/useCustomToast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { EndPoint } from '@/constants/enums';

const LoginFormSchema = z.object({
  email: z.string().email('Email is required'),
  password: z.string({ message: 'Password is required' }),
});

export default function Login() {
  const { showToast } = useCustomToast();
  const router = useRouter();

  const handleLogin = async (e: z.infer<typeof LoginFormSchema>) => {
    const res = await signIn('credentials', {
      ...e,
      endPoint: EndPoint.LOGIN,
      redirect: false,
    });

    if (res?.error) {
      showToast('destructive', 'Error!', res.error);
    } else {
      router.replace('/');
      showToast('success', 'Success', 'Successfully Logged In');
    }
  };

  return (
    <>
      <div className="flex size-full p-4">
        <div className="mx-auto flex size-full items-center justify-center">
          <div className="w-full sm:w-[50%] lg:md:w-96">
            <div>
              <Heading2 className="mb-6 text-center font-semibold">
                Welcome Back to
                <div className="text-primary">E-Commerce</div>
              </Heading2>
            </div>
            <div className="mb-4">
              <Button
                type="submit"
                variant={'outline'}
                size={'lg'}
                className="w-full"
                onClick={() =>
                  signIn('google', { redirect: true, callbackUrl: '/' })
                }
              >
                <FcGoogle className="mr-2 size-6" />
                SignIn With Google
              </Button>
            </div>
            <div className="my-4 flex items-center">
              <hr className="w-full" />
              <span className="mx-4">OR</span>
              <hr className="w-full" />
            </div>
            <ECommerceForm<z.infer<typeof LoginFormSchema>>
              onSubmit={handleLogin}
              formSchema={LoginFormSchema}
              className="w-full"
              elements={[
                {
                  type: 'input',
                  label: 'Email',
                  key: 'email',
                  placeholder: 'Enter your email',
                },
                {
                  type: 'password',
                  label: 'Password',
                  key: 'password',
                  placeholder: 'Enter your password',
                },
              ]}
              initialValues={{ email: '', password: '' }}
            >
              <div>
                <Button type="submit" size={'lg'} className="w-full">
                  Login
                </Button>
              </div>
            </ECommerceForm>
            <div className="text-center">
              Do Not have an account?
              <span>
                <Link href={'/signup'}>
                  <Button variant={'link'}>Signup here</Button>
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

'use client';

import { Button } from '@/components/ui/button';
import { ECommerceForm } from '@/components/ui/common/ECommerceForm';
import { FcGoogle } from 'react-icons/fc';
import { z } from 'zod';
import Heading2 from '@/components/ui/headings/Heading2';
import { signIn } from 'next-auth/react';
import useCustomToast from '@/hooks/useCustomToast';
import { useRouter } from 'next/navigation';

// Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

const SignupFormSchema = z
  .object({
    username: z.string().min(3, ' min. 3 characters required'),
    email: z.string().email('Email is required'),
    password: z
      .string({ message: 'Password is required' })
      .regex(
        passwordValidation,
        'Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character required'
      ),
    cpassword: z.string(),
  })
  .refine((data) => data.password === data.cpassword, {
    message: "Passwords don't match",
    path: ['cpassword'],
  });

export default function Signup() {
  const { showToast } = useCustomToast();
  const router = useRouter();

  const handleSignUp = async (e: z.infer<typeof SignupFormSchema>) => {
    const res = await signIn('credentials', {
      ...e,
      type: 'signup',
      redirect: false,
    });

    if (res?.error) {
      showToast('destructive', 'Sign Up Error', res.error);
    } else {
      router.replace('/');
      showToast('success', 'Login Success', 'User Registered Successfully');
    }
  };

  return (
    <>
      <div className="flex size-full p-4">
        <div className="mx-auto flex size-full items-center justify-center">
          <div className="w-full sm:w-[50%] lg:md:w-96">
            <div>
              <Heading2 className="mb-6 text-center font-semibold">
                Welcome to
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
            <ECommerceForm<z.infer<typeof SignupFormSchema>>
              onSubmit={handleSignUp}
              formSchema={SignupFormSchema}
              className="w-full"
              elements={[
                {
                  type: 'input',
                  label: 'Username',
                  key: 'username',
                  placeholder: 'Enter your name',
                },
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
                {
                  type: 'password',
                  label: 'Confirm Password',
                  key: 'cpassword',
                  placeholder: 'Enter your password',
                },
              ]}
              initialValues={{}}
            >
              <div>
                <Button type="submit" size={'lg'} className="w-full">
                  Sign Up
                </Button>
              </div>
            </ECommerceForm>
          </div>
        </div>
      </div>
    </>
  );
}

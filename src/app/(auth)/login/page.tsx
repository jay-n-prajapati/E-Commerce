'use client';

import { Button } from '@/components/ui/button';
import { ECommerceForm } from '@/components/ui/common/ECommerceForm';
import { FcGoogle } from 'react-icons/fc';
import Image from 'next/image';
import { z } from 'zod';
import Heading2 from '@/components/ui/headings/Heading2';
import { signIn } from 'next-auth/react';

const formSchema = z.object({
  email: z.string().email('Email is required'),
  password: z.string({ message: 'Password is required' }),
});

export default function Login() {
  return (
    <>
      <div className="flex size-full">
        <div className="relative hidden size-full items-center justify-center lg:flex lg:basis-[50%]">
          <Image
            src="/images/Fingerprint-cuate.svg"
            alt="login-illustrator"
            fill
            objectFit="cover"
            priority
            className="bg-primary p-20"
          />
        </div>
        <div className="flex size-full items-center justify-center lg:basis-[50%]">
          <div className="w-[90%] md:w-[70%]">
            <div>
              <Heading2 className="mb-6 text-center font-semibold text-primary">
                Login to account
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
            <ECommerceForm
              onSubmit={(e) => console.log(e)}
              formSchema={formSchema}
              className="w-full"
              elements={[
                {
                  type: 'input',
                  label: 'Email',
                  key: 'email',
                  placeholder: 'Enter your name',
                },
                {
                  type: 'password',
                  label: 'Password',
                  key: 'password',
                  placeholder: 'Enter your password',
                },
              ]}
              initialValues={{}}
            >
              <div>
                <Button type="submit" size={'lg'} className="w-full">
                  Login
                </Button>
              </div>
            </ECommerceForm>
          </div>
        </div>
      </div>
    </>
  );
}

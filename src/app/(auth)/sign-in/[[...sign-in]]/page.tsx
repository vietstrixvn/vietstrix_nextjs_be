// ==============================================
// 📁 app/(auth)/sign-in/page.tsx - FIXED VERSION
// ==============================================

'use client';

import { CustomImage, Input } from '@/components';
import ShuffleLoader from '@/components/loading/shuffle-loader';
import { useAuthStore } from '@/store';
import { loginFormSchema } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import Head from 'next/head';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

export default function LoginPage() {
  const { login, isAuthenticated, userInfo } = useAuthStore();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  // ✅ FIX: Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && userInfo) {
      window.location.href = '/admin';
    }
  }, [isAuthenticated, userInfo]);

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    const { username, password } = values;

    if (password.length < 8) {
      setError('password', {
        type: 'manual',
        message: 'Password must be at least 8 characters.',
      });
      return;
    }

    try {
      const loginSuccess = await login(username, password);

      if (loginSuccess) {
        // ✅ FIX: Don't need manual redirect here, it's handled in store
      } else {
        setError('root', {
          type: 'manual',
          message: 'Invalid username or password',
        });
      }
    } catch {
      setError('root', {
        type: 'manual',
        message: 'Login failed. Please try again.',
      });
    }
  };

  // ✅ FIX: Show loading screen during login
  if (isSubmitting) {
    return <ShuffleLoader />;
  }

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        {/* Left side with illustration */}
        <div className="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex ">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <CustomImage
              src="/icons/logo.svg"
              alt="Logo"
              width={30}
              height={30}
              className="inline-block mr-2"
            />
            VIETSTRIX
          </div>

          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This starter template has saved me countless hours of
                work and helped me deliver projects to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Random Dude</footer>
            </blockquote>
          </div>
        </div>

        {/* Right side with login form */}
        <div className="flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-sm space-y-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-main mb-6">VietStrix</h1>
              <h2 className="text-xl text-gray-600">
                Welcome to VietStrix Dashboard
              </h2>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <label className="text-sm text-gray-500" htmlFor="username">
                  USERNAME
                </label>
                <Input
                  id="username"
                  placeholder="VIETSTRIX account"
                  className="w-full p-2 border rounded"
                  {...register('username')}
                />
                {errors.username && (
                  <p className="text-sm text-red-500">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-500" htmlFor="password">
                  PASSWORD
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="password"
                  className="w-full p-2 border rounded"
                  {...register('password')}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* ✅ FIX: Show root errors */}
              {errors.root && (
                <p className="text-sm text-red-500 text-center">
                  {errors.root.message}
                </p>
              )}

              <button
                type="submit"
                className="w-full font-bold text-xl bg-main hover:bg-main-400 text-white p-3 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

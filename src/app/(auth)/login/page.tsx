'use client';

import { Input, CustomImage } from '@/components';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormSchema } from '@/utils';
import { useAuthStore } from '@/store';
import ShuffleLoader from '@/components/loading/shuffle-loader';

export default function LoginPage() {
  const { login } = useAuthStore();

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
        // Không gọi checkAuth() nữa vì login() đã handle rồi
        // router.push('/admin');
      } else {
        setError('root', {
          type: 'manual',
          message: 'Invalid username or password',
        });
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('root', {
        type: 'manual',
        message: 'Login failed. Please try again.',
      });
    }
  };

  if (isSubmitting) {
    return (
      <div>
        <ShuffleLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side with illustration */}
      <div className="relative hidden lg:flex flex-col items-center justify-center p-8 bg-main text-white">
        <div className="max-w-md mx-auto text-center space-y-6">
          <CustomImage
            src="/icons/logo.svg"
            alt="Decorative bird illustration"
            width={300}
            height={300}
            className="mx-auto"
          />
          <h2 className="text-2xl  lg:text-6xl font-bold ">VIETSTRIX</h2>
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

          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(onSubmit)(e);
            }}
          >
            <div className="space-y-2">
              <label className="text-sm text-gray-500" htmlFor="email">
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
              />{' '}
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full font-bold text-xl bg-main hover:bg-main-400 text-white p-3 rounded"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Loading...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

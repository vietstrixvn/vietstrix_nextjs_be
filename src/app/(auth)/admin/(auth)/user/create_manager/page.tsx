'use client';

import { Button, Input, Label } from '@/components';
import { AdminContainer } from '@/components/container/admin.contaier';
import { Heading } from '@/components/design/Heading';
import { useCreateManager } from '@/hooks/auth/useManager';
import type { CreateManagerData } from '@/types';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

const Page = () => {
  const { mutate: createManager } = useCreateManager();
  const router = useRouter();
  const [managerData, setManagerData] = useState<CreateManagerData>({
    username: '',
    name: '',
    email: '',
    password: '',
    phone_number: '',
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof CreateManagerData, string>>
  >({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Partial<Record<keyof CreateManagerData, string>> = {};
    let isValid = true;

    // Validate username
    if (!managerData.username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    }

    // Validate name
    if (!managerData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    // Validate email
    if (!managerData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(managerData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    // Validate password
    if (!managerData.password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (managerData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    // Validate phone number
    if (!managerData.phone_number.trim()) {
      newErrors.phone_number = 'Phone number is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCreateManager = async () => {
    if (!validateForm()) {
      toast.error('Please fix the authentication error');
      return;
    }

    setLoading(true);

    try {
      await createManager(managerData);
      // Reset state
      setManagerData({
        username: '',
        name: '',
        email: '',
        password: '',
        phone_number: '',
      });
      // Optionally navigate to another page
      router.push('/admin/user');
    } catch (error) {
      console.error(error);
      // Error is already handled by the mutation hook
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setManagerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name as keyof CreateManagerData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <AdminContainer>
      {/* <BackButton href="/admin/user" /> */}
      <div className="flex justify-between items-center">
        <Heading
          name="Create administrator"
          desc="Create new management account"
        />
        <Button onClick={handleCreateManager} disabled={loading}>
          {loading ? 'Creating...' : 'Create'}
        </Button>
      </div>
      <form
        className="flex flex-col space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateManager();
        }}
      >
        {[
          { label: 'Username', name: 'username' },
          { label: 'Full Name', name: 'name' },
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Password', name: 'password', type: 'password' },
          { label: 'Tel', name: 'phone_number' },
        ].map(({ label, name, type = 'text' }) => (
          <div
            key={name}
            className="mt-4 grid grid-cols-[150px_1fr] items-center gap-4"
          >
            <Label className="text-right" htmlFor={name}>
              {label}
            </Label>
            <div className="flex flex-col w-full">
              <Input
                id={name}
                type={type}
                name={name}
                value={managerData[name as keyof CreateManagerData] as string}
                onChange={handleInputChange}
                required
                placeholder={`Enter manager ${label.toLowerCase()}`}
                className={
                  errors[name as keyof CreateManagerData]
                    ? 'border-red-500'
                    : ''
                }
              />
              {errors[name as keyof CreateManagerData] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[name as keyof CreateManagerData]}
                </p>
              )}
            </div>
          </div>
        ))}
      </form>
    </AdminContainer>
  );
};

export default Page;

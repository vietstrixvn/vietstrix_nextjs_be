'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function UnauthorizedPage() {
  const router = useRouter();

  useEffect(() => {
    toast.error(
      'No Access – You do not have sufficient permission to view this page.'
    );

    const timer = setTimeout(() => {
      router.replace('/admin');
    }, 1500); // delay để người dùng kịp đọc thông báo

    return () => clearTimeout(timer);
  }, [router]);

  return null;
}

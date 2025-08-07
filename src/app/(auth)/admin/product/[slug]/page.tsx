'use client';

import { useParams } from 'next/navigation';
import { ProductGallery } from '@/components/pages/product/product-gallery';
import { ProductDetailData } from '@/lib';
import { LoadingSpin, NoResultsFound } from '@/components';
import Link from 'next/link';
import { AdminContainer } from '@/components/wrappers/admin.wrapper';
import { AdminBreadCrumb } from '@/components/layout/AdminLayout/admin.breadcrumb';

export default function Page() {
  const routerParams = useParams();
  const slug = Array.isArray(routerParams?.slug)
    ? routerParams.slug[0]
    : routerParams?.slug;

  if (!slug) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpin />
      </div>
    );
  }

  const { product, isLoading, isError } = ProductDetailData(slug, 0);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpin />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <NoResultsFound />
      </div>
    );
  }

  if (!product?.title || !product?.content) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpin />
      </div>
    );
  }

  return (
    <AdminContainer>
      <div className="mb-8">
        <AdminBreadCrumb title="Dịch Vụ" />
      </div>
      <Link
        href="/admin/product"
        className="inline-block mb-8 text-gray-600 hover:text-gray-900 transition-colors"
      >
        ← Quay lại
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <ProductGallery
            images={product?.files?.map((img) => img.name) || []}
          />
        </div>

        <div className="flex flex-col space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product?.title}</h1>
            <p className="text-base text-gray-600">{product?.content}</p>
            <div className="flex items-center mt-2"></div>
          </div>
          <div className="text-3xl font-bold">
            {product?.price && product.price > 0 ? (
              `${new Intl.NumberFormat('vi-VN').format(product.price)}đ`
            ) : (
              <span className="text-red-500  underline animate-pulse">
                Liên hệ
              </span>
            )}
          </div>

          <div className="pt-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Chi tiết</h3>
              <div
                className="rich-text-content mt-4"
                dangerouslySetInnerHTML={{
                  __html: product.content ?? '',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </AdminContainer>
  );
}

import { z } from 'zod';
import { zodIsNotEmptyString } from './empty.validator';

export const SEOFormSchema = z.object({
  site_title: zodIsNotEmptyString('Site title cannot be empty'),
  site_description: zodIsNotEmptyString('Site description cannot be empty'),
  domain: zodIsNotEmptyString('Domain cannot be empty'),
  keywords: z
    .array(zodIsNotEmptyString('Keyword cannot be empty'))
    .min(1, 'At least one keyword is required'),
  google_analytics_id: zodIsNotEmptyString(
    'Google Analytics ID cannot be empty'
  ),
  gtm_id: zodIsNotEmptyString('GTM ID cannot be empty'),
  facebook_pixel_id: zodIsNotEmptyString('Facebook Pixel ID cannot be empty'),
  search_console_verification: zodIsNotEmptyString(
    'Search Console verification code cannot be empty'
  ),
});

export const WebsiteFormSchema = z.object({
  phone_number: zodIsNotEmptyString('Site title cannot be empty'),
  messenger: zodIsNotEmptyString('Site description cannot be empty'),
  mail: z
    .array(zodIsNotEmptyString('Email cannot be empty'))
    .min(1, 'At least one keyword is required'),

  fb: zodIsNotEmptyString('Domain cannot be empty'),

  ig: zodIsNotEmptyString('Google Analytics ID cannot be empty'),
  github: zodIsNotEmptyString('GTM ID cannot be empty'),
  linkedin: zodIsNotEmptyString('Facebook Pixel ID cannot be empty'),
  upwork: zodIsNotEmptyString(
    'Search Console verification code cannot be empty'
  ),
  pinterest: zodIsNotEmptyString(
    'Search Console verification code cannot be empty'
  ),
  dribbble: zodIsNotEmptyString(
    'Search Console verification code cannot be empty'
  ),
});

export const loginFormSchema = z.object({
  username: zodIsNotEmptyString('Username cannot be empty'),

  password: zodIsNotEmptyString('Password cannot be empty').refine(
    (val) => val.length >= 8,
    {
      message: 'Password must be at least 8 characters long',
    }
  ),
});

// This schema is used for employee form validation
export const employeeFormSchema = z.object({
  username: zodIsNotEmptyString('Tên đăng nhập không được để trống'),
  email: zodIsNotEmptyString('Email không được để trống'),
  name: zodIsNotEmptyString('Họ và tên không được để trống'),
  password: zodIsNotEmptyString('Mật khẩu không được để trống'),
});

export const blogFormSchema = z.object({
  title: zodIsNotEmptyString('Title cannot be empty'),
  content: zodIsNotEmptyString('Content cannot be empty'),
  description: zodIsNotEmptyString('Short description cannot be empty'),
  status: zodIsNotEmptyString('Status cannot be empty'),
  category: zodIsNotEmptyString('Category cannot be empty'),
  file: zodIsNotEmptyString('Image cannot be empty'),
});

export const serviceFormSchema = z.object({
  title: zodIsNotEmptyString('Tiêu đề không được để trống'),
  content: zodIsNotEmptyString('Nội dung không được để trống'),
  description: zodIsNotEmptyString('Mô tả ngắn không được để trống'),
  price: zodIsNotEmptyString('Giá không được để trống'),
  status: zodIsNotEmptyString('Trạng thái không được để trống'),
  category: zodIsNotEmptyString('Danh mục không được để trống'),
  file: zodIsNotEmptyString('Ảnh không được để trống'),
});

// Rồi trong schema:
export const contactSentFormSchema = z.object({
  name: zodIsNotEmptyString('Tên không được để trống'),

  email: z
    .string()
    .min(1, 'Email không được để trống')
    .email('Email không đúng định dạng'),

  phone_number: zodIsNotEmptyString('Số điện thoại không được để trống'),

  message: zodIsNotEmptyString('Vui lòng nhập nội dung tin nhắn'),
});

export const ProductFormSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters.' }),
  content: z.string().min(1, { message: 'Content is required.' }),
  price: z.string().refine((val) => !isNaN(Number(val)), {
    message: 'Price must be a number.',
  }),
  category: z.string().min(1, 'Category is required'),
  status: z.string().optional(),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters.' }),
  file: z
    .array(z.string().min(1, 'File path cannot be empty'))
    .nonempty('Ảnh không được để trống và phải chọn ít nhất 1 ảnh'),
});

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

// Verification code schema
export const verificationSchema = z.object({
  code: z.string().length(6, 'Verification code must be 6 digits'),
});

export const categoryFormSchema = z.object({
  title: zodIsNotEmptyString('name is required'),
  type: zodIsNotEmptyString('type is required'),
});

export const categoryUpdateFormSchema = z.object({
  title: zodIsNotEmptyString('name is required'),
});

export const projectFormSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  content: z.string().min(10, {
    message: 'Content must be at least 10 characters.',
  }),
  thumbnail: zodIsNotEmptyString('Ảnh không được để trống'),
  services: z
    .array(z.string().uuid({ message: 'Each service must be a valid UUID' }))
    .min(1, { message: 'Please select at least one service.' }),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.',
  }),
  brandName: z.string().min(2, {
    message: 'Brand name must be at least 2 characters.',
  }),
  testimonial: z.string().optional(),
  client: z.string().min(2, {
    message: 'Client name must be at least 2 characters.',
  }),
  link: z.string().url({ message: 'Please enter a valid URL.' }).optional(),
  status: z.string().optional(),
});

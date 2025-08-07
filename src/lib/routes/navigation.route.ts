import { ComponentsIcons } from '@/assets/icons/icons';
import { ROUTES } from './routes';

export const Name = {
  HOME: 'Trang Chủ ',
  COMPANY: 'Về Chúng tôi',
  SERVICE: 'Dịch Vụ & Công Nghiệp',
  BLOG: 'Bài Viết',
  PRODUCT: 'Sản Phẩm',
};

export const navItems = [
  { name: Name.HOME, href: ROUTES.HOME },
  { name: Name.COMPANY, href: ROUTES.COMPANY },
  { name: Name.SERVICE, href: ROUTES.SERVICE.ROOT },
  { name: Name.BLOG, href: ROUTES.BLOG.ROOT },
  { name: Name.PRODUCT, href: ROUTES.PRODUCT.ROOT },
];

// This is sample data.
export const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: ROUTES.DASHBOARD,
      icon: ComponentsIcons.LayoutDashboard,
    },
  ],
  navAdmin: [
    {
      title: 'User',
      url: '/admin/user',
      icon: ComponentsIcons.LayoutDashboard,
    },
    {
      title: 'SEO',
      url: '/admin/seo',
      icon: ComponentsIcons.Search,
    },
  ],
  navService: [
    {
      title: 'Thể Loại',
      url: '/admin/category',
      icon: ComponentsIcons.ChartBarStacked,
    },
    {
      title: 'Bài Viết',
      url: '/admin/blog',
      icon: ComponentsIcons.List,
    },
    {
      title: 'Sản Phẩm',
      url: '/admin/product',
      icon: ComponentsIcons.Package,
    },
    {
      title: 'Dịch Vụ',
      url: '/admin/service',
      icon: ComponentsIcons.Package,
    },
    {
      title: 'Dự Án',
      url: '/admin/project',
      icon: ComponentsIcons.SquareChartGantt,
    },
  ],
  navSupport: [
    {
      title: 'Liên Hệ',
      url: '/admin/contact',
      icon: ComponentsIcons.Contact,
    },
  ],
};

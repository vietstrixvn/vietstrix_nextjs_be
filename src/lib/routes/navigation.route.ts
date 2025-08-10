import { ComponentsIcons } from '@/assets/icons/icons';
import { ROUTES } from './routes';

export const Name = {
  HOME: 'Home',
  ABOUT: 'ABOUT',
  SHOW_CASE: 'SHOW CASE',
  WORK: 'HOW DO WE WORK',
};

export const navItems = [
  // { name: Name.HOME, href: ROUTES.HOME },
  { name: Name.ABOUT, href: ROUTES.COMPANY },
  { name: Name.SHOW_CASE, href: ROUTES.PROJECT.ROOT },
  { name: Name.WORK, href: ROUTES.WORK },
];

export const data = {
  version: '1.0.0',
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
      title: 'Category',
      url: '/admin/category',
      icon: ComponentsIcons.ChartBarStacked,
    },
    {
      title: 'Blog',
      url: '/admin/blog',
      icon: ComponentsIcons.List,
    },
    {
      title: 'Service',
      url: '/admin/service',
      icon: ComponentsIcons.Package,
    },
    {
      title: 'Project',
      url: '/admin/project',
      icon: ComponentsIcons.SquareChartGantt,
    },
  ],
  navSupport: [
    {
      title: 'Contact',
      url: '/admin/contact',
      icon: ComponentsIcons.Contact,
    },
  ],
};

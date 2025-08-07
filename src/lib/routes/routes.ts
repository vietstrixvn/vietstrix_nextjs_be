function deepFreeze<T>(obj: T): T {
  Object.getOwnPropertyNames(obj).forEach((key) => {
    const prop = (obj as any)[key];
    if (typeof prop === 'object' && prop !== null) {
      deepFreeze(prop);
    }
  });
  return Object.freeze(obj);
}

type RouteMap = {
  readonly HOME: string;
  readonly COMPANY: string;
  readonly CONTACT: string;

  readonly BLOG: {
    readonly ROOT: string;
    readonly DETAIL: (slug: string) => string;
    readonly ID: string;
  };
  readonly SERVICE: {
    readonly ROOT: string;
    readonly DETAIL: (slug: string) => string;
    readonly ID: string;
  };
  readonly PRODUCT: {
    readonly ROOT: string;
    readonly DETAIL: (slug: string) => string;
    readonly ID: string;
  };
  readonly PROJECT: {
    readonly ROOT: string;
    readonly DETAIL: (slug: string) => string;
    readonly ID: string;
  };

  // Private route
  readonly LOGIN: string;
  readonly DASHBOARD: string;
  readonly ADMIN_CATEGORY: string;
  readonly ADMIN_CONTACT: string;
  readonly ADMIN_SEO: string;
};

export const ROUTES: Readonly<RouteMap> = deepFreeze({
  HOME: '/',
  COMPANY: '/company',
  CONTACT: '/contact',

  BLOG: {
    ROOT: '/blogs',
    DETAIL: (slug: string) => `/services/${slug}`,
    ID: '123',
  },
  SERVICE: {
    ROOT: '/services',
    DETAIL: (slug: string) => `/services/${slug}`,
    ID: '123',
  },
  PRODUCT: {
    ROOT: '/products',
    DETAIL: (slug: string) => `/services/${slug}`,
    ID: '123',
  },
  PROJECT: {
    ROOT: '/company',
    DETAIL: (slug: string) => `/company/project/${slug}`,
    ID: '123',
  },

  LOGIN: '/admin/login',

  DASHBOARD: '/admin',
  ADMIN_CATEGORY: '/admin/category',
  ADMIN_CONTACT: '',
  ADMIN_SEO: '',
} as const);

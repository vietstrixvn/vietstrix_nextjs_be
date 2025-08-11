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
  readonly WORK: string;

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
  readonly ADMIN_WEBSITE: string;
};

export const ROUTES: Readonly<RouteMap> = deepFreeze({
  HOME: '/',
  COMPANY: '/company',
  CONTACT: '/contact',

  WORK: '/work',
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

  LOGIN: '/admin/sign-in',

  DASHBOARD: '/admin',
  ADMIN_CATEGORY: '/admin/category',
  ADMIN_CONTACT: '',
  ADMIN_WEBSITE: '/website',
} as const);

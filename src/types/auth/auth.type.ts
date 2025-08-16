import { BaseModel } from '../base/base.type';

export interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  userInfo: UserData | null;

  // Actions
  clearError: () => void;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  fetchUserInfo: () => Promise<void>;
  checkAuth: (shouldRedirect?: boolean, maxRetry?: number) => Promise<void>;
}
/**
 * ==========================
 *  @COOKIES
 * ==========================
 */

export interface AuthResponse<T = any> {
  response: Response;
  data: T;
}

/**
 * ==========================
 *  @AUTH
 * ==========================
 */

export interface UserData extends BaseModel {
  username: string;
  name: string;
  email: string;
  phone_number: string;
  role: string;
}

export interface PersistedUserInfo extends BaseModel {
  username: string;
  name: string;
  email: string;
  phone_number: string;
  role: string;
}

export interface LoginResponse {
  data: {
    token: string;
    expired: string;
    user: UserData;
  };
}

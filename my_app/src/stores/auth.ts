import { create } from 'zustand';

type AuthState = {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
};

const TOKEN_KEY = 'token';

export const useAuth = create<AuthState>((set) => ({
  token: localStorage.getItem(TOKEN_KEY),
  login: (token) => {
    localStorage.setItem(TOKEN_KEY, token);
    set({ token });
  },
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    set({ token: null });
  },
}));

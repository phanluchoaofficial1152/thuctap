import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  name: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  token: null,
  name: null,
  login: async (username, password) => {
    try {
      const response = await fetch(
        "https://api-pro.teklearner.com/auth/v1/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        set({
          isAuthenticated: true,
          token: data.data.accessToken,
          name: data.data.name,
        });
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  },
  logout: () => set({ isAuthenticated: false, token: null, name: null }),
}));

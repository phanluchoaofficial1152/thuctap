import jwt from "jsonwebtoken";
import { create } from "zustand";
import Cookies from "js-cookie";
import crypto from "crypto";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  name: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  getDisplayName: () => string | null;
  checkAuthStatus: () => void;
}

const SECRET_KEY: string =
  "NnhBqVmsDCnZNP4TiX3665fWfQyw+pLblK7TIMHsg7Nrle4mySNhaXRZyHjBPXYNyDY+lnm0rFd5gFJM2klkdhjOyTV9MsAAzq85MqJQL/ViQiIt3vch1A7efKckaS3fOcqOzSV7TYN/awbPIH8/tfa/lI6ByaUgTvYpIUm2Y2pm/LFTD6AIBDyFWwhhnz1cUCxI//CmFy4lfxkJswNdB7vzhoHlgReAdlOeVYwQxjIvRW3rybYuGqGoSF+fBdRR/liFnRg8/oOnAYEl113ik/kUiXWG/u5ApU+9gL9ZwS/vHSXMEi8BqjCd0cDOzZ7oOrffP7t47skDkQkCJSDcRg==";

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

        const headers = {
          alg: "HS256",
          typ: "JWT",
        };

        const payload = {
          name: String(data.data.name),
        };

        const encodedHeaders: string = Buffer.from(JSON.stringify(headers))
          .toString("base64")
          .replace(/=/g, "")
          .replace(/\+/g, "-")
          .replace(/\//g, "_");

        const encodedPayload: string = Buffer.from(JSON.stringify(payload))
          .toString("base64")
          .replace(/=/g, "")
          .replace(/\+/g, "-")
          .replace(/\//g, "_");

        const tokenData: string = `${encodedHeaders}.${encodedPayload}`;

        const hmac = crypto.createHmac("sha256", SECRET_KEY);

        const signature: string = hmac
          .update(tokenData)
          .digest("base64")
          .replace(/=/g, "")
          .replace(/\+/g, "-")
          .replace(/\//g, "_");

        const token: string = `${tokenData}.${signature}`;

        Cookies.set("access_token", token, { expires: 2 });
        set({
          isAuthenticated: true,
          token,
          name: data.data.name,
        });
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  },

  logout: () => {
    Cookies.remove("access_token");
    set({ isAuthenticated: false, token: null, name: null });
  },

  getDisplayName: () => {
    const token = Cookies.get("access_token");
    if (token) {
      try {
        const tokenParts = token.split(".");
        if (tokenParts.length !== 3) {
          throw new Error("token không đúng format!");
        }

        const encodedPayload = tokenParts[1];

        const payload = JSON.parse(
          Buffer.from(encodedPayload, "base64").toString("utf-8")
        );

        return payload.name || null;
      } catch (error) {
        console.error("Lỗi khi xác minh token:", error);
        return null;
      }
    }
    return null;
  },

  checkAuthStatus: () => {
    const token = Cookies.get("access_token");
    if (token) {
      set({
        isAuthenticated: true,
        token,
        name: useAuthStore.getState().getDisplayName(),
      });
    }
  },
}));

useAuthStore.getState().checkAuthStatus();

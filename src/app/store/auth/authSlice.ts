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
  refreshToken: () => void;
  scheduleTokenRefresh: () => void;
}

const SECRET_KEY: Buffer = crypto
  .createHash("sha256")
  .update(String(process.env.NEXT_PUBLIC_KEY_SECRET))
  .digest();

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

        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv("aes-256-gcm", SECRET_KEY, iv);

        let encrypted = cipher.update(data.data.name, "utf8", "base64");
        encrypted += cipher.final("base64");

        const mac = cipher.getAuthTag().toString("hex");

        const headers = {
          alg: "HS512",
          typ: "JWT",
          iv: iv.toString("base64"),
          value: encrypted,
          mac,
        };

        const encodeBase64Url = (str: string) => {
          return Buffer.from(str)
            .toString("base64")
            .replace(/=/g, "")
            .replace(/\+/g, "-")
            .replace(/\//g, "_");
        };

        const encodedHeaders: string = encodeBase64Url(JSON.stringify(headers));
        const encodedPayload: string = encodeBase64Url(JSON.stringify({}));

        const tokenData: string = `${encodedHeaders}.${encodedPayload}`;
        const hmac = crypto.createHmac("sha512", SECRET_KEY);
        const signature: string = encodeBase64Url(
          hmac.update(tokenData).digest("base64")
        );

        const token: string = `${tokenData}.${signature}`;

        Cookies.set("access_token", token, { expires: 5 / (24 * 60) });

        set({
          isAuthenticated: true,
          token,
          name: data.data.name,
        });

        useAuthStore.getState().scheduleTokenRefresh();
      } else {
        throw new Error("Đăng nhập thất bại!");
      }
    } catch (error) {
      console.error("Đăng nhập thất bại:", error);
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
          throw new Error("Token không đúng format!");
        }

        const encodedHeaders = tokenParts[0];
        const headers = JSON.parse(
          Buffer.from(encodedHeaders, "base64").toString("utf-8")
        );

        const decipher = crypto.createDecipheriv(
          "aes-256-gcm",
          SECRET_KEY,
          Buffer.from(headers.iv, "base64")
        );

        decipher.setAuthTag(Buffer.from(headers.mac, "hex"));
        let decrypted = decipher.update(headers.value, "base64", "utf8");
        decrypted += decipher.final("utf8");

        return decrypted || null;
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
      const name = useAuthStore.getState().getDisplayName();

      if (name) {
        set({
          isAuthenticated: true,
          token,
          name,
        });

        useAuthStore.getState().scheduleTokenRefresh();
      } else {
        useAuthStore.getState().refreshToken();
      }
    }
  },

  refreshToken: () => {
    const token = Cookies.get("access_token");

    if (token) {
      try {
        const tokenParts = token.split(".");
        if (tokenParts.length !== 3) {
          throw new Error("Token không đúng format!");
        }

        const encodedHeaders = tokenParts[0];
        const headers = JSON.parse(
          Buffer.from(encodedHeaders, "base64").toString("utf-8")
        );

        const iv = Buffer.from(headers.iv, "base64");
        const decipher = crypto.createDecipheriv("aes-256-gcm", SECRET_KEY, iv);

        decipher.setAuthTag(Buffer.from(headers.mac, "hex"));
        let decrypted = decipher.update(headers.value, "base64", "utf8");
        decrypted += decipher.final("utf8");

        const cipher = crypto.createCipheriv("aes-256-gcm", SECRET_KEY, iv);
        let encrypted = cipher.update(decrypted, "utf8", "base64");
        encrypted += cipher.final("base64");

        const mac = cipher.getAuthTag().toString("hex");
        const newHeaders = {
          ...headers,
          value: encrypted,
          mac,
        };

        const encodeBase64Url = (str: string) => {
          return Buffer.from(str)
            .toString("base64")
            .replace(/=/g, "")
            .replace(/\+/g, "-")
            .replace(/\//g, "_");
        };

        const newEncodedHeaders: string = encodeBase64Url(
          JSON.stringify(newHeaders)
        );

        const newTokenData: string = `${newEncodedHeaders}.${tokenParts[1]}`;
        const hmac = crypto.createHmac("sha512", SECRET_KEY);
        const newSignature: string = encodeBase64Url(
          hmac.update(newTokenData).digest("base64")
        );

        const newToken: string = `${newTokenData}.${newSignature}`;
        Cookies.set("access_token", newToken, { expires: 30 / (24 * 60) });

        set({ token: newToken });
      } catch (error) {
        console.error("Lỗi khi refresh token:", error);
        Cookies.remove("access_token");
        set({ isAuthenticated: false, token: null, name: null });
      }
    }
  },

  scheduleTokenRefresh: () => {
    const token = Cookies.get("access_token");
    if (token) {
      setTimeout(() => {
        useAuthStore.getState().refreshToken();
      }, 4 * 60 * 1000);
    }
  },
}));

useAuthStore.getState().checkAuthStatus();

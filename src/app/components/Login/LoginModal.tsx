"use client";

import { useState } from "react";
import { useAuthStore } from "@/app/store/auth/authSlice";
import { auth, provider } from "@/app/firebase/firebaseConfig";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GoogleIcon from "@mui/icons-material/Google";
import { signInWithPopup } from "firebase/auth";
import { message } from "antd";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginModal = () => {
  const [visible, setVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });
  const { login, isAuthenticated } = useAuthStore();
  const router = useRouter();

  const url: string = "https://api-pro.teklearner.com";

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    setErrors({ username: "", password: "" });
  };

  const validateEmail = (email: string) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const validateForm = () => {
    let formErrors = { username: "", password: "" };
    let isValid = true;

    if (!username) {
      formErrors.username = "Email là bắt buộc. Không được để trống.";
      isValid = false;
    } else if (!validateEmail(username)) {
      formErrors.username = "Email không đúng định dạng.";
      isValid = false;
    }

    if (!password) {
      formErrors.password = "Mật khẩu là bắt buộc. Không được để trống.";
      isValid = false;
    } else if (!validatePassword(password)) {
      formErrors.password = "Mật khẩu phải có ít nhất 6 ký tự.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      try {
        await login(username, password);

        if (isAuthenticated) {
          handleCancel();
        }
      } catch (error: any) {
        message.error(error.message);
        console.log("Login error:", error);
      }
    }
  };

  const checkEmailGoogle = async (email: string) => {
    try {
      const response = await axios.post(`${url}/auth/v1/check-email`, {
        email,
      });

      if (response.data.data === true) {
        return true;
      } else {
        message.error("Email không tồn tại trong hệ thống.");
        return false;
      }
    } catch (error: any) {
      message.error(error.message);
      console.log("Lỗi: ", error);
      return false;
    }
  };

  const handleLoginGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const email: any = user.email;

      if (email.length > 0) {
        const valid = await checkEmailGoogle(email);

        if (valid) {
          const fullAccessToken = await user.getIdToken();
          const accessToken = fullAccessToken.slice(0, 20);
          const password = accessToken;

          await login(email, password);
          if (isAuthenticated) {
            handleCancel();
          }
        } else {
          message.error("Email không tồn tại trong hệ thống.");
        }
      } else {
        message.error("Không thể tìm thấy email, vui lòng đăng nhập lại.");
      }
    } catch (error: any) {
      message.error(`${error.message}`);
      console.log("Lỗi đăng nhập với Google: ", error.message);
    }
  };

  const handleBlur = (field: string) => {
    let formErrors = { ...errors };

    if (field === "username" && !validateEmail(username)) {
      formErrors.username = "Email không đúng định dạng.";
    }

    if (field === "password" && !validatePassword(password)) {
      formErrors.password = "Mật khẩu phải có ít nhất 6 ký tự.";
    }

    setErrors(formErrors);
  };

  const handleRegisterClick = () => {
    handleCancel();
    setTimeout(() => {
      router.push("/pages/taikhoan/dangky");
    }, 500);
  };

  return (
    <>
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={showModal}
      >
        <span className="text-xl">
          <FaUserCircle />
        </span>
        <span>User</span>
      </div>
      <Dialog open={visible} onClose={handleCancel} maxWidth="sm" fullWidth>
        <DialogTitle>
          Sign In
          <IconButton
            aria-label="close"
            onClick={handleCancel}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <div className="space-y-4">
            <TextField
              name="username"
              type="email"
              label="Email"
              fullWidth
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (errors.username && validateEmail(e.target.value)) {
                  setErrors({ ...errors, username: "" });
                }
              }}
              onBlur={() => handleBlur("username")}
              error={!!errors.username}
              helperText={errors.username}
              autoComplete="email"
            />
            <TextField
              name="password"
              type="password"
              label="Password"
              fullWidth
              onBlur={() => handleBlur("password")}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password && validatePassword(e.target.value)) {
                  setErrors({ ...errors, password: "" });
                }
              }}
              error={!!errors.password}
              helperText={errors.password}
              autoComplete="current-password"
            />
            <Button
              onClick={handleLogin}
              fullWidth
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
          </div>
          <Typography
            variant="body2"
            sx={{ textAlign: "center", marginTop: 2 }}
          >
            <Button color="primary">Forgot Password?</Button>
            <Button color="primary" onClick={handleRegisterClick}>
              Register Now
            </Button>
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{ justifyContent: "center", marginBottom: 1, marginTop: 1 }}
        >
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<GoogleIcon />}
            onClick={handleLoginGoogle}
          >
            Login with Google
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LoginModal;

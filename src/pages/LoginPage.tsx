import { useState } from "react";
import type { FormEvent } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface LoginErrors {
  username?: string;
  password?: string;
  form?: string;
}

export default function LoginPage() {
  const { user, login } = useAuth();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});

  // Đăng nhập xong thì quay lại trang trước đó (hoặc trang chủ)
  if (user) return <Navigate to={from} replace />;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: LoginErrors = {};
    if (!username.trim()) newErrors.username = "Vui lòng nhập tên đăng nhập.";
    if (!password) newErrors.password = "Vui lòng nhập mật khẩu.";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const ok = login(username.trim(), password);
    if (!ok) {
      setErrors({ form: "Tên đăng nhập hoặc mật khẩu không đúng." });
    }
  };

  return (
    <section className="form-card">
      <h1 className="page-title">Đăng nhập</h1>
      {from !== "/" && (
        <div className="alert alert-info" role="status">
          Bạn cần đăng nhập để truy cập trang này.
        </div>
      )}
      {errors.form && (
        <div className="alert alert-error" role="alert">
          {errors.form}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="username">Tên đăng nhập</label>
          <input
            id="username"
            className={`input ${errors.username ? "input-invalid" : ""}`}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
          {errors.username && <p className="field-error">{errors.username}</p>}
        </div>

        <div className="field">
          <label htmlFor="password">Mật khẩu</label>
          <input
            id="password"
            type="password"
            className={`input ${errors.password ? "input-invalid" : ""}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          {errors.password && <p className="field-error">{errors.password}</p>}
        </div>

        <button type="submit" className="btn btn-primary">
          Đăng nhập
        </button>
      </form>
    </section>
  );
}

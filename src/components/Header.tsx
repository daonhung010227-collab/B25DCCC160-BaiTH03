import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectCartCount } from "../features/cart/cartSlice";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

export default function Header() {
  const cartCount = useAppSelector(selectCartCount);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand">
          ShopMini
        </Link>
        <nav className="nav-links" aria-label="Điều hướng chính">
          <NavLink to="/" end>
            Trang chủ
          </NavLink>
          <NavLink to="/cart">Giỏ hàng ({cartCount})</NavLink>
          {user ? (
            <>
              <span className="nav-user">Xin chào, {user.username}</span>
              <button type="button" className="btn btn-outline" onClick={handleLogout}>
                Đăng xuất
              </button>
            </>
          ) : (
            <NavLink to="/login">Đăng nhập</NavLink>
          )}
          <button type="button" className="btn btn-outline" onClick={toggleTheme}>
            {theme === "light" ? "Giao diện tối" : "Giao diện sáng"}
          </button>
        </nav>
      </div>
    </header>
  );
}

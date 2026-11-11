import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  clearCart,
  removeFromCart,
  selectCartItems,
  selectCartTotal,
  updateQuantity,
} from "../features/cart/cartSlice";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);

  if (items.length === 0) {
    return (
      <section>
        <h1 className="page-title">Giỏ hàng</h1>
        <p className="empty">Giỏ hàng đang trống.</p>
        <p className="center">
          <Link to="/" className="btn btn-primary">
            Tiếp tục mua sắm
          </Link>
        </p>
      </section>
    );
  }

  return (
    <section>
      <h1 className="page-title">Giỏ hàng</h1>

      <ul className="cart-list">
        {items.map(({ product, quantity }) => (
          <li key={product.id} className="cart-item">
            <img src={product.image} alt={product.title} className="cart-image" />
            <div className="cart-info">
              <Link to={`/products/${product.id}`}>{product.title}</Link>
              <p className="cart-unit">${product.price.toFixed(2)}</p>
            </div>
            <div className="cart-qty">
              <button
                type="button"
                className="qty-btn"
                aria-label="Giảm số lượng"
                onClick={() => dispatch(updateQuantity({ id: product.id, quantity: quantity - 1 }))}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                type="button"
                className="qty-btn"
                aria-label="Tăng số lượng"
                onClick={() => dispatch(updateQuantity({ id: product.id, quantity: quantity + 1 }))}
              >
                +
              </button>
            </div>
            <p className="cart-subtotal">${(product.price * quantity).toFixed(2)}</p>
            <button type="button" className="btn btn-danger" onClick={() => dispatch(removeFromCart(product.id))}>
              Xoá
            </button>
          </li>
        ))}
      </ul>

      <p className="cart-total">Tổng tiền: ${total.toFixed(2)}</p>
      <div className="cart-actions">
        <button type="button" className="btn btn-outline" onClick={() => dispatch(clearCart())}>
          Xoá giỏ hàng
        </button>
        <Link to="/checkout" className="btn btn-primary">
          Thanh toán
        </Link>
      </div>
    </section>
  );
}

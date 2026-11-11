import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { clearCart, selectCartItems, selectCartTotal } from "../features/cart/cartSlice";

export default function CheckoutPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const [ordered, setOrdered] = useState(false);

  const handleOrder = () => {
    dispatch(clearCart());
    setOrdered(true);
  };

  if (ordered) {
    return (
      <section>
        <h1 className="page-title">Thanh toán</h1>
        <div className="alert alert-success" role="status">
          Đặt hàng thành công! Cảm ơn bạn đã mua hàng.
        </div>
        <Link to="/" className="btn btn-primary">
          Về trang chủ
        </Link>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section>
        <h1 className="page-title">Thanh toán</h1>
        <p className="empty">Giỏ hàng đang trống, chưa có gì để thanh toán.</p>
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
      <h1 className="page-title">Thanh toán</h1>
      <ul className="checkout-list">
        {items.map(({ product, quantity }) => (
          <li key={product.id} className="checkout-item">
            <span>
              {product.title} x {quantity}
            </span>
            <strong>${(product.price * quantity).toFixed(2)}</strong>
          </li>
        ))}
      </ul>
      <p className="cart-total">Tổng tiền: ${total.toFixed(2)}</p>
      <button type="button" className="btn btn-primary" onClick={handleOrder}>
        Đặt hàng
      </button>
    </section>
  );
}

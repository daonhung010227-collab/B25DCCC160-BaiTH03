import { Link } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { addToCart } from "../features/cart/cartSlice";
import type { Product } from "../types";

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();

  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-thumb">
        <img src={product.image} alt={product.title} />
      </Link>
      <h2 className="product-card-title">
        <Link to={`/products/${product.id}`}>{product.title}</Link>
      </h2>
      <p className="product-price">${product.price.toFixed(2)}</p>
      <button type="button" className="btn btn-primary" onClick={() => dispatch(addToCart(product))}>
        Thêm vào giỏ
      </button>
    </article>
  );
}

import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchProducts, selectProducts, selectProductsStatus } from "../features/products/productsSlice";
import { addToCart } from "../features/cart/cartSlice";
import NotFoundPage from "./NotFoundPage";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const status = useAppSelector(selectProductsStatus);

  // Vào thẳng /products/:id (chưa qua trang chủ) thì vẫn phải tải danh sách
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === "idle" || status === "loading") {
    return <p className="loading">Đang tải sản phẩm...</p>;
  }
  if (status === "failed") {
    return (
      <div className="alert alert-error" role="alert">
        <p>Không tải được sản phẩm.</p>
        <button type="button" className="btn btn-outline" onClick={() => dispatch(fetchProducts())}>
          Thử lại
        </button>
      </div>
    );
  }

  const product = products.find((p) => String(p.id) === id);
  if (!product) {
    return <NotFoundPage />;
  }

  return (
    <section>
      <Link to="/" className="back-link">
        &larr; Quay lại danh sách
      </Link>
      <article className="product-detail">
        <div className="detail-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="detail-info">
          <h1 className="detail-title">{product.title}</h1>
          <p className="detail-category">Danh mục: {product.category}</p>
          <p className="product-price detail-price">${product.price.toFixed(2)}</p>
          <p className="detail-description">{product.description}</p>
          <button type="button" className="btn btn-primary" onClick={() => dispatch(addToCart(product))}>
            Thêm vào giỏ
          </button>
        </div>
      </article>
    </section>
  );
}

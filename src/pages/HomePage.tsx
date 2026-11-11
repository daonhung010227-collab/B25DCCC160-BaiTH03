import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchProducts,
  selectProducts,
  selectProductsError,
  selectProductsStatus,
} from "../features/products/productsSlice";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const status = useAppSelector(selectProductsStatus);
  const error = useAppSelector(selectProductsError);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const keyword = query.trim().toLowerCase();
  const filteredProducts = products.filter((p) => p.title.toLowerCase().includes(keyword));

  return (
    <section>
      <h1 className="page-title">Sản phẩm</h1>

      <div className="search-box">
        <label htmlFor="search" className="sr-only">
          Tìm kiếm theo tên sản phẩm
        </label>
        <input
          id="search"
          type="search"
          className="input"
          placeholder="Tìm sản phẩm theo tên..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {status === "loading" && <p className="loading">Đang tải sản phẩm...</p>}

      {status === "failed" && (
        <div className="alert alert-error" role="alert">
          <p>
            <strong>Có lỗi xảy ra:</strong> {error}
          </p>
          <button type="button" className="btn btn-outline" onClick={() => dispatch(fetchProducts())}>
            Thử lại
          </button>
        </div>
      )}

      {status === "succeeded" &&
        (filteredProducts.length === 0 ? (
          <p className="empty">Không tìm thấy sản phẩm phù hợp.</p>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ))}
    </section>
  );
}

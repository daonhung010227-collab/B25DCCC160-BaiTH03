import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="not-found">
      <p className="not-found-code">404</p>
      <h1 className="page-title">Không tìm thấy trang</h1>
      <p>Đường dẫn bạn truy cập không tồn tại hoặc nội dung đã bị xóa.</p>
      <Link to="/" className="btn btn-primary">
        Về trang chủ
      </Link>
    </section>
  );
}

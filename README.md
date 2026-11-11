# ShopMini - Cửa hàng mini (React + TypeScript + Vite)

Bài thực hành 03 (TH02) - RIPT1306. Quản lý state toàn cục bằng **Context API** và **Redux Toolkit**.
Dữ liệu sản phẩm lấy từ https://fakestoreapi.com/products.

## Chạy dự án
```bash
npm install
npm run dev      # chạy thử tại http://localhost:5173
npm run build    # kiểm tra TypeScript và build production
```

## Đăng nhập giả lập
- Tên đăng nhập: nhập bất kỳ
- Mật khẩu: `123456`

## Chức năng
1. Trang chủ `/`: lưới sản phẩm responsive (1 cột điện thoại, 2 cột tablet, 4 cột desktop), ô tìm kiếm theo tên.
2. Chi tiết sản phẩm `/products/:id`.
3. Giỏ hàng `/cart`: tăng/giảm số lượng, xoá sản phẩm, xoá giỏ hàng, hiện tổng tiền.
4. Đăng nhập `/login`.
5. Thanh toán `/checkout`: là protected route. Chưa đăng nhập thì chuyển sang `/login`, đăng nhập xong quay lại trang trước đó. Nút "Đặt hàng" xoá giỏ hàng và hiện thông báo thành công.
6. Trang 404 cho đường dẫn không tồn tại.
7. Header dùng chung: số lượng sản phẩm trong giỏ, tên người dùng, nút đăng xuất, nút đổi theme sáng/tối.

## Dữ liệu nào để ở đâu và lý do

### useState (state cục bộ của một component)
| Dữ liệu | Nơi dùng | Lý do |
|---|---|---|
| Từ khoá tìm kiếm `query` | HomePage | Chỉ trang chủ dùng, không component nào khác cần |
| Ô nhập `username`, `password`, thông báo lỗi form | LoginPage | Chỉ form đăng nhập dùng, bỏ đi khi rời trang cũng không ảnh hưởng nơi khác |
| Cờ `ordered` (đã đặt hàng chưa) | CheckoutPage | Chỉ trang thanh toán cần để hiện thông báo thành công |

### Context API (state toàn cục, ít thay đổi, nhiều nơi cần đọc)
| Dữ liệu | Context | Lý do |
|---|---|---|
| `theme`, `toggleTheme` | ThemeContext (`useTheme()`) | Ảnh hưởng giao diện cả ứng dụng, dữ liệu nhỏ và ít thay đổi |
| `user`, `login`, `logout` | AuthContext (`useAuth()`) | Header, LoginPage, ProtectedRoute đều cần biết trạng thái đăng nhập; logic đơn giản nên Context là đủ |

### Redux Toolkit (dữ liệu nghiệp vụ, logic cập nhật phức tạp)
| Dữ liệu | Slice | Lý do |
|---|---|---|
| Danh sách sản phẩm và trạng thái `idle / loading / succeeded / failed` | productsSlice | Dữ liệu lấy từ API bằng `createAsyncThunk`, cần quản lý nhiều trạng thái; trang chủ và trang chi tiết dùng chung nên chỉ gọi API một lần |
| Giỏ hàng (`addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`) cùng selector tính tổng số lượng và tổng tiền | cartSlice | Nhiều logic cập nhật; Header, ProductCard, trang chi tiết, giỏ hàng và thanh toán đều dùng |

## Cấu trúc thư mục
```
src/
  app/            store.ts (configureStore, RootState, AppDispatch), hooks.ts (useAppDispatch, useAppSelector)
  features/       products/productsSlice.ts, cart/cartSlice.ts
  contexts/       ThemeContext.tsx, AuthContext.tsx
  components/     Header.tsx, ProductCard.tsx, ProtectedRoute.tsx
  layouts/        MainLayout.tsx
  pages/          HomePage, ProductDetailPage, CartPage, LoginPage, CheckoutPage, NotFoundPage
  types/index.ts  Product, CartItem, User
  App.tsx         khai báo Routes
  main.tsx        bọc Provider, ThemeProvider, AuthProvider, BrowserRouter
```

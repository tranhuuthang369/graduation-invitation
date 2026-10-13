# Thiệp Mời Lễ Tốt Nghiệp - Vĩnh Bảo (Vin)

Dự án web thiệp mời lễ tốt nghiệp được xây dựng chuẩn xác theo thiết kế Figma của bạn, tích hợp hiệu ứng mở thiệp tương tác nhiều giai đoạn và công cụ tạo link cá nhân hóa hàng loạt cho từng bạn bè.

---

## 🌟 Tính Năng Nổi Bật

1. **Hiệu ứng mở thiệp theo thiết kế Figma**:
   - **Giai đoạn 1**: Phong bì nhỏ đặt trên chiếc ghế đá trong sân cổ kính. Vòng sáng pulsing mời bạn chạm vào.
   - **Giai đoạn 2**: Phong bì phóng to ra giữa màn hình với con dấu sáp đỏ "VB". **Thẻ tên người nhận** xuất hiện trang trọng: `Kính gửi: [Tên Bạn]`.
   - **Giai đoạn 3**: Chạm vào con dấu sáp đỏ, hiệu ứng âm thanh vỡ niêm phong sáp và nắp phong bì mở ra.
   - **Giai đoạn 4**: Bức thiệp giấy da vintage cuộn ra trọn vẹn kèm nhành hoa hồng khô, hiển thị nội dung mời chính thức và tên khách mời.
   - **Hiệu ứng pháo hoa bụi vàng (Celebration Particle Effect)** khi bức thiệp được mở hoàn tất.

2. **Cá nhân hóa tên từng người bạn (Personalized Invitation Link)**:
   - Gửi link dạng: `https://ten-mien-cua-ban/?to=Minh+Anh`
   - Khách mở link sẽ thấy tên mình xuất hiện trên phong bì và bức thiệp mời.
   - Nếu không có tham số, mặc định hiển thị: `Bạn thân mến`.

3. **Công cụ tạo link hàng loạt cho Vĩnh Bảo (Built-in Creator Tool)**:
   - Nút **"Tạo link gửi bạn"** ở góc trên bên phải.
   - **Tab 1 - Tạo cho 1 bạn**: Nhập tên -> Bấm "Tạo Link" -> Sao chép link, xem thử hoặc gửi trực tiếp qua Zalo.
   - **Tab 2 - Tạo hàng loạt (Danh sách nhiều người)**: Dán danh sách tên (mỗi người 1 dòng) -> Tạo toàn bộ danh sách link với nút sao chép riêng từng người chỉ với 1 click!

4. **Tiện ích cho khách mời**:
   - **Thêm vào Google Calendar**: Tự động tạo sự kiện 15:30 - 17:30 ngày 17/10/2026 tại ĐH Tôn Đức Thắng.
   - **Chỉ đường Google Maps**: Dẫn đường đến 19 Nguyễn Hữu Thọ, P. Tân Hưng, TP.HCM.
   - **Nhạc nền Piano lãng mạn**: Nút bật/tắt đĩa than xoay ở góc trên bên trái (sử dụng Web Audio API không phụ thuộc file ngoài).
   - **Xem chi tiết văn bản**: Hỗ trợ đọc nhanh và gọi điện trực tiếp qua hotline.
   - **Xem lại**: Tua lại toàn bộ hiệu ứng từ đầu.

---

## 🚀 Cách Chạy & Triển Khai

### 1. Mở xem trực tiếp trên máy:
Mở trình duyệt bất kỳ (Chrome, Edge, Cốc Cốc, Safari,...) và truy cập:
```
http://localhost:3000/?to=Minh+Anh
```
Hoặc khởi chạy lại server bất kỳ lúc nào bằng lệnh:
```bash
python -m http.server 3000
```
(hoặc mở trực tiếp file `index.html`).

### 2. Đưa lên mạng miễn phí để gửi cho bạn bè:
Bạn có thể tải toàn bộ thư mục này lên các nền tảng miễn phí 100% trong 1 phút:
- **Vercel** / **Netlify**: Kéo thả thư mục `graduation-invitation` lên là có ngay đường link dạng `https://tot-nghiep-vinh-bao.vercel.app`.
- **GitHub Pages**: Đẩy code lên GitHub và bật Pages trong Settings.

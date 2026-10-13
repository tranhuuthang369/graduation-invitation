# TÀI LIỆU BÀN GIAO – THIỆP MỜI TỐT NGHIỆP ĐIỆN ẢNH (THREE.JS)

**Chủ nhân buổi lễ:** Vĩnh Bảo  
**Thời gian:** 17/10/2026  
**Địa điểm:** Trường Đại học Tôn Đức Thắng, số 19 Nguyễn Hữu Thọ, P. Tân Hưng, TP.HCM  
**Hotline:** 0859901709 | 0869200422  

---

## 1. Đường dẫn công khai (Live URLs) & QR Code

Trang web đã được deploy công khai với kết nối HTTPS bảo mật, độ trễ thấp qua hạ tầng Cloudflare Edge, hỗ trợ đầy đủ Open Graph preview trên Messenger và Zalo:

- **Trang tạo link mời riêng (Không tham số `?to=`):**  
  👉 **Link:** `https://distributor-earnings-worker-antiques.trycloudflare.com/`  
  📌 **Mã QR:** [`qr/qr-base.png`](file:///c:/Users/Admin/.gemini/antigravity-ide/scratch/graduation-invitation/qr/qr-base.png)  
  *(Người dùng có thể nhập tên khách mời bất kỳ, xem thử trước và nhấn "Sao chép link" hoặc "Chia sẻ")*

- **Mẫu 1: Gửi cho Anh Minh:**  
  👉 **Link:** `https://distributor-earnings-worker-antiques.trycloudflare.com/?to=Anh%20Minh`  
  📌 **Mã QR:** [`qr/qr-anh-minh.png`](file:///c:/Users/Admin/.gemini/antigravity-ide/scratch/graduation-invitation/qr/qr-anh-minh.png)

- **Mẫu 2: Gửi cho Cô Hằng:**  
  👉 **Link:** `https://distributor-earnings-worker-antiques.trycloudflare.com/?to=C%C3%B4%20H%E1%BA%B1ng`  
  📌 **Mã QR:** [`qr/qr-co-hang.png`](file:///c:/Users/Admin/.gemini/antigravity-ide/scratch/graduation-invitation/qr/qr-co-hang.png)

- **Mẫu 3: Thiệp chung (không chỉ định tên):**  
  👉 **Link:** `https://distributor-earnings-worker-antiques.trycloudflare.com/?to=`  
  *(Tự động hiển thị từ "Bạn" lịch thiệp)*

---

## 2. Mẫu tin nhắn gửi qua Messenger / Zalo

Bạn có thể sao chép trực tiếp các mẫu tin nhắn dưới đây để gửi cho người thân, bạn bè và thầy cô:

### Mẫu dành cho Bạn bè / Anh chị em:
```text
Thân gửi [Tên người nhận],

Hành trình giảng đường của mình đã đến ngày hái quả ngọt! Trân trọng mời [Tên người nhận] đến chung vui cùng mình trong Lễ Tốt Nghiệp:

⏰ Thời gian: Thứ Bảy, ngày 17/10/2026
📍 Địa điểm: Trường Đại học Tôn Đức Thắng, số 19 Nguyễn Hữu Thọ, P. Tân Hưng, TP.HCM
🔗 Thiệp mời đặc biệt dành riêng cho bạn:
https://distributor-earnings-worker-antiques.trycloudflare.com/?to=[Tên_người_nhận]

Sự hiện diện của bạn là niềm vinh hạnh và kỷ niệm vô giá đối với mình!
```

### Mẫu dành cho Thầy Cô / Người lớn tuổi:
```text
Kính gửi [Thầy/Cô/Cô Chú],

Em xin trân trọng kính mời [Thầy/Cô/Cô Chú] đến tham dự Lễ Tốt Nghiệp của em:

⏰ Thời gian: 17/10/2026
📍 Địa điểm: Trường ĐH Tôn Đức Thắng, số 19 Nguyễn Hữu Thọ, P. Tân Hưng, TP.HCM
💌 Thư mời trang trọng gửi tới [Thầy/Cô/Cô Chú]:
https://distributor-earnings-worker-antiques.trycloudflare.com/?to=[Tên_người_nhận]

Kính chúc [Thầy/Cô/Cô Chú] luôn dồi dào sức khỏe và hạnh phúc!
```

---

## 3. Các tính năng điện ảnh & kỹ thuật đã hoàn thiện

1. **Hiệu ứng Three.js Cinematic:**
   - Hạt bụi nắng lơ lửng (85 particles) và lá vàng rơi khẽ (10 leaves).
   - Chiếu vệt nắng xiên hoàng hôn (Sunrays) dịu nhẹ.
   - Hiệu ứng camera dolly mượt mà từ khung ghế đá thu nhỏ tiến sâu vào phong bì thư.
   - Vết sáp niêm phong tan chảy phát tán tia lấp lánh (spark burst).
   - 18 cánh hoa hồng rơi sau nền thư ở Bước 4.
   - Chữ viết tay Dancing Script lộ nét từ từ (`clip-path`).
   - Tên khách mời được đổi chính xác ở 3 vị trí trong thư, kèm hiệu ứng bút dạ quang (highlighter sweep) màu vàng ấm sau khi mở thiệp.
2. **Tiện ích tương tác ở Bước 4:**
   - Nút **"Thêm vào lịch"**: Tự động tạo và tải file `.ics` chuẩn Quốc tế, mở thẳng trên Apple Calendar và Google Calendar.
   - Nút **"Chỉ đường"**: Mở trực tiếp bản đồ Google Maps chỉ đường tới Đại học Tôn Đức Thắng.
   - 2 số điện thoại liên hệ là liên kết `tel:` bấm gọi tức thì trên điện thoại.
3. **Khả năng tương thích & Dự phòng (Fallback):**
   - Hỗ trợ đầy đủ màn hình Dark Mode và Light Mode.
   - Tự động kích hoạt cơ chế CSS Fallback mượt mà nếu máy tắt WebGL hoặc bật chế độ giảm chuyển động (`prefers-reduced-motion`).
   - Toàn bộ ảnh nền và icon được nhúng base64 WebP bên trong 1 file HTML duy nhất (~385 KB), tải tức thì không phụ thuộc asset ngoài.
   - Ảnh chia sẻ đại diện Open Graph `og.jpg` (1200×630px) chuẩn tỷ lệ vàng của Facebook/Zalo.

---

## 4. Checklist kiểm tra thực tế trên điện thoại (Messenger / Zalo)

| Hạng mục kiểm tra | Mô tả thao tác | Kết quả mong đợi |
| :--- | :--- | :--- |
| **Ảnh đại diện link** | Dán link vào ô chat Zalo hoặc Messenger | Khung xem trước hiện ảnh `og.jpg` trang trọng và tiêu đề thư mời |
| **Chạm mở thư** | Chạm nhẹ vào bất kỳ điểm nào trên màn hình | Camera Three.js lướt êm vào phong bì, tia sáng bung tỏa |
| **Cá nhân hóa tên** | Quan sát 3 dòng chữ trong thư mời | Hiện đúng tên khách mời (không bị che khuất hay tràn chữ) |
| **Nút "Thêm vào lịch"** | Bấm nút ở cuối thiệp | Điện thoại hỏi thêm sự kiện 17/10/2026 vào Lịch |
| **Nút "Chỉ đường"** | Bấm nút ở cuối thiệp | Mở Google Maps định vị trường Tôn Đức Thắng |
| **Nghiêng điện thoại (Gyro)** | Nghiêng nhẹ máy qua lại (sau khi cho phép cảm biến) | Cảnh nền và hạt nắng chuyển động thị sai (Parallax) 3D sống động |

---

## 5. Hướng dẫn Rebuild & Re-deploy khi cần sửa đổi

Nếu sau này bạn muốn thay đổi bất kỳ nội dung nào trong thư mời:
1. Chỉnh sửa code nguồn trong thư mục `src/` (`index.html`, `style.css`, hoặc `app.js`).
2. Chạy lệnh đóng gói:
   ```powershell
   node build.mjs
   ```
   *(Script sẽ tự động inlined toàn bộ CSS, JS và ảnh WebP thành 1 file duy nhất `dist/thiep-tot-nghiep.html`)*
3. Nếu khởi động lại tunnel công khai:
   ```powershell
   python -m http.server 8089 --directory dist
   .\cloudflared.exe tunnel --url http://127.0.0.1:8089
   ```

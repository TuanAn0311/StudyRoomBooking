# 🏫 Đặt Phòng Tự Học (Study Room Booking)

Dự án phát triển ứng dụng di động hiệu năng cao hỗ trợ sinh viên tra cứu và đặt phòng tự học, phòng thảo luận trên khuôn viên trường.

## ✨ Tính năng cốt lõi

- **Kiểm soát trùng lịch (Conflict Prevention):** Thuật toán tự động phân tích và đối chiếu các mốc thời gian (start/end time) để ngăn chặn các lượt đặt phòng đè lên nhau.
- **Tối ưu hóa hiệu năng giao diện:** Đạt tốc độ cuộn danh sách 60fps nhờ cấu hình `FlatList` và bộ nhớ đệm thành phần giao diện bằng `React.memo`.
- **Quản lý trạng thái gọn nhẹ:** Ứng dụng Zustand để lưu trữ toàn cục phiên đăng nhập, bộ lọc tìm kiếm và danh sách đặt phòng hiện tại.
- **Nhắc nhở tự động:** Tích hợp Local Notifications để chủ động thông báo cho sinh viên trước giờ nhận phòng.

## 🛠 Công nghệ sử dụng

- **Core Framework:** React Native & Expo SDK
- **Ngôn ngữ:** TypeScript (Đảm bảo tính chặt chẽ cho cấu trúc dữ liệu Model)
- **State & Điều hướng:** Zustand, React Navigation (Native Stack)
- **Tương tác thiết bị:** Expo Notifications, Expo Device

## 🚀 Hướng dẫn khởi chạy cục bộ

1. Sao chép kho lưu trữ về máy:
    ```bash
    git clone [https://github.com/your-username/study-room-booking.git](https://github.com/your-username/study-room-booking.git)
    cd study-room-booking
    ```

#### Cài đặt các thư viện phụ thuộc:

npm install

#### Biên dịch và khởi chạy ứng dụng độc lập trên máy ảo Android:

npx expo run:android

import { Room, Booking } from "../types";

// Mock data for rooms
export const MOCK_ROOMS: Room[] = [
    {
        id: "room_1",
        name: "Phòng Tự học A101",
        capacity: 4,
        facilities: ["Bảng trắng", "Ổ cắm điện", "Wifi"],
        isAvailable: true,
    },
    {
        id: "room_2",
        name: "Phòng Thảo luận B205",
        capacity: 8,
        facilities: ["Máy chiếu", "Bảng trắng", "Điều hòa"],
        isAvailable: true,
    },
    {
        id: "room_3",
        name: "Phòng Lab C301",
        capacity: 20,
        facilities: ["PC", "Bảng tương tác", "Wifi"],
        isAvailable: false, // Phòng đang bảo trì nên không cho đặt
    },
];

export const MOCK_BOOKINGS: Booking[] = [
    {
        id: "booking_1",
        roomId: "room_1",
        userId: "student_123",
        // Định dạng ISO 8601 chuẩn để dễ dàng kiểm tra trùng giờ sau này
        startTime: "2026-09-03T08:00:00Z",
        endTime: "2026-09-03T10:00:00Z",
        status: "upcoming",
    },
];

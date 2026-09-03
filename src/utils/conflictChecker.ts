import { Booking } from "../types";

export const checkTimeConflict = (newStartTime: string, newEndTime: string, existingBookings: Booking[], roomId: string): boolean => {
    //1. Chỉ lấy những lịch đã đặt của chính căn phòng này và chưa bị huỷ
    const roomBookings = existingBookings.filter((b) => b.roomId === roomId && b.status !== "cancelled");

    //2. Chuyển thời gian thành con số (milli giây) để dễ so sánh
    const newStart = new Date(newStartTime).getTime();
    const newEnd = new Date(newEndTime).getTime();

    //3. Kiểm tra xem có bất kỳ (some) lịch cũ nào bị đè không
    return roomBookings.some((booking) => {
        const existStart = new Date(booking.startTime).getTime();
        const existEnd = new Date(booking.endTime).getTime();

        // Công thức kinh điển kiểm tra giao thoa thời gian (Overlapping Time)
        return newStart < existEnd && newEnd > existStart;
    });
};

import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Room, Booking } from "../types";
import { useStore } from "../store/useStore";
import { checkTimeConflict } from "../utils/conflictChecker";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
    handleNotification: async () =>
        ({
            shouldShowBanner: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
        }) as Notifications.NotificationBehavior,
});
const BookingScreen = ({ route, navigation }: any) => {
    const { room } = route.params;
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

    // Lấy danh sách lịch đã đặt và hàm thêm lịch từ Zustand Store
    const { bookings, addBooking } = useStore();

    const timeSlots = [
        { id: "1", startTime: "08:00", endTime: "10:00" },
        { id: "2", startTime: "10:00", endTime: "12:00" },
        { id: "3", startTime: "13:00", endTime: "15:00" },
        { id: "4", startTime: "15:00", endTime: "17:00" },
    ];

    // 1. Thêm chữ 'async' vào đây
    const handleBookRoom = async () => {
        if (!selectedSlot) {
            Alert.alert("Lỗi", "Vui lòng chọn một khung giờ trước khi đặt!");
            return;
        }

        const slot = timeSlots.find((s) => s.id === selectedSlot);
        if (!slot) return;

        const currentDate = "2026-09-03";
        const fullStartTime = `${currentDate}T${slot.startTime}:00Z`;
        const fullEndTime = `${currentDate}T${slot.endTime}:00Z`;

        const isConflict = checkTimeConflict(fullStartTime, fullEndTime, bookings, room.id);

        if (isConflict) {
            Alert.alert("Trùng lịch ❌", "Khung giờ này đã có người đặt. Vui lòng chọn giờ khác!");
            return;
        }

        const newBooking: Booking = {
            id: `booking_${Date.now()}`,
            roomId: room.id,
            userId: "student_current",
            startTime: fullStartTime,
            endTime: fullEndTime,
            status: "upcoming",
        };

        addBooking(newBooking);

        // 2. THÊM DÒNG NÀY: Xin quyền hiển thị thông báo (Bắt buộc cho Android 13+)
        await Notifications.requestPermissionsAsync();

        // 3. Thêm chữ 'await' trước hàm schedule
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "⏰ Nhắc nhở nhận phòng!",
                body: `Lịch sử dụng ${room.name} của bạn sẽ bắt đầu lúc ${slot.startTime}. Đừng đến muộn nhé!`,
                sound: true,
            },
            trigger: {
                type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
                seconds: 3,
                repeats: false,
            },
        });

        Alert.alert("Thành công ✅", "Bạn đã đặt phòng thành công!", [{ text: "OK", onPress: () => navigation.goBack() }]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{room.name}</Text>
            <Text style={styles.subtitle}>
                Sức chứa: {room.capacity} người - Trang bị: {room.facilities.join(", ")}
            </Text>

            <Text style={styles.sectionTitle}>Chọn khung giờ:</Text>

            <View style={styles.slotContainer}>
                {timeSlots.map((slot) => (
                    <TouchableOpacity key={slot.id} style={[styles.slotButton, selectedSlot === slot.id && styles.slotButtonSelected]} onPress={() => setSelectedSlot(slot.id)} activeOpacity={0.7}>
                        <Text style={[styles.slotText, selectedSlot === slot.id && styles.slotTextSelected]}>
                            {slot.startTime} - {slot.endTime}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity style={styles.confirmButton} onPress={handleBookRoom}>
                <Text style={styles.confirmText}>Xác nhận đặt phòng</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#FFFFFF" },
    title: { fontSize: 26, fontWeight: "bold", color: "#1A1A1A", marginBottom: 8 },
    subtitle: { fontSize: 16, color: "#666", marginBottom: 30 },
    sectionTitle: { fontSize: 18, fontWeight: "700", color: "#333", marginBottom: 16 },

    slotContainer: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginBottom: 40 },
    slotButton: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        backgroundColor: "#F8F9FA",
        width: "47%", // Chia làm 2 cột
        alignItems: "center",
    },
    slotButtonSelected: {
        backgroundColor: "#007AFF", // Màu xanh lam đặc trưng của iOS/React Native
        borderColor: "#007AFF",
    },
    slotText: { fontSize: 16, color: "#333", fontWeight: "500" },
    slotTextSelected: { color: "#FFFFFF", fontWeight: "bold" },

    confirmButton: {
        backgroundColor: "#34C759", // Màu xanh lá
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        marginTop: "auto", // Đẩy nút này xuống dưới cùng màn hình
        marginBottom: 20,
    },
    confirmText: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },
});

export default BookingScreen;

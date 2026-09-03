import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Room } from "../types";

interface Props {
    room: Room;
    onPress: (room: Room) => void;
}

const RoomCard = ({ room, onPress }: Props) => {
    return (
        <TouchableOpacity style={[styles.card, !room.isAvailable && styles.cardDisabled]} onPress={() => onPress(room)} activeOpacity={0.7}>
            <Text style={styles.name}>{room.name}</Text>
            <Text style={styles.details}>👥 Sức chứa: {room.capacity} người</Text>
            <Text style={styles.details}>🛠 Trang bị: {room.facilities.join(", ")}</Text>

            <View style={styles.statusContainer}>
                <View style={[styles.statusDot, { backgroundColor: room.isAvailable ? "#4CAF50" : "#F44336" }]} />
                <Text style={[styles.statusText, { color: room.isAvailable ? "#4CAF50" : "#F44336" }]}>{room.isAvailable ? "Sẵn sàng" : "Đang bảo trì"}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#FFFFFF",
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // Bóng đổ cho Android
    },
    cardDisabled: {
        opacity: 0.6,
        backgroundColor: "#F5F5F5",
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 8,
    },
    details: {
        fontSize: 14,
        color: "#666",
        marginBottom: 4,
    },
    statusContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },
    statusText: {
        fontSize: 14,
        fontWeight: "600",
    },
});

// Sử dụng React.memo để tối ưu 60fps theo đúng yêu cầu đề bài
export default React.memo(RoomCard);

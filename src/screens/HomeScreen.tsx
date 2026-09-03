import React, { useEffect } from "react";
import { View, FlatList, StyleSheet, Text, Alert } from "react-native";
import { useStore } from "../store/useStore";
import RoomCard from "../components/RoomCard";
import { Room } from "../types";
import { MOCK_ROOMS } from "../constants/mockData";

const HomeScreen = ({ navigation }: any) => {
    const { rooms, setRooms } = useStore();

    // Nạp dữ liệu giả lập vào Store khi màn hình vừa khởi chạy
    useEffect(() => {
        setRooms(MOCK_ROOMS);
    }, []);

    // Hàm xử lý khi người dùng bấm vào một phòng
    const handleRoomPress = (room: Room) => {
        if (!room.isAvailable) {
            Alert.alert("Thông báo", "Phòng này hiện đang bảo trì, vui lòng chọn phòng khác.");
            return;
        }

        navigation.navigate("Booking", { room: room });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Chọn phòng học</Text>

            <FlatList
                data={rooms}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <RoomCard room={item} onPress={handleRoomPress} />}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F2F5",
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#1A1A1A",
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
});

export default HomeScreen;

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import BookingScreen from "../screens/BookingScreen";
import { Room } from "../types";

// Định nghĩa kiểu dữ liệu cho các tham số của từng màn hình trong Stack Navigator
export type RootStackParamList = {
    Home: undefined; // Man hinh Home khong can nhan du lieu
    Booking: { room: Room }; // Man hinh Booking bat buoc phai nhan vao 1 Object Room
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Danh sách phòng học" }} />
                <Stack.Screen name="Booking" component={BookingScreen} options={{ title: "Đặt phòng" }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;

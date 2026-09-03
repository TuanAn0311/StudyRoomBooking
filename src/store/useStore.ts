import { create } from "zustand";
import { User, Room, Booking } from "../types";

// 1. Define the state interface (định nghĩa cấu trúc của state)
interface AppState {
    currentUser: User | null;
    login: (user: User) => void;
    logout: () => void;

    rooms: Room[];
    searchFilter: string;
    setRooms: (rooms: Room[]) => void;
    setSearchFilter: (filter: string) => void;

    bookings: Booking[];
    addBooking: (booking: Booking) => void;
    cancelBooking: (bookingId: string) => void;
}

// 2. Create the Zustand store (tạo store Zustand)
export const useStore = create<AppState>((set) => ({
    // Trạng thái ban đầu (initial state)
    currentUser: null,
    rooms: [],
    searchFilter: "",
    bookings: [],

    // Các hàm cập nhật trạng thái (Actions to update the state)
    login: (user: User) => set({ currentUser: user }),

    logout: () => set({ currentUser: null }),

    setRooms: (rooms) => set({ rooms }),

    setSearchFilter: (filter) => set({ searchFilter: filter }),

    addBooking: (booking) => set((state) => ({ bookings: [...state.bookings, booking] })),

    cancelBooking: (bookingId) =>
        set((state) => ({
            bookings: state.bookings.map((b) => (b.id === bookingId ? { ...b, status: "cancelled" } : b)),
        })),
}));

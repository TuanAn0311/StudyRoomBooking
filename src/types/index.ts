export interface User {
    id: string;
    name: string;
    studentId: string;
}

export interface Room {
    id: string;
    name: string;
    capacity: number; // maximum number of people the room can accommodate
    facilities: string[]; //common facilities like projector, whiteboard, etc.
    isAvailable: boolean;
}

export interface Booking {
    id: string;
    roomId: string;
    userId: string;
    startTime: string;
    endTime: string;
    status: "upcoming" | "ongoing" | "completed" | "cancelled";
}

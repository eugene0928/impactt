export type Room = {
    id: number;
    name: string;
    type: string;
    capacity: number;
}

export type RoomRes = {
    page: number;
    count: number;
    page_size: number;
    results: Room[];
}

export type RoomAvailability = {
    start: string;
    end: string;
}
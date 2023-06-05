import { ROOM_TYPES } from "@utils/enums";

export const ROOM_LABEL = new Map<number, string>([
    [ROOM_TYPES.TEAM, 'team'],
    [ROOM_TYPES.FOCUS, 'focus'],
    [ROOM_TYPES.CONFERENCE, 'conference']
]);

export const ROOM_LABEL_REVERSE = new Map<string, number>([
    ['team', ROOM_TYPES.TEAM],
    ['focus', ROOM_TYPES.FOCUS],
    ['conference', ROOM_TYPES.CONFERENCE]
]);
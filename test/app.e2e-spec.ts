import { authTests } from "./auth/auth.e2e";
import { roomE2e } from "./room/room.e2e";
import { bookingE2e } from "./booking/booking.e2e";

describe('auth', authTests);
describe('room', roomE2e);
describe('booking', bookingE2e);
import { forbidden, notFoundError } from "@/errors";
import bookingRepository from "@/repositories/booking-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function validateBooking(roomId: number, userId: number) {
  //Tem enrollment?
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw forbidden();
  }
  //Tem ticket pago isOnline false e includesHotel true
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw forbidden();
  }

  const roomExistsAndIsEmpty = await bookingRepository.findRoomById(roomId);

  if (!roomExistsAndIsEmpty) {
    throw notFoundError();
  }

  if (roomExistsAndIsEmpty.capacity === roomExistsAndIsEmpty.Booking.length) {
    throw forbidden();
  }
}

async function postBooking(roomId: number, userId: number) {
  await validateBooking(roomId, userId);

  await bookingRepository.postBooking(roomId, userId);
}

async function getBooking(userId: number) {
  const userHasBooking = await bookingRepository.getBooking(userId);

  if (!userHasBooking) {
    throw notFoundError();
  }
}

async function getBookingOnUpdate(userId: number) {
  const userHasBooking = await bookingRepository.getBooking(userId);

  if (!userHasBooking) {
    throw forbidden();
  }
}

async function updateBooking(roomId: number, userId: number, bookingId: number) {
  await validateBooking(roomId, userId);

  await getBookingOnUpdate(userId);

  await bookingRepository.updateBooking(roomId, bookingId);
}

const bookingService = {
  postBooking,
  getBooking,
  updateBooking
};

export default bookingService;

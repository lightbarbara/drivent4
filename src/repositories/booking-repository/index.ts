import { prisma } from "@/config";

async function findRoomById(roomId: number) {
  return prisma.room.findUnique({
    where: {
      id: roomId
    },
    include: {
      Booking: true
    }
  });
}

async function postBooking(roomId: number, userId: number) {
  return prisma.booking.create({
    data: {
      roomId,
      userId,
    }
  });
}

async function getBooking(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId
    },
    select: {
      id: true,
      Room: true
    }
  });
} 

async function updateBooking(roomId: number, bookingId: number) {
  return prisma.booking.update({
    where: {
      id: bookingId
    },
    data: {
      roomId,
      updatedAt: new Date()
    }
  });
}

const bookingRepository = {
  findRoomById,
  postBooking,
  getBooking,
  updateBooking
};

export default bookingRepository;

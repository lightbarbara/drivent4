import { AuthenticatedRequest } from "@/middlewares";
import bookingService from "@/services/booking-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function createBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const roomId = req.body.roomId;
  
  try {
    await bookingService.postBooking(parseInt(roomId), userId);
  } catch (e) {
    if (e.name === "Forbidden") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    if (e.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.FORBIDDEN);
  }
}

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const booking = await bookingService.getBooking(userId);

    return res.status(httpStatus.OK).send(booking);
  } catch (e) {
    if (e.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function updateBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const roomId = req.body.roomId;
  const bookingId = req.params.bookingId;

  try {
    await bookingService.updateBooking(parseInt(roomId), userId, parseInt(bookingId));

    return res.status(httpStatus.OK).send({ bookingId });
  } catch (e) {
    if (e.name === "Forbidden") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    if (e.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

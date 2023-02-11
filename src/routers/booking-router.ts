import { createBooking, getBooking, updateBooking } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { bookingSchema } from "@/schemas";
import { Router } from "express";

const bookingRouter = Router();

bookingRouter.all("/*", authenticateToken);
bookingRouter.post("/", validateBody(bookingSchema), createBooking);
bookingRouter.get("/", getBooking);
bookingRouter.put("/:bookingId", updateBooking);

export { bookingRouter };

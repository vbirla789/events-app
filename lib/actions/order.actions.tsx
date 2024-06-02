"use server";

import Stripe from "stripe";
import {
  CheckoutOrderParams,
  CreateOrderParams,
  GetOrdersByEventParams,
  GetOrdersByUserParams,
} from "@/types";
import { redirect } from "next/navigation";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import Order from "../database/models/order.model";
import Event from "../database/models/event.model";
import { ObjectId } from "mongodb";
import User from "../database/models/user.model";
import { getEventById } from "./event.actions";
import WelcomeEmail from "../../components/shared/Welcome";
import { Resend } from "resend";
import { getUserById } from "./user.actions";
import { Quando } from "next/font/google";

export const checkoutOrder = async (order: CheckoutOrderParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const price = order.isFree ? 0 : Number(order.price) * 100;
  // console.log("Creating session..", order);
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "INR",
            unit_amount: price,
            product_data: {
              name: order.eventTitle,
            },
          },
          quantity: Number(order.quantity),
        },
      ],
      metadata: {
        eventId: order.eventId,
        buyerId: order.buyerId,
        quantity: order.quantity,
      },
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });

    redirect(session.url!);
  } catch (error) {
    throw error;
  }
};
// const resend = new Resend(process.env.RESEND_API_KEY);
export const createOrder = async (order: CreateOrderParams) => {
  try {
    await connectToDatabase();
    console.log("Creating order..", order);

    // Fetch the event by ID
    const event = await getEventById(order.eventId);
    if (!event) {
      throw new Error("Event not found");
    }

    // Ensure there are enough tickets available
    const ticketsRemaining = Number(event.noOfTickets) - Number(order.quantity);
    if (ticketsRemaining < 0) {
      throw new Error("Not enough tickets available");
    }

    // Update the event with the new ticket count
    await Event.updateOne(
      { _id: order.eventId },
      { $set: { noOfTickets: ticketsRemaining } }
    );

    const newOrder = await Order.create({
      ...order,
      event: order.eventId,
      buyer: order.buyerId,
      quantity: order.quantity,
    });

    // // Fetch user details
    // const user = await getUserById(order.buyerId);

    // // Send email to the user
    // await resend.emails.send({
    //   from: "onboarding@resend.dev",
    //   to: "shivangbirla9999@gmail.com",
    //   subject: "Welcome to Resend!",
    //   react: WelcomeEmail({
    //     userFirstName: "John Doe",
    //     loginDate: new Date(2023, 0, 15, 14, 30),
    //     loginDevice: "Mobile",
    //     loginLocation: "San Francisco",
    //     loginIp: "203.0.113.1",
    //   }),
    // });

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleError(error);
    throw error; // Re-throw the error after handling
  }
};

// GET ORDERS BY EVENT
export async function getOrdersByEvent({
  searchString,
  eventId,
}: GetOrdersByEventParams) {
  try {
    await connectToDatabase();

    if (!eventId) throw new Error("Event ID is required");
    const eventObjectId = new ObjectId(eventId);

    const orders = await Order.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "buyer",
          foreignField: "_id",
          as: "buyer",
        },
      },
      {
        $unwind: "$buyer",
      },
      {
        $lookup: {
          from: "events",
          localField: "event",
          foreignField: "_id",
          as: "event",
        },
      },
      {
        $unwind: "$event",
      },
      {
        $project: {
          _id: 1,
          totalAmount: 1,
          createdAt: 1,
          eventTitle: "$event.title",
          eventId: "$event._id",
          buyer: {
            $concat: ["$buyer.firstName", " ", "$buyer.lastName"],
          },
        },
      },
      {
        $match: {
          $and: [
            { eventId: eventObjectId },
            { buyer: { $regex: RegExp(searchString, "i") } },
          ],
        },
      },
    ]);

    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    handleError(error);
  }
}

// GET ORDERS BY USER
export async function getOrdersByUser({
  userId,
  limit = 3,
  page,
}: GetOrdersByUserParams) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = { buyer: userId };

    const orders = await Order.distinct("event._id")
      .find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: "event",
        model: Event,
        populate: {
          path: "organizer",
          model: User,
          select: "_id firstName lastName",
        },
      });

    const ordersCount = await Order.distinct("event._id").countDocuments(
      conditions
    );

    return {
      data: JSON.parse(JSON.stringify(orders)),
      totalPages: Math.ceil(ordersCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// GET ORDER BY ID
export async function getOrderById(orderId: string) {
  try {
    await connectToDatabase();

    const order = await Order.findById(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    return JSON.parse(JSON.stringify(order));
  } catch (error) {
    handleError(error);
    throw error; // Re-throw the error after handling
  }
}

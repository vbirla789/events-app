import { createOrder } from "@/lib/actions/order.actions";
import React from "react";

interface Order {
  stripeId: string;
  eventId: string;
  buyerId: string;
  totalAmount: string;
  createdAt: Date;
}

interface OrderButtonProps {
  order: Order;
}

const OrderButton: React.FC<OrderButtonProps> = ({ order }) => {
  const handleCreateOrder = () => {
    if (order) {
      // createOrder(order);
    } else {
      console.error("Order details are not available");
    }
  };

  return <button onClick={handleCreateOrder}>Click</button>;
};

export default OrderButton;

import { useState } from "react";
import { Button } from "../ui/button";

const TicketStatus = () => {
  const [ticketAccessed, setTicketAccessed] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleAccessTicket = () => {
    setShowConfirmation(true);
  };

  const handleConfirmAccess = () => {
    setTicketAccessed(true);
    setShowConfirmation(false);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="dark:bg-slate-900 border-2 border-slate-600 shadow-2xl rounded-2xl p-12">
        <h1 className="text-3xl font-bold mb-8 flex justify-center">
          Ticket Status
        </h1>
        <div className="flex justify-center">
          {!ticketAccessed && (
            <Button onClick={handleAccessTicket}>Access Ticket</Button>
          )}
          {showConfirmation && (
            <div className="z-10 border-2 border-slate-600 absolute top-[45%] left-[30%] min-w-[40%] py-6 px-5 rounded-lg bg-slate-900">
              <div className="flex justify-center">
                <p>Are you sure you want to access the ticket?</p>
              </div>
              <div className="flex justify-center mt-6 gap-4">
                <Button onClick={handleConfirmAccess}>Yes</Button>
                <Button onClick={() => setShowConfirmation(false)}>No</Button>
              </div>
            </div>
          )}
          {ticketAccessed && (
            <Button className="bg-red-600 hover:bg-red-700">
              Ticket Accessed
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketStatus;

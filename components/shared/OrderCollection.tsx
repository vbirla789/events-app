import { IEvent } from "@/lib/database/models/event.model";
import React from "react";
import Card from "./Card";
import Pagination from "./Pagination";
import { IOrder } from "@/lib/database/models/order.model";
import CardOrder from "./CardOrder";
import Link from "next/link";

type CollectionProps = {
  data: IOrder[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  collectionType?: "Events_Organized" | "My_Tickets" | "All_Events";
};

const OrderCollection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
}: CollectionProps) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <ul className="grid w-full grid-cols-1 gap-8 md:gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {data.map((order) => {
              const hasOrderLink = collectionType === "Events_Organized";
              const hidePrice = collectionType === "My_Tickets";

              return (
                <li key={order._id} className="flex justify-center">
                  <CardOrder
                    order={order}
                    hasOrderLink={hasOrderLink}
                    hidePrice={hidePrice}
                  />
                </li>
              );
            })}
          </ul>

          {totalPages > 1 && (
            <Pagination
              urlParamName={urlParamName}
              page={page}
              totalPages={totalPages}
            />
          )}
        </div>
      ) : (
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center dark:bg-slate-800">
          <h3 className="p-bold-20 md:h5-bold dark:text-white">{emptyTitle}</h3>
          <p className="p-regular-14 dark:text-white">{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};

export default OrderCollection;

import Image from "next/image";
import { getAllEvents } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";
import Search from "@/components/shared/Search";
import CategoryFilter from "@/components/shared/CategoryFilter";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import React, { Suspense } from "react";
import { createOrder } from "@/lib/actions/order.actions";
import ButtonOrder from "@/components/shared/ButtonOrder";

const ProductsPage = async ({ searchParams }) => {
  const page = Number(searchParams?.page) || 1;
  const searchText = searchParams?.query || "";
  const category = searchParams?.category || "";

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6,
  });

  return (
    <div className="p-[28px] rounded-[10px] mt-[20px]">
      <div className="flex items-center justify-between mb-4">
        <div className="">
          <Search />
        </div>

        <div className="min-w-[150px]">
          <CategoryFilter />
        </div>
      </div>
      <table className="w-[100%]">
        <thead className="">
          <tr className="">
            <td className="p-3 font-semibold text-[18px]">Title</td>
            <td className="p-3 font-semibold text-[18px]">Location</td>
            <td className="p-3 font-semibold text-[18px]">Category</td>
            <td className="p-3 font-semibold text-[18px]">Price</td>
            <td className="p-3 font-semibold text-[18px]">Created At</td>
            <td className="p-3 font-semibold text-[18px]">Approve</td>
          </tr>
        </thead>
        <tbody className="">
          {events.data.map((product) => (
            <tr key={product._id} className="">
              <td className="p-3 text-[16px]">
                <div className="flex items-center gap-[10px]">
                  <Image
                    src={product.imageUrl}
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-50% object-cover"
                  />
                  {product.title}
                </div>
              </td>
              <td className="p-3 text-[16px]">{product.location}</td>
              <td className="p-3 text-[16px]">{product.category.name}</td>
              <td className="p-3 text-[16px]">${product.price}</td>
              <td className="p-3 text-[16px]">
                {product.startDateTime?.toString().slice(0, 10)}
              </td>
              <td className="max-w-[40px] p-3 text-[16px]">
                <button className="bg-green-600 text-white mr-5 p-[6px] rounded-lg">
                  accept
                </button>
                <button className="bg-red-600 text-white p-[6px] rounded-lg">
                  reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsPage;

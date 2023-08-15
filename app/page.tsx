"use client";

import Link from "next/link";
import useStore from "./store";
import CustomerTile from "./components/CustomerTile";
import { useState } from "react";

export default function Home() {
  const customers = useStore((state) => state.customers);
  const deleteCustomer = useStore((state) => state.deleteCustomer);
  const [showModal, setShowModal] = useState(false);
  const [currId, setCurrId] = useState<string | null>(null);

  function deleteHandler(id: string) {
    setShowModal(true);
    setCurrId(id);
  }

  return (
    <section>
      <h1>Customer Data Management</h1>
      {customers.length <= 0 ? (
        <div className="h-full w-full grid place-content-center gap-4">
          <h2 className="font-semibold text-xl text-center">
            No Customer was found!
          </h2>
          <Link href="/add-customer"> Add Customer</Link>
        </div>
      ) : (
        <div className="h-full w-full pt-20 flex flex-col gap-20">
          <div className="w-full flex flex-wrap gap-10 justify-center">
            {customers.map((customer) => (
              <div
                key={customer.id}
                className=" w-full sm:max-w-md h-fit p-8 rounded-md bg-neutral-800 flex flex-col gap-3"
              >
                <p className="text-lg font-medium">
                  Name: <span className="font-bold">{customer.name}</span>
                </p>
                <p className="text-lg font-medium">
                  Email: <span className="font-bold">{customer.email}</span>
                </p>
                <p className="text-lg font-medium">
                  Phone Number:{" "}
                  <span className="font-bold">{customer.phoneNumber}</span>
                </p>
                <div className="mt-3 flex gap-6 w-fit">
                  <Link
                    className="text-sm py-2 px-4"
                    href={`/update-customer/${customer.id}`}
                  >
                    Update
                  </Link>
                  <button
                    className="text-sm py-2 px-4"
                    onClick={() => {
                      deleteHandler(customer.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <Link href="/add-customer">Add Customer</Link>
        </div>
      )}
      {showModal && (
        <div className="absolute top-0 left-0 w-screen h-screen grid place-content-center bg-slate-400/60">
          <div className="w-full rounded-md p-6 sm:max-w-lg z-20 bg-slate-700 flex flex-col gap-4">
            <p>Are you sure you want to delete this customer</p>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  deleteCustomer(currId!);
                  setCurrId(null);
                  setShowModal(false);
                }}
              >
                yes
              </button>
              <button
                onClick={() => {
                  setCurrId(null);
                  setShowModal(false);
                }}
              >
                no
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

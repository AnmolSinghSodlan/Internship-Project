import { Customer } from "../types";
import Link from "next/link";

export default function CustomerTile({ data }: { data: Customer }) {
  return (
    <div
      key={data.id}
      className=" w-full sm:max-w-md h-fit p-8 rounded-md bg-neutral-800 flex flex-col gap-3"
    >
      <p className="text-lg font-medium">
        Name: <span className="font-bold">{data.name}</span>
      </p>
      <p className="text-lg font-medium">
        Email: <span className="font-bold">{data.email}</span>
      </p>
      <p className="text-lg font-medium">
        Phone Number: <span className="font-bold">{data.phoneNumber}</span>
      </p>
      <div className="mt-3 flex gap-6 w-fit">
        <Link
          className="text-sm py-2 px-4"
          href={`/update-customer/${data.id}`}
        >
          Update
        </Link>
        <button className="text-sm py-2 px-4" onClick={() => {}}>
          Delete
        </button>
      </div>
    </div>
  );
}

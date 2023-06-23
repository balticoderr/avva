"use client";

import Image from "next/image";
import useLoadImage from "@/hooks/useLoadImage";
import { Address } from "@/types";
import { useRouter } from "next/navigation";

interface AddressItemProps {
  data: Address;
  onClick: (id: string) => void;
}

const AddressItem: React.FC<AddressItemProps> = ({ data, onClick }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/address/${data.id}`)}
      className="
        relative
        group
        flex
        flex-col
        items-center
        justify-center
        rounded-md
        overflow-hidden
        gap-x-4
        bg-neutral-400/5
        cursor-pointer
        hover:bg-neutral-400/10
        transition
        p-3
      "
    >
      <div
        className="
          flex
          flex-col
          items-center
          w-full
          p-4
          gap-y-4
        "
      >
        <p className="font-semibold trancate w-full">{data.title}</p>
      </div>
    </div>
  );
};

export default AddressItem;

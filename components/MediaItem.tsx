"use client";

import { Address } from "@/types";
import { useRouter } from "next/navigation";

import { TbSelect } from "react-icons/tb";

interface MediaItemProps {
  data: Address;
}

const MediaItem: React.FC<MediaItemProps> = ({ data }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/address/${data.id}`)}
      className="
        flex
        items-center
        justify-between
        gap-x-3
        cursor-pointer
        hover:bg-neutral-600/50
        w-full
        p-2
        rounded-md
        group
      "
    >
      <p className="text-white truncate ">{data.title}</p>
      <TbSelect className="opacity-0 group-hover:opacity-100" />
    </div>
  );
};

export default MediaItem;

"use client";

import MediaItem from "@/components/MediaItem";
import { useUser } from "@/hooks/useUser";
import { Address } from "@/types";
import React from "react";

interface SearchContentProps {
  addresses: Address[];
}
const SearchContent: React.FC<SearchContentProps> = ({ addresses }) => {
  const { user } = useUser();
  if (!user) {
    return (
      <div
        className="
          flex
          flex-col  
          gap-y-2
          w-full
          px-6
          text-neutral-400
        "
      >
        Prisijunkite norėdami matyti adresus.
      </div>
    );
  }

  if (addresses.length === 0) {
    return (
      <div
        className="
          flex
          flex-col  
          gap-y-2
          w-full
          px-6
          text-neutral-400
        "
      >
        Nerasta jokių adresų.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2 w-full px-6">
      {addresses.map((address: Address) => (
        <div key={address.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <MediaItem data={address} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchContent;

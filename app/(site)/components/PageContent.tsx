"use client";

import AddressItem from "@/components/AddressItem";
import { useUser } from "@/hooks/useUser";
import { Address } from "@/types";
import React from "react";

interface PageContentProps {
  addresses: Address[];
}

const PageContent: React.FC<PageContentProps> = ({ addresses }) => {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="mt-4 text-neutral-400">
        Prisijunkite norėdami matyti adresus.
      </div>
    );
  }

  if (addresses.length === 0) {
    return <div className="mt-4 text-neutral-400">Adresų nėra.</div>;
  }
  return (
    <div
      className="
        grid 
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-4
        mt-4
      "
    >
      {addresses.map((item) => (
        <AddressItem key={item.id} onClick={() => {}} data={item} />
      ))}
    </div>
  );
};

export default PageContent;

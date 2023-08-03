"use client";
import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import { Address } from "@/types";
import { AiOutlinePlus } from "react-icons/ai";
import { FaSortAmountUpAlt } from "react-icons/fa";

import MediaItem from "./MediaItem";

interface LatestAddressesProps {
  addresses: Address[];
}

const LatestAddresses: React.FC<LatestAddressesProps> = ({ addresses }) => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user } = useUser();

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    return uploadModal.onOpen();
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <FaSortAmountUpAlt className="text-neutral-400" size={26} />
          <p
            className="
            text-neutral-400 
              font-medium 
              text-md"
          >
            Naujausi adresai
          </p>
        </div>
        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className="
            text-neutral-400
            cursor-pointer
            hover:text-white
            transition
          "
        />
      </div>
      <div
        className="
          flex
          flex-col
          gap-y-2
          mt-4
          px-3
      "
      >
        {!user ? (
          <div className="mt-4 text-neutral-400">
            Prisijunkite norėdami matyti adresus.
          </div>
        ) : addresses.length > 0 ? (
          addresses.map((item) => <MediaItem key={item.id} data={item} />)
        ) : (
          <div className="mt-4 text-neutral-400">Adresų nėra.</div>
        )}
      </div>
    </div>
  );
};

export default LatestAddresses;

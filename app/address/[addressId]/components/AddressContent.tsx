"use client";
import useAuthModal from "@/hooks/useAuthModal";
import useDeleteModal from "@/hooks/useDeleteModal";
import { Address } from "@/types";
import { useUser } from "@/hooks/useUser";
import React from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { twMerge } from "tailwind-merge";
import { useRouter, redirect } from "next/navigation";

interface AddressContentProps {
  data: Address;
}

const AddressContent: React.FC<AddressContentProps> = ({ data }) => {
  const authModal = useAuthModal();
  const deleteModal = useDeleteModal();
  const { user } = useUser();
  const router = useRouter();
  // const currentURL = window.location.href;
  // const currentAddressId = currentURL.substring(
  //   currentURL.lastIndexOf("/") + 1
  // );

  if (!data.codes) {
    redirect("/");
  }
  const codesArray = data.codes.split(" ");

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }
    if (data) {
      return deleteModal.onOpen();
    }
  };

  return (
    <div
      className="        
        grid 
        grid-cols-1

      "
    >
      <div>
        <div
          className="
            text-2xl 
            semibold 
            text-white 
            underline
            underline-offset-8
            decoration-2
            decoration-white
            mb-6
          "
        >
          {data.title}
        </div>

        <div className="block w-full md:max-w-sm p-6  border rounded-lg shadow  dark:bg-gray-800 dark:border-gray-900">
          <h5 className="mb-2 text-2xl font-bold tracking-tight dark:text-white">
            Laiptinių kodai
          </h5>
          {codesArray.map((item, index) => (
            <div key={index} className="flex items-center">
              <span className="bg-white text-black rounded p-2 m-1">
                {index + 1}
              </span>
              <p className="font-normal dark:text-gray-400 ">{item}</p>
            </div>
          ))}
          <h5 className="mb-2 text-2xl font-bold tracking-tight dark:text-white">
            Papildoma informacija
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {data.details ? data.details : "Informacijos nėra..."}
          </p>
        </div>
      </div>
      {user && (
        <div className="flex items-center justify-center md:justify-start gap-4 mt-8">
          <button
            onClick={onClick}
            className={twMerge(
              `
            rounded-full  
            bg-red-800
            w-44
            border
            border-transparent
            px-3
            py-3
            disabled:cursor-not-allowed
            disabled:opacity-50
            opacity-75
            text-white
            font-bold
            hover:opacity-100
            transition 
            flex
            flex-inline
            items-center
            justify-center `
            )}
          >
            <AiFillDelete size={20} className="" />
            <p className="ml-1">Ištrinti</p>
          </button>
          <button
            onClick={() => router.push(`/address/${data.id}/update`)}
            className={twMerge(
              `
            rounded-full  
            bg-green-500
            w-44
            border
            border-transparent
            px-3
            py-3
            disabled:cursor-not-allowed
            disabled:opacity-50
            opacity-75
            text-white
            font-bold
            hover:opacity-100
            transition 
            flex
            flex-inline
            items-center
            justify-center `
            )}
          >
            <AiFillEdit
              size={20}
              className="
          flex
          ml-1
          "
            />
            <p className="ml-1">Redaguoti</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default AddressContent;

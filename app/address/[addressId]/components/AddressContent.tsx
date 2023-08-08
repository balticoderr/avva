"use client";
import useAuthModal from "@/hooks/useAuthModal";
import useDeleteModal from "@/hooks/useDeleteModal";
import { Address } from "@/types";
import { useUser } from "@/hooks/useUser";
import React from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { useRouter, redirect } from "next/navigation";
import Link from "next/link";

interface AddressContentProps {
  data: Address;
}

const AddressContent: React.FC<AddressContentProps> = ({ data }) => {
  const authModal = useAuthModal();
  const deleteModal = useDeleteModal();
  const { user } = useUser();
  const router = useRouter();

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
          className="flex             
            flex-inline mb-8"
        >
          <div
            className="text-2xl 
            semibold 
            text-white 
            underline
            underline-offset-8
            decoration-2
            decoration-white
            pr-8
            "
          >
            {data.title}
          </div>
          <Link
            className="       
            rounded-full  
            bg-green-500
            text-xs
            w-44
            border
            border-transparent
            px-2
            py-2
            font-bold
            disabled:cursor-not-allowed
            disabled:opacity-50
            opacity-75
            text-white
            hover:opacity-100
            transition 
            flex
            flex-inline
            items-center
            justify-center
            "
            href={`https://maps.lt/map/search/${data.title}, Jonava`}
            target="_blank"
          >
            <FaMapMarkerAlt className="pr-1" />
            Rodyti žemėlapyje
          </Link>
        </div>

        <div className="block w-full md:max-w-sm p-6  border rounded-lg shadow  bg-gray-800 border-gray-900">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
            Laiptinių kodai
          </h5>
          {codesArray.map((item, index) => (
            <div key={index} className="flex items-center">
              <span className="bg-white text-black rounded p-2 m-1">
                {index + 1}
              </span>
              <p className="font-normal text-gray-400 ">{item}</p>
            </div>
          ))}
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
            Papildoma informacija
          </h5>
          <p className="font-normal text-gray-400">
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

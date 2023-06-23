import { Address } from "@/types";
import React from "react";

interface AddressContentProps {
  data: Address;
}

const AddressContent: React.FC<AddressContentProps> = ({ data }) => {
  return <div>{data.title}</div>;
};

export default AddressContent;

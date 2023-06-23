import { Address } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import getAddresses from "./getAddresses";

const getAddressById = async (id: string): Promise<Address> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  if (!id) {
    console.log("Toks puslapis neegzistuoja");
  }

  const { data, error } = await supabase
    .from("addresses")
    .select("*")
    .eq("id", `${id}`)
    .single();

  if (error) {
    console.log(error);
  }

  return (data as Address) || {};
};

export default getAddressById;

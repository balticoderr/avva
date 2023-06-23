import { Address } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import getAddresses from "./getAddresses";

const getAddressesByTitle = async (title: string): Promise<Address[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  if (!title) {
    const allAddresses = await getAddresses();
    return allAddresses;
  }

  const { data, error } = await supabase
    .from("addresses")
    .select("*")
    .ilike("title", `%${title}%`)
    .order("title", { ascending: true });

  if (error) {
    console.log(error);
  }

  return (data as any) || [];
};

export default getAddressesByTitle;

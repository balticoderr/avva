import { Address } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getAddresses = async (): Promise<Address[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data, error } = await supabase
    .from("addresses")
    .select("*")
    .order("title", { ascending: true });

  if (error) {
    console.log(error);
  }

  return (data as any) || [];
};

export default getAddresses;

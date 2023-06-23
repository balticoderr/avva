import { Address } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { count } from "console";
import { cookies } from "next/headers";

const getLatestAddresses = async (): Promise<Address[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data, error } = await supabase
    .from("addresses")
    .select("*")
    .order("created_at", { ascending: false })
    .range(0, 15);

  if (error) {
    console.log(error);
  }

  return (data as any) || [];
};

export default getLatestAddresses;

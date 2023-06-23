import { Address } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadImage = (address: Address) => {
  const supabaseClient = useSupabaseClient();

  if (!address) {
    return null;
  }

  const { data: imageData } = supabaseClient.storage
    .from("images")
    .getPublicUrl(address.image_path);
  return imageData.publicUrl;
};

export default useLoadImage;

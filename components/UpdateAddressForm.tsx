"use client";
import { useUser } from "@/hooks/useUser";
import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import Button from "./Button";
import Input from "./Input";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { Address } from "@/types";

interface UpdateAddressFormProps {
  currentData: Address;
}

const UpdateAddressForm: React.FC<UpdateAddressFormProps> = ({
  currentData,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [oldData, setOldData] = useState({
    title: currentData.title,
    codes: currentData.codes,
    details: currentData.details,
  });

  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const values = oldData;

  const currentURL = window.location.href;
  const currentAddressId = currentURL.substring(
    currentURL.lastIndexOf("/") + 1
  );

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      codes: "",
      details: "",
    },
    values,
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      if (!user) {
        toast.error("Neprisijungę vartotojai negali atnaujinti duomenų");
        return;
      }

      const { data: selectedData, error: supabaseError } = await supabaseClient
        .from("addresses")
        .update({
          user_id: user.id,
          title: values.title,
          codes: values.codes,
          details: values.details,
        })
        .eq("id", currentData.id);

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }

      router.push(`/address/${currentData.id}`);
      setIsLoading(false);
      toast.success("Adresas atnaujintas!");
      reset();
    } catch (error) {
      toast.error("Kažkas nutiko.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form
      className="
          flex
          flex-col
          gap-y-4
      "
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        id="title"
        disabled={isLoading}
        {...register("title", { required: true })}
        placeholder="Adresas"
      />
      <Input
        id="codes"
        disabled={isLoading}
        {...register("codes", { required: true })}
        placeholder="Laiptinių kodai"
      />
      <Input
        id="details"
        disabled={isLoading}
        {...register("details", { required: false })}
        placeholder="Papildoma informacija"
      />

      <div
        className="
          flex
          flex-row
          gap-x-4
      "
        onSubmit={handleSubmit(onSubmit)}
      >
        <Button
          className="bg-red-800"
          disabled={isLoading}
          onClick={() => router.push(`/address/${currentData.id}`)}
        >
          Grįžti atgal
        </Button>
        <Button disabled={isLoading} type="submit">
          Išsaugoti
        </Button>
      </div>
    </form>
  );
};

export default UpdateAddressForm;

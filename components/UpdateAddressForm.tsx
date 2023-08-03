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
import useExplainModal from "@/hooks/useExplainModal";
import useAuthModal from "@/hooks/useAuthModal";
import { BsQuestionCircleFill } from "react-icons/bs";

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
  const authModal = useAuthModal();
  const explainModal = useExplainModal();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const values = oldData;

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      codes: "",
      details: "",
    },
    values,
  });

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    return explainModal.onOpen();
  };

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
      <div className="flex">
        <Input
          id="codes"
          disabled={isLoading}
          {...register("codes", { required: true })}
          placeholder="Laiptinių kodai"
        />
        <BsQuestionCircleFill
          onClick={onClick}
          size={20}
          className="m-3 opacity-70 hover:opacity-100 cursor-pointer"
        />
      </div>

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
          className="bg-red-800 text-white"
          disabled={isLoading}
          onClick={() => router.push(`/address/${currentData.id}`)}
        >
          Grįžti atgal
        </Button>
        <Button className=" text-white" disabled={isLoading} type="submit">
          Išsaugoti
        </Button>
      </div>
    </form>
  );
};

export default UpdateAddressForm;

"use client";
import { useUser } from "@/hooks/useUser";
import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import Button from "./Button";
import Input from "./Input";
import Modal from "./Modal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import useUpdateModal from "@/hooks/useUpdateModal";

const UpdateModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const updateModal = useUpdateModal();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const curentURL = window.location.href;
  const currentAddressId = curentURL.substring(curentURL.lastIndexOf("/") + 1);
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      codes: "",
      details: "",
      image: null,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      updateModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      if (!user) {
        toast.error("Ne visi laukeliai užpildyti");
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
        .eq("id", currentAddressId);

      console.log("update address:", selectedData, "error:", supabaseError);

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }

      router.refresh();

      setIsLoading(false);
      toast.success("Adresas atnaujintas!");
      reset();
      updateModal.onClose();
    } catch (error) {
      toast.error("Kažkas nutiko.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal
      title="Redaguoti adresą"
      description="Norint atnaujinti duomenis, užpildyk lentelę."
      isOpen={updateModal.isOpen}
      onChange={onChange}
    >
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
          value={"test"}
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

        <Button disabled={isLoading} type="submit">
          Išsaugoti
        </Button>
      </form>
    </Modal>
  );
};

export default UpdateModal;

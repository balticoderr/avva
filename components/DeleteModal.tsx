"use client";
import useUploadModal from "@/hooks/useUploadModal";
import uniqid from "uniqid";
import { useUser } from "@/hooks/useUser";
import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import Button from "./Button";
import Input from "./Input";
import Modal from "./Modal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { userAgent } from "next/server";
import { useRouter } from "next/navigation";
import useDeleteModal from "@/hooks/useDeleteModal";
import { DeleteModalProps } from "@/types";

const DeleteModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const deleteModal = useDeleteModal();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const curentURL = window.location.href;
  const currentAddressId = curentURL.substring(curentURL.lastIndexOf("/") + 1);
  const { handleSubmit } = useForm();

  const onChange = (open: boolean) => {
    if (!open) {
      deleteModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      if (!user) {
        toast.error("Ne visi laukeliai užpildyti");
        return;
      }

      const { error: supabaseError } = await supabaseClient
        .from("addresses")
        .delete()
        .eq("id", currentAddressId);

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }

      setIsLoading(false);
      toast.success("Adresas ištrintas");
      deleteModal.onClose();
      router.push("/");
    } catch (error) {
      toast.error("Nepavyko ištrinti adreso.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal
      title="Ištrinti adresą"
      description="Jei tikrai norite ištrinti adresą spauskite 'Ištrinti'"
      isOpen={deleteModal.isOpen}
      onChange={onChange}
    >
      <form
        className="
          flex
          flex-row
          gap-x-4
      "
        onSubmit={handleSubmit(onSubmit)}
      >
        <Button disabled={isLoading} onClick={deleteModal.onClose}>
          Atšaukti
        </Button>
        <Button disabled={isLoading} type="submit">
          Ištrinti
        </Button>
      </form>
    </Modal>
  );
};

export default DeleteModal;

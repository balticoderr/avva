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

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const uploadModal = useUploadModal();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

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
      uploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);
      const uniqueID = uniqid();
      const imageFile = values.image?.[0];

      if (!user) {
        toast.error("Ne visi laukeliai užpildyti");
        return;
      }

      if (!imageFile) {
        const { error: supabaseError } = await supabaseClient
          .from("addresses")
          .insert({
            user_id: user.id,
            title: values.title,
            codes: values.codes,
            details: values.details,
            image_path: null,
          });

        if (supabaseError) {
          setIsLoading(false);
          return toast.error(supabaseError.message);
        }
        router.refresh();

        setIsLoading(false);
        toast.success("Adresas sukurtas!");
        reset();
        uploadModal.onClose();
      } else {
        const { data: imageData, error: imageError } =
          await supabaseClient.storage
            .from("images")
            .upload(`image-${uniqueID}`, imageFile, {
              cacheControl: "3600",
              upsert: false,
            });

        if (imageError) {
          setIsLoading(false);
          return toast.error("Nepavyko įkelti nuotraukos.");
        }

        const { error: supabaseError } = await supabaseClient
          .from("addresses")
          .insert({
            user_id: user.id,
            title: values.title,
            codes: values.codes,
            details: values.details,
            image_path: `${imageFile ? imageData.path : null}`,
          });

        if (supabaseError) {
          setIsLoading(false);
          return toast.error(supabaseError.message);
        }

        router.refresh();

        setIsLoading(false);
        toast.success("Adresas sukurtas!");
        reset();
        uploadModal.onClose();
      }
    } catch (error) {
      toast.error("Kažkas nutiko.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal
      title="Pridėti adresą"
      description="Užpildyk naujo adreso sukurimo formą"
      isOpen={uploadModal.isOpen}
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
          Sukurti
        </Button>
      </form>
    </Modal>
  );
};
// 2:54 TODO

export default UploadModal;

"use client";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { FaSortAmountUpAlt, FaUserAlt } from "react-icons/fa";

import { HiHome, HiSearch } from "react-icons/hi";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { toast } from "react-hot-toast";
import { data } from "autoprefixer";
import { AiOutlineLogout, AiOutlinePlus } from "react-icons/ai";
import useUploadModal from "@/hooks/useUploadModal";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const authModal = useAuthModal();
  const router = useRouter();

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const uploadModal = useUploadModal();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();

    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out!");
    }
  };

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    return uploadModal.onOpen();
  };

  return (
    <div
      className={twMerge(
        `
        h-fit
        bg-gradient-to-b
        from-emerald-800
        p-6
      `,
        className
      )}
    >
      <div
        className="
          w-full
          mb-4
          flex
          items-center
          justify-between
        "
      >
        <div
          className="
            hidden
            md:flex
            gap-x-2
            items-center
          "
        >
          <button
            onClick={() => router.back()}
            className="
              rounded-full
              bg-black
              flex items-center
              justify-center
              hover:opacity-75
              transition
            "
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>
          <button
            onClick={() => router.forward()}
            className="
              rounded-full
              bg-black
              flex items-center
              justify-center
              hover:opacity-75
              transition
            "
          >
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button
            onClick={() => router.push("/")}
            className="
              rounded-full
              p-2
              bg-white
              items-center
              justify-center
              hover:opacity-75
              transition
            "
          >
            <HiHome className="text-black" size={20} />
          </button>
          <button
            onClick={() => router.push("/search")}
            className="
              rounded-full
              p-2
              bg-white
              items-center
              justify-center
              hover:opacity-75
              transition
            "
          >
            <HiSearch className="text-black" size={20} />
          </button>
          <button
            onClick={() => router.push("/latest")}
            className="
              rounded-full
              p-2
              bg-white
              items-center
              justify-center
              hover:opacity-75
              transition
            "
          >
            <FaSortAmountUpAlt className="text-black" size={20} />
          </button>
          <button
            onClick={onClick}
            className="
              rounded-full
              p-2
              bg-white
              items-center
              justify-center
              hover:opacity-75
              transition
              block
              md:hidden
            "
          >
            <AiOutlinePlus className="text-black" size={20} />
          </button>
        </div>
        <div
          className="
            flex
            justify-between
            items-center
            gap-x-4
          "
        >
          {user ? (
            <div
              className="
                flex 
                gap-4
                items-center
              "
            >
              <Button onClick={() => {}} className="bg-white hidden md:block">
                <div className="flex bg-white">
                  <FaUserAlt /> <p className="text-xs pl-1">{user.email}</p>
                </div>
              </Button>
              <Button
                onClick={handleLogout}
                className="
                  bg-white
                  px-4
                  py-2
                  ml-2
                "
              >
                Logout
              </Button>
            </div>
          ) : (
            <div>
              <Button onClick={authModal.onOpen} className="bg-white px-6 py-2">
                Login
              </Button>
            </div>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;

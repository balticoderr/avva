import getAddressById from "@/actions/getAddressById";
import Header from "@/components/Header";
import AddressContent from "./components/AddressContent";
import Image from "next/image";

// for up to date data
export const revalidate = 0;

interface AddressPageProps {
  params: {
    addressId: string;
  };
}

export default async function AddressPage({
  params: { addressId },
}: AddressPageProps) {
  const address = await getAddressById(addressId);

  return (
    <div
      className="
      bg-neutral-900
        rounded-lg
        h-full
        w-full
        overflow-hidden
        overflow-y-auto
  "
    >
      <Header>
        <div className="flex justify-between items center">
          <h1 className="text-white text-2xl font-semibold">Adresas</h1>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <AddressContent data={address} />
      </div>
    </div>
  );
}

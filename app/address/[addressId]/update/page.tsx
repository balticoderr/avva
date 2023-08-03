import getAddressById from "@/actions/getAddressById";
import Header from "@/components/Header";
import UpdateAddressForm from "@/components/UpdateAddressForm";

// for up to date data
export const revalidate = 0;

interface UpdateAddressPageProps {
  params: {
    addressId: string;
  };
}

export default async function UpdateAddressPage({
  params: { addressId },
}: UpdateAddressPageProps) {
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
        {/* TODO: create form for updating address data. Also load up old data for reference */}
        <UpdateAddressForm currentData={address} />
      </div>
    </div>
  );
}

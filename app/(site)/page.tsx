import getAddresses from "@/actions/getAddresses";
import Header from "@/components/Header";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import PageContent from "./components/PageContent";

// for up to date data
export const revalidate = 0;

export default async function Home() {
  const addresses = await getAddresses();

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
          <h1 className="text-white text-2xl font-semibold">Visi adresai</h1>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <PageContent addresses={addresses} />
      </div>
    </div>
  );
}

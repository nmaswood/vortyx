import Link from "next/link";
import Image from "next/image";

export const VortyxHeader = () => {
  return (
    <div className="relative flex w-full flex-row justify-center gap-6 px-4 py-4 md:justify-between h-[60px]">
      <Link href="/">
        <Image
          src="/logo-clipped.png"
          alt="Vortyx Logo"
          width={100}
          height={100}
        />
      </Link>
    </div>
  );
};

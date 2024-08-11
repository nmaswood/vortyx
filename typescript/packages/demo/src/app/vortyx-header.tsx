import Image from "next/image";
import Link from "next/link";

export const VortyxHeader = () => {
  return (
    <div className="relative flex h-[60px] w-full flex-row justify-center gap-6 p-4 md:justify-between">
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

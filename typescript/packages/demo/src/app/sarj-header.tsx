import Link from "next/link";

export const SarjHeader = () => {
  return (
    <div className="relative flex w-full flex-row justify-center gap-6 px-8 py-3 md:justify-between">
      <div className="flex flex-row gap-3">
        <Link href="/">
          <h2 className="text-xl font-semibold">vortyx.ai</h2>
        </Link>
      </div>
    </div>
  );
};

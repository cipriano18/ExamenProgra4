import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import HomeLogo from "@/app/ui/home-logo";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md p-4 md:h-40
             bg-gradient-to-r from-[#6c63ff] via-[#8B86FB] to-[#6c63ff]
             bg-[length:200%_200%] animate-bg-pan text-white"
        href="/"
      >
        <div className="w-32 md:w-40">
          <HomeLogo />
        </div>
      </Link>

      <div className="flex grow flex-row space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
      </div>
    </div>
  );
}

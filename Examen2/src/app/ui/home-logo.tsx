import { HomeIcon } from '@heroicons/react/24/outline';
import { montserrat } from '@/app/ui/fonts';

export default function HomeLogo() {
  return (
    <div
      className={`${montserrat.className} flex flex-row items-center leading-none text-white`}
    >
      <HomeIcon className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rotate-[15deg]" />
      <p className="text-lg sm:text-2xl md:text-[44px] ml-2">Inicio</p>
    </div>
  );
}

import {
  UserGroupIcon,
  RectangleStackIcon,
} from '@heroicons/react/24/outline';
const links = [
  {
    name: 'Tareas',
    href: '/ui/dashboard/Tasks',
    icon: RectangleStackIcon,
  },
  { name: 'Usuarios', href: '/ui/dashboard/Users', icon: UserGroupIcon },
];

export default function NavLinks() {
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <a
            key={link.name}
            href={link.href}
            className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-[#918cdb] hover:text-white md:flex-none md:justify-start md:p-2 md:px-3"
          > 
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </a>
        );
      })}
    </>
  );
}

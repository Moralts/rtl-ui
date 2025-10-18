"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import InstanceHeader from "@/components/layout/instance-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const icons = {
  basic: (
    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4v16m8-8H4"
      />
    </svg>
  ),
  mods: (
    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      />
    </svg>
  ),
  modify: (
    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15.232 5.232l3.536 3.536M9 13l6.232-6.232a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L5.232 11.232a2 2 0 010-2.828z"
      />
    </svg>
  ),
  export: (
    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 4v16h16V4H4zm8 8v4m0 0l-4-4m4 4l4-4"
      />
    </svg>
  ),
  resources: (
    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  ),
  shaders: (
    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  ),
  worlds: (
    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 104 0 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  screenshots: (
    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  ),
};

export default function InstanceSettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { href: '/instance-settings/basic', label: '基础', icon: icons.basic },
    { href: '/instance-settings/mods', label: 'Mods', icon: icons.mods },
    { href: '/instance-settings/modify', label: '修改', icon: icons.modify },
    { href: '/instance-settings/export', label: '导出', icon: icons.export },
    { href: '/instance-settings/resources', label: '资源', icon: icons.resources },
    { href: '/instance-settings/shaders', label: '光影', icon: icons.shaders },
    { href: '/instance-settings/worlds', label: '世界', icon: icons.worlds },
    { href: '/instance-settings/screenshots', label: '截图', icon: icons.screenshots },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="space-y-4">
        <InstanceHeader />

        <div className="grid grid-cols-12 gap-4">
          <aside className="col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>实例设置</CardTitle>
              </CardHeader>
              <CardContent>
                <nav className="flex flex-col space-y-2">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
                        pathname === link.href
                          ? 'bg-gray-100 dark:bg-gray-800 font-semibold'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </aside>

          <main className="col-span-10">
            <div className="space-y-4">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}

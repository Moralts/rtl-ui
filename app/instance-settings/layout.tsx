"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import InstanceHeader from "@/components/layout/instance-header";
import AccountSwitcher from "@/components/accounts/AccountSwitcher";
import { useAccountContext } from "@/components/accounts/AccountProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";
import {
  Settings,
  Pencil,
  Share2,
  Package,
  Palette,
  Globe,
  Image,
  Layers,
  Zap,
} from "lucide-react";

const icons = {
  basic: <Settings className="h-5 w-5 mr-2" />,
  mods: <Package className="h-5 w-5 mr-2" />,
  modify: <Pencil className="h-5 w-5 mr-2" />,
  export: <Share2 className="h-5 w-5 mr-2" />,
  resources: <Palette className="h-5 w-5 mr-2" />,
  shaders: <Layers className="h-5 w-5 mr-2" />,
  worlds: <Globe className="h-5 w-5 mr-2" />,
  screenshots: <Image className="h-5 w-5 mr-2" />,
  projector: <Zap className="h-5 w-5 mr-2" />,
};

export default function InstanceSettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { selectedProfile, selectProfile } = useAccountContext();
  const [isProfileSelectorOpen, setIsProfileSelectorOpen] = useState(false);

  const links = [
    { href: '/instance-settings/basic', label: '基础', icon: icons.basic },
    { href: '/instance-settings/modify', label: '高级', icon: icons.modify },
    { href: '/instance-settings/export', label: '导出', icon: icons.export },
    { href: '/instance-settings/mods', label: 'Mods', icon: icons.mods },
    { href: '/instance-settings/resources', label: '资源', icon: icons.resources },
    { href: '/instance-settings/shaders', label: '光影', icon: icons.shaders },
    { href: '/instance-settings/projector', label: '投影', icon: icons.projector },
    { href: '/instance-settings/worlds', label: '世界', icon: icons.worlds },
    { href: '/instance-settings/screenshots', label: '截图', icon: icons.screenshots },
  ];

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="space-y-4 flex-1 overflow-hidden flex flex-col min-h-0 mx-2 p-2">
        <div className="sticky top-0 z-10 bg-background">
          <InstanceHeader
            instanceName="RTL World"
            minecraftVersion="Minecraft 1.21.8"
            loader="Fabric 0.17.2"
            modsCount={72}
            selectedProfile={selectedProfile}
            onOpenProfileSelector={() => setIsProfileSelectorOpen(true)}
            className="p-2"
          />
        </div>
        <AccountSwitcher open={isProfileSelectorOpen} onClose={() => setIsProfileSelectorOpen(false)} onSelect={selectProfile} />

        <div className="grid grid-cols-12 gap-3 flex-1 min-h-0">
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

          <main className="col-span-10 overflow-y-auto min-h-0 no-scrollbar">
            <div className="space-y-4">{children}</div>
          </main>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
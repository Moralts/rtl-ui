"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type InstanceHeaderProps = {
  instanceName?: string;
  minecraftVersion?: string;
  loader?: string;
  modsCount?: number;
  selectedProfile?: { name: string; status: string };
};

export default function InstanceHeader({
  instanceName = "RTL World",
  minecraftVersion = "Minecraft 1.21.8",
  loader = "Fabric 0.17.2",
  modsCount = 72,
  selectedProfile = { name: "RTL User", status: "正版验证" },
}: InstanceHeaderProps) {
  return (
    <Card className="p-3">
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-dashed flex items-center justify-center mr-3">
          <img
            src="https://fabricmc.net/assets/logo.png"
            alt="实例图标"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex-1 flex justify-between items-center">
          <div className="flex items-center flex-wrap gap-1">
            <h2 className="text-lg font-bold mr-2">{instanceName}</h2>
            <Badge variant="default">{minecraftVersion}</Badge>
            <Badge variant="secondary">{loader}</Badge>
            <Badge variant="secondary" className="bg-blue-500 text-white dark:bg-blue-600">
              {modsCount} Mods
            </Badge>
          </div>

          <div className="flex items-center gap-4">
            <Card className="cursor-pointer transition-all duration-200 flex flex-row items-center p-2">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <div className="bg-gray-200 border-2 border-dashed rounded-full w-full h-full flex items-center justify-center"></div>
              </div>
              <div className="ml-2">
                <div className="font-semibold text-sm">{selectedProfile.name}</div>
                <div className="text-gray-500 text-xs">{selectedProfile.status}</div>
              </div>
            </Card>

            <Button variant="outline" size="sm">
              实例选择
            </Button>
            <Button size="sm" variant="default">
              启动游戏
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

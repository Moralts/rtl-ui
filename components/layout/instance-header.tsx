"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Account } from "@/types";

type InstanceHeaderProps = {
  instanceName?: string;
  minecraftVersion?: string;
  loader?: string;
  modsCount?: number;
  selectedProfile?: Account | null;
  onOpenProfileSelector?: () => void;
  className?: string;
};

export default function InstanceHeader({
  instanceName = "RTL World",
  minecraftVersion = "Minecraft 1.21.8",
  loader = "Fabric 0.17.2",
  modsCount = 72,
  selectedProfile = { id: 0, name: "RTL User", status: "正版验证" },
  onOpenProfileSelector,
  className,
}: InstanceHeaderProps) {
  return (
    <Card className={cn("p-3", className)}>
      <div className="flex items-center flex-wrap gap-3">
        <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-dashed flex items-center justify-center shrink-0">
          <img
            src="https://fabricmc.net/assets/logo.png"
            alt="实例图标"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div className="flex items-center flex-wrap gap-1">
            <h2 className="text-lg font-bold mr-2">{instanceName}</h2>
            <Badge variant="default">{minecraftVersion}</Badge>
            <Badge variant="secondary">{loader}</Badge>
            <Badge variant="secondary" className="bg-blue-500 text-white dark:bg-blue-600">
              {modsCount} Mods
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onOpenProfileSelector}
              className="gap-2 h-auto py-1.5 px-2"
              aria-label="切换账户"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden bg-primary/10 border-2 border-dashed flex items-center justify-center">
                <span className="font-medium text-sm text-primary">
                  {(selectedProfile?.name ?? 'U').charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="text-left leading-tight">
                <div className="font-semibold text-sm">{selectedProfile?.name ?? 'Unknown'}</div>
                <div className="text-xs text-muted-foreground">{selectedProfile?.status ?? ''}</div>
              </div>
            </Button>

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

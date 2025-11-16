"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Account } from "@/types";

type ProfileCardProps = {
  selectedProfile: Account | null;
  onOpenProfileSelector: () => void;
};

export function ProfileCard({ selectedProfile, onOpenProfileSelector }: ProfileCardProps) {
  return (
    <Card className="transition-all duration-700 ease-in-out h-full flex flex-col justify-between">
      {/* 卡片主要内容区域 */}
      <CardContent className="flex-grow flex flex-col items-center justify-center transition-all duration-700 ease-in-out">
        <Card
          className="cursor-pointer transition-all duration-700 ease-in-out flex flex-row items-center p-3 w-full hover:bg-accent"
          onClick={onOpenProfileSelector}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onOpenProfileSelector();
            }
          }}
        >
          <div className="transition-all duration-700 ease-in-out w-12 h-12 rounded-full overflow-hidden transform-gpu">
            <div className="bg-primary/10 border-2 border-dashed rounded-full w-full h-full flex items-center justify-center transition-all duration-700 ease-in-out">
              <span className="font-medium text-primary">
                {(selectedProfile?.name ?? 'RTL User').charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <div className="transition-all duration-700 ease-in-out ml-3 flex flex-col">
            <span className="font-bold transition-all duration-700 ease-in-out text-base">
              {selectedProfile?.name ?? 'RTL User'}
            </span>
            <span className="transition-all duration-700 ease-in-out text-muted-foreground text-xs">
              {selectedProfile?.status ?? ''}
            </span>
          </div>
        </Card>
      </CardContent>

      {/* 卡片底部按钮区域 */}
      <CardContent className="flex items-center space-x-4 transition-all duration-700 ease-in-out">
        <div className="w-full">
          <div className="text-center text-sm text-muted-foreground mb-2 transition-all duration-700 ease-in-out">
            1.21.7 Fabric
          </div>
          <Button variant="default" size="lg" className="w-full mb-2 transition-all duration-700 ease-in-out">
            启动游戏
          </Button>
          <div className="flex space-x-2 mt-2 transition-all duration-700 ease-in-out">
            <Button variant="secondary" className="flex-1 transition-all duration-700 ease-in-out">
              版本管理
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

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
    <Card className="transition-all duration-700 ease-in-out h-full flex flex-col justify-between group relative overflow-hidden border hover:border-blue-500/50 hover:shadow-xl">
      {/* 发光效果背景 */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
        style={{
          background: "linear-gradient(to right, rgb(59, 130, 246), rgb(6, 182, 212))"
        }}
      />
      {/* 卡片边框发光效果 */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" 
        style={{
          boxShadow: "inset 0 0 20px rgba(59, 130, 246, 0.3), inset 0 0 40px rgba(6, 182, 212, 0.2)"
        }}
      />
      {/* 卡片主要内容区域 */}
      <CardContent className="flex-grow flex flex-col items-center justify-center transition-all duration-700 ease-in-out relative z-10">
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
      <CardContent className="flex items-center space-x-4 transition-all duration-700 ease-in-out relative z-10">
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

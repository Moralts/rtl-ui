"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import InstanceHeader from "@/components/layout/instance-header";
import AccountSwitcher from "@/components/accounts/AccountSwitcher";
import { useAccountContext } from "@/components/accounts/AccountProvider";
import { useViewToggle } from "@/hooks/use-view-toggle";
import { AnnouncementCard } from "@/components/home/announcement-card";
import { ProfileCard } from "@/components/home/profile-card";
import { InstanceInfoCard } from "@/components/home/instance-info-card";
import { InstanceCardGrid } from "@/components/home/instance-card-grid";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { Account } from "@/types";
import { TRANSITION_DURATION } from "@/constants";

/**
 * 主页组件
 * 包含主页视图和实例设置视图的切换
 */
export default function Home() {
  const [isProfileSelectorOpen, setIsProfileSelectorOpen] = useState(false);
  const { selectedProfile, selectProfile } = useAccountContext();
  const { currentView, toggleView } = useViewToggle();
  // 使用 ref 跟踪是否是用户主动触发的视图切换
  const isUserAction = useRef(false);

  const handleToggleView = () => {
    isUserAction.current = true;
    toggleView();
  };

  const handleProfileSelect = (profile: Account) => {
    selectProfile(profile);
  };

  useEffect(() => {
    // Hide the global scrollbar on homepage to ensure no scrollbars are visible
    if (currentView === "home") {
      document.body.classList.add("no-scrollbar");
      // prevent body scrolling if there's any
      document.body.style.overflow = "hidden";
    } else {
      document.body.classList.remove("no-scrollbar");
      document.body.style.overflow = "";
    }
    // Listener prevents wheel scrolling and touchmove when on homepage
    const disableScrollWheel = (e: WheelEvent | TouchEvent) => {
      if (currentView !== "home") return;
      // Prevent default scroll behavior
      e.preventDefault();
    };

    // Prevent the space key from scrolling unless the focused element is interactive
    const onKeyDown = (e: KeyboardEvent) => {
      if (currentView !== "home") return;
      const isSpace = e.code === "Space" || e.key === " " || e.key === "Spacebar";
      if (!isSpace) return;

      const target = e.target as HTMLElement | null;
      const tag = target?.tagName || "";
      const isInteractive = ["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(tag) || (target?.isContentEditable ?? false);
      if (!isInteractive) {
        e.preventDefault();
      }
    };

    // Attach listeners when on home view
    if (currentView === "home") {
      window.addEventListener("wheel", disableScrollWheel as EventListener, { passive: false });
      window.addEventListener("touchmove", disableScrollWheel as EventListener, { passive: false });
      window.addEventListener("keydown", onKeyDown);
    }

    return () => {
      window.removeEventListener("wheel", disableScrollWheel as EventListener);
      window.removeEventListener("touchmove", disableScrollWheel as EventListener);
      window.removeEventListener("keydown", onKeyDown);
      // cleanup any global guard classes/styles we applied
      document.body.classList.remove("no-scrollbar");
      document.body.style.overflow = "";
    };
  }, [currentView]);

  return (
    <div className="relative h-screen">
      {/* 主页内容 */}
      <div
        // 添加 no-scrollbar 和 overflow-hidden 隐藏滚动条并禁用手动滚动
        className={`absolute inset-0 transition-transform ease-out no-scrollbar overflow-hidden ${
          currentView === 'home' ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{ 
          transitionDuration: isUserAction.current ? `${TRANSITION_DURATION.PAGE_TRANSITION}ms` : '0ms',
        }}
        onTransitionEnd={() => {
          // 动画结束后重置标志
          isUserAction.current = false;
        }}
      >
        {/* 右侧栏 - 响应式宽度 */}
        <div className="absolute right-0 top-0 w-full md:w-1/3 lg:w-1/4 h-full p-4 flex flex-col justify-end">
          <ProfileCard
            selectedProfile={selectedProfile}
            onOpenProfileSelector={() => setIsProfileSelectorOpen(true)}
          />
        </div>

        {/* 公告栏 - 响应式宽度 */}
        <div className="absolute left-0 top-0 w-full md:w-1/3 lg:w-1/4 h-auto p-4">
          <AnnouncementCard />
        </div>

        {/* 主页底部按钮 */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
          <Button
            onClick={handleToggleView}
            className="gap-2 shadow-lg hover:shadow-xl transition-shadow"
            size="lg"
            aria-label="切换到实例设置"
          >
            <span>切换到实例设置</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* 实例设置区域内容 */}
      <div
        className={`absolute inset-0 transition-transform ease-out ${
          currentView === 'new' ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ 
          transitionDuration: isUserAction.current ? `${TRANSITION_DURATION.PAGE_TRANSITION}ms` : '0ms',
        }}
        onTransitionEnd={() => {
          // 动画结束后重置标志
          isUserAction.current = false;
        }}
      >
        {/* 新区域顶部卡片 */}
        <div className="fixed top-2 left-0 right-0 mx-4 z-10">
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

        {/* 标签页内容 */}
        <div className="absolute top-22 left-0 right-0 bottom-0 mx-4 z-0 overflow-y-auto mt-0 pb-4">
          <div className="flex flex-col md:flex-row gap-4 h-full min-h-0">
            {/* 概览页面内容 */}
            <div className="w-full md:w-1/3 lg:w-1/4">
              <InstanceInfoCard />
            </div>

            {/* 右侧卡片网格 */}
            <InstanceCardGrid />
          </div>
        </div>

        {/* 新区域顶部按钮 */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
          <Button
            variant="outline"
            onClick={handleToggleView}
            className="gap-2 bg-background/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow"
            aria-label="返回主页"
          >
            <ChevronUp className="h-4 w-4" />
            <span>返回主页</span>
          </Button>
        </div>
      </div>

      {/* 账户切换弹窗 */}
      <AccountSwitcher
        open={isProfileSelectorOpen}
        onClose={() => setIsProfileSelectorOpen(false)}
        onSelect={handleProfileSelect}
      />
    </div>
  );
}
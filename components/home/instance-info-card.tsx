"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface InfoItemProps {
  label: string;
  value: string;
  tooltip: string;
  icon: React.ReactNode;
}

function InfoItem({ label, value, tooltip, icon }: InfoItemProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="group/item p-3 rounded-lg bg-white dark:bg-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-all duration-200 cursor-help border border-slate-200/60 dark:border-slate-700/80 shadow-sm hover:shadow-md">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700 group-hover/item:bg-slate-200 dark:group-hover/item:bg-slate-600 transition-colors duration-200">
                <div className="h-4 w-4 text-slate-600 dark:text-slate-300">
                  {icon}
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{label}</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{value}</p>
              </div>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="right" className="max-w-xs">
          <p className="text-sm">{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function InstanceInfoCard() {
  return (
    <Card className="h-full group relative overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col border hover:border-blue-500/50">
      {/* 卡片边框发光效果 */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" 
        style={{
          boxShadow: "inset 0 0 20px rgba(59, 130, 246, 0.3), inset 0 0 40px rgba(6, 182, 212, 0.2)"
        }}
      />
      <CardHeader className="relative">
        <div className="w-14 h-14 mb-4 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl opacity-20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-blue-600 dark:text-blue-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
              />
            </svg>
          </div>
        </div>
        <CardTitle className="text-xl font-bold">实例信息</CardTitle>
        <CardDescription>查看实例详情</CardDescription>
      </CardHeader>
      
      <CardContent className="relative flex-1 space-y-3">
        {/* 第一行：实例名称 */}
        <div>
          <InfoItem
            label="实例名称"
            value="RTL World"
            tooltip="Minecraft 实例的显示名称"
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>}
          />
        </div>

        {/* 第二行：实例 ID */}
        <div>
          <InfoItem
            label="实例 ID"
            value="RTLE-001"
            tooltip="实例的唯一标识符"
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          />
        </div>

        {/* 第三行：游戏版本*/}
        <div>
          <InfoItem
            label="游戏版本"
            value="1.21.8"
            tooltip="Minecraft 版本号"
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v6a2 2 0 01-2 2h-3l-4 4z" /></svg>}
          />
        </div>
        
        {/* 第四行：加载器 */}
        <div>
          <InfoItem
            label="加载器"
            value="Fabric"
            tooltip="模组加载器"
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>}
          />
        </div>

        {/* 第五行：启动次数*/}
        <div>
          <InfoItem
            label="启动次数"
            value="247"
            tooltip="总启动次数"
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          />
        </div>

        {/* 第六行：上次启动时间 */}
        <div>
          <InfoItem
            label="上次启动"
            value="2小时前"
            tooltip="最后一次启动的时间"
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          />
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  FileDown, 
  HardDrive, 
  Package, 
  Settings, 
  Image, 
  Zap,
  AlertCircle
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import { useState } from "react";

export default function ExportPage() {
  const [selectedItems, setSelectedItems] = useState<string[]>([
    "mods",
    "config",
    "resourcepacks",
    "shaderpacks",
    "worlds"
  ]);

  const exportItems = [
    { id: "mods", name: "模组文件", size: "1.2GB", count: "72 个文件", icon: Package },
    { id: "config", name: "配置文件", size: "8MB", count: "15 个文件", icon: Settings },
    { id: "resourcepacks", name: "资源包", size: "256MB", count: "4 个文件", icon: Image },
    { id: "shaderpacks", name: "光影包", size: "128MB", count: "3 个文件", icon: Zap },
    { id: "worlds", name: "存档文件", size: "512MB", count: "6 个世界", icon: HardDrive },
  ];

  const handleToggleItem = (id: string) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleExport = () => {
    toast.success(`正在导出 ${selectedItems.length} 个项目...`);
  };

  const handleSelectAll = () => {
    setSelectedItems(exportItems.map(item => item.id));
  };

  return (
    <div className="space-y-6">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold leading-tight">导出实例</h1>
        <div className="flex gap-3">
          <Button variant="outline" className="px-6 py-2" onClick={() => setSelectedItems([])}>
            清空选择
          </Button>
          <Button variant="outline" className="px-6 py-2" onClick={handleSelectAll}>
            全选
          </Button>
          <Button className="px-6 py-2 gap-2" onClick={handleExport}>
            <FileDown className="h-4 w-4" />
            开始导出
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* 导出选项卡片 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                导出选项
              </CardTitle>
              <CardDescription>选择要导出的内容，共 {selectedItems.length}/{exportItems.length} 项</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {exportItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleToggleItem(item.id)}
                    className={`group flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                      selectedItems.includes(item.id)
                        ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-300 dark:border-blue-700'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${
                        selectedItems.includes(item.id)
                          ? 'bg-blue-500 border-blue-500'
                          : 'border-slate-300 dark:border-slate-600'
                      }`}>
                        {selectedItems.includes(item.id) && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <Icon className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                          <h3 className="font-semibold text-sm">{item.name}</h3>
                          <Badge variant="secondary" className="text-xs">{item.size}</Badge>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {item.count}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* 导出进度卡片 */}
          <Card>
            <CardHeader>
              <CardTitle>导出进度</CardTitle>
              <CardDescription>估计导出文件大小和时间</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">总大小</span>
                  <span className="text-sm font-semibold">{(selectedItems.length * 384 / 5).toFixed(0)}MB</span>
                </div>
                <Progress value={(selectedItems.length / exportItems.length) * 100} />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">预计导出时间</p>
                  <p className="text-lg font-semibold">{Math.max(1, Math.round((selectedItems.length * 384) / 512))}分钟</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">平均速度</p>
                  <p className="text-lg font-semibold">~8.5MB/s</p>
                </div>
              </div>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>导出提示</AlertTitle>
                <AlertDescription>
                  导出过程可能需要{Math.max(1, Math.round((selectedItems.length * 384) / 512))}分钟左右，请保证硬盘有足够的空间。
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>

        {/* 右侧信息卡片 */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HardDrive className="h-5 w-5" />
                存储信息
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">可用空间</p>
                <p className="text-2xl font-bold">256GB</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">已用空间</p>
                <p className="text-lg font-semibold">2.5GB</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">占硬盘 1%</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>导出格式</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <p className="text-sm font-medium">选择导出格式</p>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 p-2 rounded border cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                    <input type="radio" name="format" defaultChecked className="w-4 h-4" />
                    <span className="text-sm">MineBBS 格式</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded border cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                    <input type="radio" name="format" className="w-4 h-4" />
                    <span className="text-sm">Modrinth Modpack</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded border cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                    <input type="radio" name="format" className="w-4 h-4" />
                    <span className="text-sm">打包文件夹</span>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

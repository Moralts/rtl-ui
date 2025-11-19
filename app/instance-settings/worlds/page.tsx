"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Plus,
  Trash2,
  Copy,
  Download,
  Globe,
  Calendar,
  HardDrive,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function WorldsPage() {
  const [selectedWorlds, setSelectedWorlds] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const worlds = [
    { id: 1, name: "RTL World", mode: "生存", version: "1.21.8", playTime: "24小时", lastPlayed: "今天", size: "450MB" },
    { id: 2, name: "Creative World", mode: "创造", version: "1.21.8", playTime: "12小时", lastPlayed: "2天前", size: "280MB" },
    { id: 3, name: "Adventure Map", mode: "冒险", version: "1.21.7", playTime: "8小时", lastPlayed: "1周前", size: "320MB" },
    { id: 4, name: "Skyblock", mode: "生存", version: "1.21.8", playTime: "36小时", lastPlayed: "5天前", size: "350MB" },
    { id: 5, name: "Testing", mode: "创造", version: "1.21.8", playTime: "4小时", lastPlayed: "3天前", size: "150MB" },
    { id: 6, name: "Old Backup", mode: "生存", version: "1.20.4", playTime: "120小时", lastPlayed: "2周前", size: "500MB" },
  ];

  const handleSelectWorld = (worldId: number) => {
    setSelectedWorlds(prev => 
      prev.includes(worldId) ? prev.filter(id => id !== worldId) : [...prev, worldId]
    );
  };

  const handleSelectAll = () => {
    setSelectedWorlds(worlds.map(w => w.id));
  };

  const handleClearSelection = () => {
    setSelectedWorlds([]);
  };

  const handleBackup = () => {
    toast.success(`正在备份 ${selectedWorlds.length} 个存档...`);
  };

  const handleDelete = () => {
    toast.success(`已删除 ${selectedWorlds.length} 个存档`);
    setSelectedWorlds([]);
  };

  const handleExport = () => {
    toast.success(`正在导出 ${selectedWorlds.length} 个存档...`);
  };

  const filteredWorlds = worlds.filter(world =>
    world.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalSize = worlds.reduce((sum, w) => {
    const size = parseFloat(w.size);
    return sum + size;
  }, 0);

  return (
    <div className="space-y-6">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold leading-tight">世界管理</h1>
        <div className="flex gap-3">
          <Button variant="outline" className="px-6 py-2 gap-2" onClick={() => toast.success("打开导入界面")}>
            <Download className="h-4 w-4" />
            导入存档
          </Button>
          <Button className="px-6 py-2 gap-2" onClick={() => toast.success("创建新世界")}>
            <Plus className="h-4 w-4" />
            创建新世界
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 世界列表 - 占 2 列 */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                已创建存档
              </CardTitle>
              <CardDescription>共 {worlds.length} 个世界</CardDescription>
              <div className="mt-4">
                <Input 
                  placeholder="搜索存档..." 
                  className="max-w-sm" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {filteredWorlds.length > 0 ? (
                filteredWorlds.map((world) => (
                  <div
                    key={world.id}
                    onClick={() => handleSelectWorld(world.id)}
                    className={`group flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                      selectedWorlds.includes(world.id)
                        ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-300 dark:border-blue-700'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${
                        selectedWorlds.includes(world.id)
                          ? 'bg-blue-500 border-blue-500'
                          : 'border-slate-300 dark:border-slate-600'
                      }`}>
                        {selectedWorlds.includes(world.id) && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-sm">{world.name}</h3>
                          <Badge variant="secondary" className="text-xs">{world.mode}</Badge>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          版本：{world.version} • 游戏时间：{world.playTime} • 最后游戏：{world.lastPlayed}
                        </p>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {world.size}
                      </div>
                    </div>

                    {/* 悬停时显示的按钮 */}
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="gap-1 h-8 px-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          toast.success("进入游戏");
                        }}
                      >
                        进入
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-500 dark:text-slate-400">未找到存档</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* 右侧信息卡片 - 占 1 列 */}
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
                <div className="flex justify-between mb-2 text-sm">
                  <span>存储空间</span>
                  <span>{(totalSize / 1024).toFixed(1)}GB / 10GB</span>
                </div>
                <Progress value={(totalSize / 10240) * 100} />
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">总存档数</span>
                  <span className="font-semibold">{worlds.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">已选择</span>
                  <span className="font-semibold">{selectedWorlds.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                最近活动
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>最近游玩</span>
                  <span className="text-slate-500">RTL World</span>
                </div>
                <div className="flex justify-between">
                  <span>总游戏时长</span>
                  <span className="font-semibold">204小时</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>快速操作</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="outline" size="sm" onClick={handleSelectAll}>
                全选
              </Button>
              <Button className="w-full" variant="outline" size="sm" onClick={handleClearSelection}>
                取消选择
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 底部浮动工具栏 - 居中小岛风格 */}
      {selectedWorlds.length > 0 && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full shadow-2xl p-4 flex items-center gap-3">
            <div className="text-sm font-medium px-3 whitespace-nowrap">
              已选择 {selectedWorlds.length}
            </div>
            <div className="w-px h-6 bg-slate-200 dark:bg-slate-700" />
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleBackup} 
                className="gap-1 h-8 px-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                title="备份"
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleExport} 
                className="gap-1 h-8 px-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                title="导出"
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleDelete} 
                className="gap-1 h-8 px-3 rounded-full hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 hover:text-red-700"
                title="删除"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleClearSelection} 
                className="gap-1 h-8 px-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                title="取消选择"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

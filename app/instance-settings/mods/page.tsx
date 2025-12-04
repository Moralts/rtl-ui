"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  FolderOpen, 
  Plus, 
  FileDown, 
  Eye, 
  EyeOff,
  Trash2,
  Star,
  X,
  RotateCcw,
  Package,
  Grid3x3
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function ModsPage() {
  const [selectedMods, setSelectedMods] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // 模组数据
  const mods = [
    { id: 1, name: "JEI (Just Enough Items)", version: "10.2.1.1004", author: "mezz", category: "UI", enabled: true },
    { id: 2, name: "Sodium", version: "0.5.8", author: "CaffeineMC", category: "优化", enabled: true },
    { id: 3, name: "Lithium", version: "0.11.2", author: "CaffeineMC", category: "优化", enabled: true },
    { id: 4, name: "Phosphor", version: "0.8.1", author: "CaffeineMC", category: "优化", enabled: false },
    { id: 5, name: "Botania", version: "438", author: "Vazkii", category: "魔法", enabled: true },
  ];

  const handleSelectMod = (modId: number) => {
    setSelectedMods(prev => 
      prev.includes(modId) ? prev.filter(id => id !== modId) : [...prev, modId]
    );
  };

  const handleOpenFolder = () => {
    toast.success("打开模组文件夹");
  };

  const handleAddMods = () => {
    toast.success("打开模组添加界面");
  };

  const handleExportMods = () => {
    toast.success("模组信息已导出");
  };

  const handleDisable = () => {
    toast.success(`已禁用 ${selectedMods.length} 个模组`);
  };

  const handleEnable = () => {
    toast.success(`已启用 ${selectedMods.length} 个模组`);
  };

  const handleUpdate = () => {
    toast.success(`正在更新 ${selectedMods.length} 个模组`);
  };

  const handleDelete = () => {
    toast.success(`已删除 ${selectedMods.length} 个模组`);
    setSelectedMods([]);
  };

  const handleFavorite = () => {
    toast.success(`已收藏 ${selectedMods.length} 个模组`);
  };

  const handleClearSelection = () => {
    setSelectedMods([]);
  };

  const filteredMods = mods.filter(mod =>
    mod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mod.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* 标题栏 */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold leading-tight">模组管理</h1>
        <div className="flex gap-3">
          <Button variant="outline" className="px-6 py-2 gap-2" onClick={handleOpenFolder}>
            <FolderOpen className="h-4 w-4" />
            打开文件夹
          </Button>
          <Button variant="outline" className="px-6 py-2 gap-2" onClick={handleAddMods}>
            <Plus className="h-4 w-4" />
            添加模组
          </Button>
          <Button className="px-6 py-2 gap-2" onClick={handleExportMods}>
            <FileDown className="h-4 w-4" />
            导出模组信息
          </Button>
        </div>
      </div>

      {/* 已安装模组卡片和分类 - 双栏布局 */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 已安装模组 - 占 3 列 */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                已安装模组
              </CardTitle>
              <CardDescription>共 {mods.length} 个模组，已启用 {mods.filter(m => m.enabled).length} 个</CardDescription>
              <div className="mt-4">
                <Input 
                  placeholder="搜索模组..." 
                  className="max-w-sm" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {filteredMods.length > 0 ? (
                filteredMods.map((mod) => (
                  <div
                    key={mod.id}
                    onClick={() => handleSelectMod(mod.id)}
                    className={`group flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                      selectedMods.includes(mod.id)
                        ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-300 dark:border-blue-700'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${
                        selectedMods.includes(mod.id)
                          ? 'bg-blue-500 border-blue-500'
                          : 'border-slate-300 dark:border-slate-600'
                      }`}>
                        {selectedMods.includes(mod.id) && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-sm">{mod.name}</h3>
                          <Badge variant="secondary" className="text-xs">{mod.category}</Badge>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          版本：{mod.version} • 作者：{mod.author}
                        </p>
                      </div>
                    </div>

                    {/* 悬停时显示的按钮 */}
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="gap-1 h-8 px-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          toast.success(mod.enabled ? "已禁用模组" : "已启用模组");
                        }}
                      >
                        {mod.enabled ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="gap-1 h-8 px-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          toast.success("正在更新模组...");
                        }}
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-500 dark:text-slate-400">未找到模组</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* 模组分类 - 占 1 列 */}
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Grid3x3 className="h-5 w-5" />
                模组分类
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                <span className="text-sm font-medium">优化</span>
                <Badge variant="secondary">15</Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                <span className="text-sm font-medium">界面</span>
                <Badge variant="secondary">8</Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                <span className="text-sm font-medium">世界生成</span>
                <Badge variant="secondary">12</Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                <span className="text-sm font-medium">魔法</span>
                <Badge variant="secondary">6</Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                <span className="text-sm font-medium">科技</span>
                <Badge variant="secondary">18</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 底部浮动工具栏 - 居中小岛风格 */}
      {selectedMods.length > 0 && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full shadow-2xl p-4 flex items-center gap-3">
            <div className="text-sm font-medium px-3 whitespace-nowrap">
              已选择 {selectedMods.length}
            </div>
            <div className="w-px h-6 bg-slate-200 dark:bg-slate-700" />
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleDisable} 
                className="gap-1 h-8 px-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                title="禁用"
              >
                <EyeOff className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleEnable} 
                className="gap-1 h-8 px-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                title="启用"
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleUpdate} 
                className="gap-1 h-8 px-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                title="更新"
              >
                <RotateCcw className="h-4 w-4" />
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
                onClick={handleFavorite} 
                className="gap-1 h-8 px-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                title="收藏"
              >
                <Star className="h-4 w-4" />
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

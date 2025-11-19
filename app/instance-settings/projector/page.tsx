"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Trash2,
  FolderOpen,
  Eye,
  RefreshCw,
  Zap,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function ProjectorPage() {
  const [selectedProjectors, setSelectedProjectors] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const projectors = [
    { id: 1, name: "Main Structure", size: "8.5MB", blocks: "12450", author: "Builder", date: "2025-11-15", format: "litematic" },
    { id: 2, name: "Farm Design", size: "3.2MB", blocks: "4800", author: "Designer", date: "2025-11-14", format: "litematic" },
    { id: 3, name: "House Template", size: "5.1MB", blocks: "7230", author: "Architect", date: "2025-11-10", format: "schematic" },
    { id: 4, name: "Nether Portal", size: "1.2MB", blocks: "2100", author: "Planner", date: "2025-11-08", format: "litematic" },
    { id: 5, name: "Garden Layout", size: "2.8MB", blocks: "3950", author: "Designer", date: "2025-11-05", format: "schematic" },
  ];

  const handleSelectProjector = (projectorId: number) => {
    setSelectedProjectors(prev => 
      prev.includes(projectorId) ? prev.filter(id => id !== projectorId) : [...prev, projectorId]
    );
  };

  const handleOpenFolder = () => {
    toast.success("打开投影文件夹");
  };

  const handleAddProjector = () => {
    toast.success("打开投影添加界面");
  };

  const handleDelete = () => {
    toast.success(`已删除 ${selectedProjectors.length} 个投影`);
    setSelectedProjectors([]);
  };

  const handleClearSelection = () => {
    setSelectedProjectors([]);
  };

  const filteredProjectors = projectors.filter(proj =>
    proj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    proj.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalBlocks = projectors.reduce((sum, p) => sum + parseInt(p.blocks), 0);

  return (
    <div className="space-y-6">
      {/* 标题栏 */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold leading-tight">投影管理</h1>
        <div className="flex gap-3">
          <Button variant="outline" className="px-6 py-2 gap-2" onClick={handleOpenFolder}>
            <FolderOpen className="h-4 w-4" />
            打开文件夹
          </Button>
          <Button variant="outline" className="px-6 py-2 gap-2" onClick={handleAddProjector}>
            <Plus className="h-4 w-4" />
            添加投影
          </Button>
        </div>
      </div>

      {/* 投影卡片和统计 - 双栏布局 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 已安装投影 - 占 2 列 */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                已有投影
              </CardTitle>
              <CardDescription>共 {projectors.length} 个投影，总计 {totalBlocks.toLocaleString()} 个方块</CardDescription>
              <div className="mt-4">
                <Input 
                  placeholder="搜索投影..." 
                  className="max-w-sm" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {filteredProjectors.length > 0 ? (
                filteredProjectors.map((projector) => (
                  <div
                    key={projector.id}
                    onClick={() => handleSelectProjector(projector.id)}
                    className={`group flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                      selectedProjectors.includes(projector.id)
                        ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-300 dark:border-blue-700'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${
                        selectedProjectors.includes(projector.id)
                          ? 'bg-blue-500 border-blue-500'
                          : 'border-slate-300 dark:border-slate-600'
                      }`}>
                        {selectedProjectors.includes(projector.id) && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-sm">{projector.name}</h3>
                          <Badge variant="secondary" className="text-xs">{projector.format.toUpperCase()}</Badge>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          大小：{projector.size} • 方块：{projector.blocks.toLocaleString()} • 作者：{projector.author} • {projector.date}
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
                          toast.success("正在预览投影...");
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="gap-1 h-8 px-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          toast.success("已导出投影");
                        }}
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-500 dark:text-slate-400">未找到投影</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* 投影统计 - 占 1 列 */}
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                投影统计
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">投影总数</p>
                  <p className="text-lg font-semibold">{projectors.length}</p>
                </div>
                <Zap className="h-5 w-5 text-blue-500" />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">总方块数</p>
                  <p className="text-lg font-semibold">{(totalBlocks / 1000).toFixed(1)}k</p>
                </div>
                <RefreshCw className="h-5 w-5 text-green-500" />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">总大小</p>
                  <p className="text-lg font-semibold">{(projectors.reduce((sum, p) => sum + parseFloat(p.size), 0)).toFixed(1)}MB</p>
                </div>
                <RefreshCw className="h-5 w-5 text-amber-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 底部浮动工具栏 - 居中小岛风格 */}
      {selectedProjectors.length > 0 && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full shadow-2xl p-4 flex items-center gap-3">
            <div className="text-sm font-medium px-3 whitespace-nowrap">
              已选择 {selectedProjectors.length}
            </div>
            <div className="w-px h-6 bg-slate-200 dark:bg-slate-700" />
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => toast.success("正在导出投影...")} 
                className="gap-1 h-8 px-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                title="导出"
              >
                <Eye className="h-4 w-4" />
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

"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Trash2,
  Eye,
  EyeOff,
  FolderOpen,
  Package,
  RefreshCw,
  X,
  Image as IconImage,
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function ResourcesPage() {
  const [selectedResources, setSelectedResources] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const resources = [
    { id: 1, name: "Default Resources", type: "资源包", version: "1.21.8", enabled: true, size: "123MB", author: "Mojang" },
    { id: 2, name: "Simplistic Texture Pack", type: "资源包", version: "1.21.8", enabled: true, size: "456MB", author: "Designer" },
    { id: 3, name: "Data Pack", type: "数据包", version: "1.21.8", enabled: true, size: "45MB", author: "Creator" },
    { id: 4, name: "Custom Pack", type: "资源包", version: "1.21.7", enabled: false, size: "234MB", author: "User" },
    { id: 5, name: "Addon Pack", type: "附加包", version: "1.21.8", enabled: true, size: "89MB", author: "Developer" },
  ];

  const handleSelectResource = (resourceId: number) => {
    setSelectedResources(prev => 
      prev.includes(resourceId) ? prev.filter(id => id !== resourceId) : [...prev, resourceId]
    );
  };

  const handleOpenFolder = () => {
    toast.success("打开资源文件夹");
  };

  const handleAddResources = () => {
    toast.success("打开资源添加界面");
  };

  const handleEnable = () => {
    toast.success(`已启用 ${selectedResources.length} 个资源`);
  };

  const handleDisable = () => {
    toast.success(`已禁用 ${selectedResources.length} 个资源`);
  };

  const handleDelete = () => {
    toast.success(`已删除 ${selectedResources.length} 个资源`);
    setSelectedResources([]);
  };

  const handleClearSelection = () => {
    setSelectedResources([]);
  };

  const filteredResources = resources.filter(resource =>
    resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* 标题栏 */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold leading-tight">资源管理</h1>
        <div className="flex gap-3">
          <Button variant="outline" className="px-6 py-2 gap-2" onClick={handleOpenFolder}>
            <FolderOpen className="h-4 w-4" />
            打开文件夹
          </Button>
          <Button variant="outline" className="px-6 py-2 gap-2" onClick={handleAddResources}>
            <Plus className="h-4 w-4" />
            添加资源
          </Button>
        </div>
      </div>

      {/* 资源卡片和统计 - 双栏布局 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 已安装资源 - 占 2 列 */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                已安装资源
              </CardTitle>
              <CardDescription>共 {resources.length} 个资源，已启用 {resources.filter(r => r.enabled).length} 个</CardDescription>
              <div className="mt-4">
                <Input 
                  placeholder="搜索资源..." 
                  className="max-w-sm" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {filteredResources.length > 0 ? (
                filteredResources.map((resource) => (
                  <div
                    key={resource.id}
                    onClick={() => handleSelectResource(resource.id)}
                    className={`group flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                      selectedResources.includes(resource.id)
                        ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-300 dark:border-blue-700'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${
                        selectedResources.includes(resource.id)
                          ? 'bg-blue-500 border-blue-500'
                          : 'border-slate-300 dark:border-slate-600'
                      }`}>
                        {selectedResources.includes(resource.id) && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-sm">{resource.name}</h3>
                          <Badge variant="secondary" className="text-xs">{resource.type}</Badge>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          版本：{resource.version} • 作者：{resource.author} • 大小：{resource.size}
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
                          toast.success(resource.enabled ? "已禁用资源" : "已启用资源");
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
                          toast.success("正在刷新资源...");
                        }}
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-500 dark:text-slate-400">未找到资源</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* 资源统计 - 占 1 列 */}
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconImage className="h-5 w-5" />
                资源统计
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">资源包</p>
                  <p className="text-lg font-semibold">3</p>
                </div>
                <span className="h-5 w-5 text-blue-500 inline-flex items-center justify-center">📦</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">数据包</p>
                  <p className="text-lg font-semibold">1</p>
                </div>
                <Package className="h-5 w-5 text-green-500" />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">已启用</p>
                  <p className="text-lg font-semibold">{resources.filter(r => r.enabled).length}/{resources.length}</p>
                </div>
                <RefreshCw className="h-5 w-5 text-amber-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 底部浮动工具栏 - 居中小岛风格 */}
      {selectedResources.length > 0 && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full shadow-2xl p-4 flex items-center gap-3">
            <div className="text-sm font-medium px-3 whitespace-nowrap">
              已选择 {selectedResources.length}
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
                <Eye className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleEnable} 
                className="gap-1 h-8 px-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                title="启用"
              >
                <EyeOff className="h-4 w-4" />
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

"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Zap,
  Plus,
  Trash2,
  Settings,
  Package,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function ShadersPage() {
  const [selectedShaders, setSelectedShaders] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const shaders = [
    { id: 1, name: "BSL Shaders", version: "8.2.04", author: "Capt Tatsu", size: "45MB", enabled: true, quality: "极高" },
    { id: 2, name: "SEUS Renewed", version: "1.0.1", author: "sonicether", size: "32MB", enabled: false, quality: "高" },
    { id: 3, name: "Complementary", version: "4.7.1", author: "EminGTR", size: "52MB", enabled: false, quality: "超高" },
    { id: 4, name: "Chocapic13", version: "9.1", author: "Chocapic13", size: "28MB", enabled: true, quality: "中" },
    { id: 5, name: "RRe36", version: "7.1.4", author: "RRe36", size: "38MB", enabled: false, quality: "高" },
  ];

  const handleSelectShader = (shaderId: number) => {
    setSelectedShaders(prev => 
      prev.includes(shaderId) ? prev.filter(id => id !== shaderId) : [...prev, shaderId]
    );
  };

  const handleDelete = () => {
    toast.success(`已删除 ${selectedShaders.length} 个光影`);
    setSelectedShaders([]);
  };

  const handleClearSelection = () => {
    setSelectedShaders([]);
  };

  const filteredShaders = shaders.filter(shader =>
    shader.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shader.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold leading-tight">光影管理</h1>
        <div className="flex gap-3">
          <Button className="px-6 py-2 gap-2" onClick={() => toast.success("打开光影添加界面")}>
            <Plus className="h-4 w-4" />
            添加光影
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 已安装光影 - 占 2 列 */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                已安装光影
              </CardTitle>
              <CardDescription>共 {shaders.length} 个光影，已启用 {shaders.filter(s => s.enabled).length} 个</CardDescription>
              <div className="mt-4">
                <Input 
                  placeholder="搜索光影..." 
                  className="max-w-sm" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {filteredShaders.length > 0 ? (
                filteredShaders.map((shader) => (
                  <div
                    key={shader.id}
                    onClick={() => handleSelectShader(shader.id)}
                    className={`group flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                      selectedShaders.includes(shader.id)
                        ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-300 dark:border-blue-700'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${
                        selectedShaders.includes(shader.id)
                          ? 'bg-blue-500 border-blue-500'
                          : 'border-slate-300 dark:border-slate-600'
                      }`}>
                        {selectedShaders.includes(shader.id) && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-sm">{shader.name}</h3>
                          {shader.enabled && <Badge className="text-xs bg-green-500">启用中</Badge>}
                          <Badge variant="secondary" className="text-xs">{shader.quality}</Badge>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          版本：{shader.version} • 作者：{shader.author} • 大小：{shader.size}
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
                          toast.success("正在配置光影...");
                        }}
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-500 dark:text-slate-400">未找到光影</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* 光影统计 - 占 1 列 */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                光影统计
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">已安装光影</p>
                  <p className="text-lg font-semibold">{shaders.length}</p>
                </div>
                <Zap className="h-5 w-5 text-yellow-500" />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">已启用</p>
                  <p className="text-lg font-semibold">{shaders.filter(s => s.enabled).length}/{shaders.length}</p>
                </div>
                <Zap className="h-5 w-5 text-green-500" />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">总大小</p>
                  <p className="text-lg font-semibold">{Math.round(shaders.reduce((sum, s) => sum + parseInt(s.size), 0) / 1024)}GB</p>
                </div>
                <Package className="h-5 w-5 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>快速操作</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="outline" size="sm" onClick={() => toast.success("正在打开光影文件夹")}>
                打开光影文件夹
              </Button>
              <Button className="w-full" variant="outline" size="sm" onClick={() => toast.success("正在检查更新")}>
                检查更新
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 底部浮动工具栏 - 居中小岛风格 */}
      {selectedShaders.length > 0 && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full shadow-2xl p-4 flex items-center gap-3">
            <div className="text-sm font-medium px-3 whitespace-nowrap">
              已选择 {selectedShaders.length}
            </div>
            <div className="w-px h-6 bg-slate-200 dark:bg-slate-700" />
            <div className="flex gap-2">
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

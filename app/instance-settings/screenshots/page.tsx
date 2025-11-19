"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  FolderOpen, 
  Plus, 
  Trash2,
  Download,
  Share2,
  Image,
  Calendar,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function ScreenshotsPage() {
  const [selectedScreenshots, setSelectedScreenshots] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [filterDate, setFilterDate] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const screenshots = [
    { id: 1, name: "2025-08-31_001", date: "2天前", size: "2MB", resolution: "1920x1080", timestamp: "2025-08-31" },
    { id: 2, name: "2025-08-30_042", date: "3天前", size: "3MB", resolution: "1920x1080", timestamp: "2025-08-30" },
    { id: 3, name: "2025-08-28_015", date: "5天前", size: "2.5MB", resolution: "1920x1080", timestamp: "2025-08-28" },
    { id: 4, name: "2025-08-25_089", date: "1周前", size: "2.2MB", resolution: "1920x1080", timestamp: "2025-08-25" },
    { id: 5, name: "2025-08-20_156", date: "2周前", size: "2.8MB", resolution: "2560x1440", timestamp: "2025-08-20" },
    { id: 6, name: "2025-08-15_203", date: "3周前", size: "2.1MB", resolution: "1920x1080", timestamp: "2025-08-15" },
  ];

  const handleSelectScreenshot = (id: number) => {
    setSelectedScreenshots(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedScreenshots(screenshots.map(s => s.id));
  };

  const handleClearSelection = () => {
    setSelectedScreenshots([]);
  };

  const handleDelete = () => {
    toast.success(`已删除 ${selectedScreenshots.length} 张截图`);
    setSelectedScreenshots([]);
  };

  const handleExport = () => {
    toast.success(`正在导出 ${selectedScreenshots.length} 张截图...`);
  };

  const handleShare = () => {
    toast.success(`已分享 ${selectedScreenshots.length} 张截图`);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold leading-tight">截图管理</h1>
        <div className="flex gap-3">
          <Button variant="outline" className="px-6 py-2 gap-2" onClick={() => toast.success("打开截图文件夹")}>
            <FolderOpen className="h-4 w-4" />
            打开文件夹
          </Button>
          <Button className="px-6 py-2 gap-2" onClick={() => toast.success("导入截图")}>
            <Plus className="h-4 w-4" />
            导入截图
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 截图列表 - 占 3 列 */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Image className="h-5 w-5" />
                    所有截图
                  </CardTitle>
                  <CardDescription>共 {screenshots.length} 张截图</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="排序方式" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="newest">最新优先</SelectItem>
                        <SelectItem value="oldest">最早优先</SelectItem>
                        <SelectItem value="name">名称排序</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-4">
                <Input 
                  placeholder="搜索截图..." 
                  className="max-w-sm" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {screenshots.map((screenshot) => (
                  <div
                    key={screenshot.id}
                    onClick={() => handleSelectScreenshot(screenshot.id)}
                    className={`group relative cursor-pointer rounded-lg border overflow-hidden transition-all duration-200 ${
                      selectedScreenshots.includes(screenshot.id)
                        ? 'ring-2 ring-blue-500 border-blue-300 dark:border-blue-700'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center relative">
                      <Image className="h-8 w-8 text-slate-400" />
                      {selectedScreenshots.includes(screenshot.id) && (
                        <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                          <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-3">
                      <div className="mb-2">
                        <h3 className="font-medium text-sm truncate">{screenshot.name}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {screenshot.size} • {screenshot.resolution}
                        </p>
                      </div>
                      <Badge variant="secondary" className="text-xs">{screenshot.date}</Badge>
                    </CardContent>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 右侧筛选和操作 - 占 1 列 */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                筛选
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">日期范围</label>
                <Select value={filterDate} onValueChange={setFilterDate}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择时间范围" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="today">今天</SelectItem>
                      <SelectItem value="week">本周</SelectItem>
                      <SelectItem value="month">本月</SelectItem>
                      <SelectItem value="all">全部时间</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">分辨率</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="选择分辨率" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="1080p">1920x1080</SelectItem>
                      <SelectItem value="2k">2560x1440</SelectItem>
                      <SelectItem value="4k">3840x2160</SelectItem>
                      <SelectItem value="all">全部分辨率</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
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

          <Card>
            <CardHeader>
              <CardTitle>统计信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <p className="text-slate-500 dark:text-slate-400 mb-1">总截图数</p>
                <p className="text-2xl font-bold">{screenshots.length}</p>
              </div>
              <div className="text-sm">
                <p className="text-slate-500 dark:text-slate-400 mb-1">已选择</p>
                <p className="text-lg font-semibold">{selectedScreenshots.length}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 底部浮动工具栏 - 居中小岛风格 */}
      {selectedScreenshots.length > 0 && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full shadow-2xl p-4 flex items-center gap-3">
            <div className="text-sm font-medium px-3 whitespace-nowrap">
              已选择 {selectedScreenshots.length}
            </div>
            <div className="w-px h-6 bg-slate-200 dark:bg-slate-700" />
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleShare} 
                className="gap-1 h-8 px-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                title="分享"
              >
                <Share2 className="h-4 w-4" />
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

"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Edit, 
  Copy, 
  RotateCcw, 
  Clock,
  CheckCircle,
  Settings,
  ChevronDown,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function ModifyPage() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedLoader, setSelectedLoader] = useState<string | null>(null);
  const [editingLoaderVersion, setEditingLoaderVersion] = useState<string | null>(null);

  const loader = {
    name: "Fabric",
    currentVersion: "0.17.2",
    availableVersions: ["0.17.2", "0.17.1", "0.17.0", "0.16.9", "0.16.8"],
  };

  const backupList = [
    { id: 1, date: "2025-11-19", size: "2.5GB", type: "auto" },
    { id: 2, date: "2025-11-18", size: "2.4GB", type: "manual" },
    { id: 3, date: "2025-11-17", size: "2.3GB", type: "auto" },
  ];

  const handleEdit = (name: string) => {
    setSelectedFile(name);
    toast.success(`打开编辑器: ${name}`);
  };

  const handleBackup = (name: string) => {
    toast.success(`已备份: ${name}`);
  };

  const handleBackupAll = () => {
    toast.success("已备份所有文件");
  };

  const handleRestore = () => {
    toast.success("已恢复默认配置");
  };

  return (
    <div className="space-y-6">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold leading-tight">高级设置</h1>
        <div className="flex gap-3">
          <Button variant="outline" className="px-6 py-2 gap-2" onClick={() => toast.success("已备份全部配置")}>
            <Copy className="h-4 w-4" />
            备份全部
          </Button>
          <Button className="px-6 py-2 gap-2" onClick={() => toast.success("已恢复默认配置")}>
            <RotateCcw className="h-4 w-4" />
            恢复默认
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Loader 加载器版本管理 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                加载器版本管理
              </CardTitle>
              <CardDescription>管理当前实例的模组加载器版本</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-sm">{loader.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      当前版本：{loader.currentVersion}
                    </p>
                  </div>
                  <Badge className="bg-blue-500">当前</Badge>
                </div>
                
                {editingLoaderVersion ? (
                  <div className="flex gap-2 pt-3 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex-1">
                      <select 
                        value={editingLoaderVersion} 
                        onChange={(e) => setEditingLoaderVersion(e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
                      >
                        {loader.availableVersions.map((v) => (
                          <option key={v} value={v}>{v}</option>
                        ))}
                      </select>
                    </div>
                    <Button 
                      size="sm" 
                      className="gap-1"
                      onClick={() => {
                        toast.success(`已切换到 ${loader.name} ${editingLoaderVersion}`);
                        setEditingLoaderVersion(null);
                      }}
                    >
                      确认
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setEditingLoaderVersion(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-3 gap-2"
                    onClick={() => setEditingLoaderVersion(loader.currentVersion)}
                  >
                    <Edit className="h-4 w-4" />
                    修改加载器
                  </Button>
                )}
              </div>

              <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <ChevronDown className="h-4 w-4" />
                  可用版本
                </h4>
                <div className="space-y-2">
                  {loader.availableVersions.map((version) => (
                    <div 
                      key={version}
                      className="flex items-center justify-between p-2 rounded-md text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <span className="font-medium">{version}</span>
                      {version === loader.currentVersion && (
                        <Badge variant="secondary" className="text-xs">使用中</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 配置文件备份列表 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                配置备份记录
              </CardTitle>
              <CardDescription>已保存 {backupList.length} 个备份</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {backupList.map((backup) => (
                <div
                  key={backup.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all duration-200"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <Clock className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm truncate">{backup.date}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        大小：{backup.size} • 类型：{backup.type === 'auto' ? '自动备份' : '手动备份'}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="gap-1 h-8 px-2"
                      onClick={() => toast.success("已恢复此备份")}
                    >
                      恢复
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="gap-1 h-8 px-2"
                      onClick={() => toast.success("已删除备份")}
                    >
                      删除
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* 右侧信息卡片 */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                备份统计
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-900/30">
                  <span className="text-sm font-medium">总备份数</span>
                  <Badge variant="secondary">{backupList.length} 个</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30">
                  <span className="text-sm font-medium">已用空间</span>
                  <Badge className="bg-blue-500">7.2GB</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-950/30">
                  <span className="text-sm font-medium">自动备份</span>
                  <Badge className="bg-green-500">已启用</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>快速操作</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="outline" size="sm" onClick={() => toast.success("已清理过期备份")}>
                清理过期备份
              </Button>
              <Button className="w-full" variant="outline" size="sm" onClick={() => toast.success("正在压缩备份...")}>
                压缩所有备份
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

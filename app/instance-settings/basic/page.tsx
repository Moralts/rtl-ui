"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Globe, Zap, Settings, Info, Play, Terminal, FolderOpen, RotateCcw } from "lucide-react";

export default function BasicSettingsPage() {
  const [memoryConfig, setMemoryConfig] = useState<"follow-global" | "auto-config" | "manual-config">("follow-global");
  
  const handleSave = () => {
    toast.success("保存成功", {
      description: "配置已成功保存",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold leading-tight">基础设置</h1>
        <div className="flex gap-3">
          <Button variant="outline" className="px-6 py-2">重置设置</Button>
          <Button className="px-6 py-2" onClick={handleSave}>保存更改</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* 实例信息卡片 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                实例信息
              </CardTitle>
              <CardDescription>配置实例的基本信息</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="instance-name">实例名称</Label>
                  <Input id="instance-name" placeholder="输入实例名称" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instance-id">实例ID</Label>
                  <Input id="instance-id" placeholder="自动生成" disabled />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="instance-icon">实例图标</Label>
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-lg bg-gray-200 border-2 border-dashed flex items-center justify-center">
                      <span className="text-gray-500 text-sm">图标</span>
                    </div>
                    <Button variant="outline" size="sm">选择文件</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instance-category">实例分类</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择分类" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="adventure">冒险</SelectItem>
                      <SelectItem value="creative">创造</SelectItem>
                      <SelectItem value="survival">生存</SelectItem>
                      <SelectItem value="modded">模组</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 启动选项卡片 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                启动选项
              </CardTitle>
              <CardDescription>配置游戏的基本启动参数</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="version-isolation">版本隔离</Label>
                  <p className="text-sm text-muted-foreground">为不同版本使用独立的运行环境</p>
                </div>
                <Switch id="version-isolation" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="title">游戏窗口标题</Label>
                <Input id="title" placeholder="Minecraft* 1.21.8" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="custom-info">自定义信息</Label>
                <Input id="custom-info" placeholder="添加自定义启动信息" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="java">游戏Java选择</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="选择 Java 版本" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="java8">Java 8</SelectItem>
                    <SelectItem value="java11">Java 11</SelectItem>
                    <SelectItem value="java17">Java 17 (推荐)</SelectItem>
                    <SelectItem value="java21">Java 21</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* 游戏内存配置卡片 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                游戏内存
              </CardTitle>
              <CardDescription>调整游戏内存分配</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <RadioGroup value={memoryConfig} onValueChange={(value: "follow-global" | "auto-config" | "manual-config") => setMemoryConfig(value)} className="space-y-4">
                <div className="flex items-start space-x-3 p-4 rounded-lg border cursor-pointer">
                  <RadioGroupItem value="follow-global" id="follow-global" className="mt-1 peer" />
                  <Label htmlFor="follow-global" className="flex-1 cursor-pointer peer-checked:text-primary">
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      <div className="font-medium">跟随全局设置</div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">使用全局内存配置</p>
                  </Label>
                </div>
                
                <div className="flex items-start space-x-3 p-4 rounded-lg border cursor-pointer">
                  <RadioGroupItem value="auto-config" id="auto-config" className="mt-1 peer" />
                  <Label htmlFor="auto-config" className="flex-1 cursor-pointer peer-checked:text-primary">
                    <div className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      <div className="font-medium">自动配置</div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">根据系统自动分配内存</p>
                  </Label>
                </div>
                
                <div className="flex items-start space-x-3 p-4 rounded-lg border cursor-pointer">
                  <RadioGroupItem value="manual-config" id="manual-config" className="mt-1 peer" />
                  <Label htmlFor="manual-config" className="flex-1 cursor-pointer peer-checked:text-primary">
                    <div className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      <div className="font-medium">手动配置</div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">手动设置最大内存</p>
                  </Label>
                </div>
                
                {memoryConfig === "manual-config" && (
                  <div className="space-y-4 pt-2">
                    <Slider defaultValue={[4]} max={16} step={0.5} />
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">当前：4GB</span>
                      <span className="text-sm text-muted-foreground">最大可用：16GB</span>
                    </div>
                  </div>
                )}
              </RadioGroup>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="optimize-memory">启动时优化系统内存</Label>
                  <p className="text-sm text-muted-foreground">清理系统内存以提升游戏性能</p>
                </div>
                <Switch id="optimize-memory" />
              </div>
            </CardContent>
          </Card>

          {/* 高级启动参数卡片 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="h-5 w-5" />
                高级启动选项
              </CardTitle>
              <CardDescription>配置 JVM 参数和游戏启动参数</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="jvm">JVM 参数</Label>
                <Textarea
                  id="jvm"
                  placeholder="-XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200"
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="game">游戏参数</Label>
                <Textarea
                  id="game"
                  placeholder="--width 1920 --height 1080"
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* 启动设置卡片 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                启动设置
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="auto-connect">自动连接服务器</Label>
                  <p className="text-sm text-muted-foreground">启动时自动连接到服务器</p>
                </div>
                <Switch id="auto-connect" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="auto-fullscreen">自动全屏</Label>
                  <p className="text-sm text-muted-foreground">启动时自动进入全屏模式</p>
                </div>
                <Switch id="auto-fullscreen" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="console">显示控制台</Label>
                  <p className="text-sm text-muted-foreground">启动时显示调试控制台</p>
                </div>
                <Switch id="console" />
              </div>
            </CardContent>
          </Card>

          {/* 快速操作卡片 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderOpen className="h-5 w-5" />
                快速操作
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full" variant="outline">
                  <FolderOpen className="h-4 w-4 mr-2" />
                  打开游戏文件夹
                </Button>
                <Button className="w-full" variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  重置所有设置
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
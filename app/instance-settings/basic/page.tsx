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

export default function BasicSettingsPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">基础设置</h1>
          <p className="text-gray-500">配置实例的基本启动参数</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">重置设置</Button>
          <Button>保存更改</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>启动选项</CardTitle>
                <CardDescription>配置游戏的基本启动参数</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="title">游戏窗口标题</Label>
                  <Input id="title" placeholder="Minecraft* 1.21.8" />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="java">Java 版本</Label>
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

            <Card>
              <CardHeader>
                <CardTitle>内存配置</CardTitle>
                <CardDescription>调整游戏内存分配</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label>最大内存</Label>
                    <Slider defaultValue={[4]} max={16} step={0.5} />
                    <div className="flex justify-between mt-1">
                      <span className="text-sm text-muted-foreground">当前：4GB</span>
                      <span className="text-sm text-muted-foreground">最大可用：16GB</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>高级启动参数</CardTitle>
                <CardDescription>配置 JVM 参数和游戏启动参数</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="jvm">JVM 参数</Label>
                  <Textarea
                    id="jvm"
                    placeholder="-XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200"
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="game">游戏参数</Label>
                  <Textarea
                    id="game"
                    placeholder="--width 1920 --height 1080"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>启动设置</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-connect">自动连接服务器</Label>
                <Switch id="auto-connect" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-fullscreen">自动全屏</Label>
                <Switch id="auto-fullscreen" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="console">显示控制台</Label>
                <Switch id="console" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>快速操作</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button className="w-full" variant="outline">打开游戏文件夹</Button>
                <Button className="w-full" variant="outline">重置所有设置</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

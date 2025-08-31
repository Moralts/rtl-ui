"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function WorldsPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">世界管理</h1>
          <p className="text-gray-500">管理您的 Minecraft 存档</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">导入存档</Button>
          <Button>创建新世界</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((world) => (
              <Card key={world}>
                <div className="aspect-video relative">
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    世界预览图
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">RTL World</h3>
                      <p className="text-sm text-gray-500">生存模式 • 1.21.8</p>
                    </div>
                    <Badge variant="secondary">最近游戏</Badge>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>游戏时间</span>
                      <span>24小时</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>最后游戏</span>
                      <span>今天</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1">进入游戏</Button>
                    <Button variant="outline" size="icon">⋮</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>存档信息</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>存储空间</span>
                    <span>2.5GB / 10GB</span>
                  </div>
                  <Progress value={25} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>总存档数</span>
                    <span>6个</span>
                  </div>
                  <div className="flex justify-between">
                    <span>存档备份</span>
                    <span>12个</span>
                  </div>
                  <div className="flex justify-between">
                    <span>自动备份</span>
                    <Badge variant="outline">已开启</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>快速操作</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button className="w-full" variant="outline">备份所有存档</Button>
                <Button className="w-full" variant="outline">整理存档文件</Button>
                <Button className="w-full" variant="outline">存档设置</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

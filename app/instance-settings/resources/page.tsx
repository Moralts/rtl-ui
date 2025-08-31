"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function ResourcesPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">资源包管理</h1>
          <p className="text-gray-500">管理您的 Minecraft 资源包</p>
        </div>
        <Button>添加资源包</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Card className="min-h-[600px] w-full">
            <CardHeader>
              <CardTitle>已安装资源包</CardTitle>
              <CardDescription>点击卡片预览资源包效果</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((pack) => (
                  <Card key={pack} className="cursor-pointer hover:shadow-lg transition-all">
                    <div className="aspect-video relative">
                      <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                        预览图
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">默认高清</h3>
                          <p className="text-sm text-gray-500">版本：1.21.8</p>
                        </div>
                        <Badge>已启用</Badge>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">禁用</Button>
                        <Button variant="outline" size="sm" className="flex-1">删除</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>资源包排序</CardTitle>
              <CardDescription>拖动调整加载顺序</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[1, 2, 3, 4].map((pack) => (
                  <div key={pack} className="p-3 bg-gray-50 rounded-lg cursor-move">
                    默认高清
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

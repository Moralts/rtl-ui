"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

export default function ShadersPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">光影管理</h1>
          <p className="text-gray-500">管理您的 Minecraft 光影包</p>
        </div>
        <Button>添加光影</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>已安装光影</CardTitle>
              <CardDescription>点击预览光影效果</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3].map((shader) => (
                  <Card key={shader} className="cursor-pointer hover:shadow-lg transition-all">
                    <div className="aspect-video relative">
                      <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                        预览图
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">BSL Shaders</h3>
                          <p className="text-sm text-gray-500">版本：8.2.04</p>
                        </div>
                        <Badge>当前使用</Badge>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">配置</Button>
                        <Button variant="outline" size="sm" className="flex-1">删除</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>性能设置</CardTitle>
              <CardDescription>调整光影效果和性能</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">阴影质量</div>
                    <div className="text-sm text-gray-500">调整阴影渲染质量</div>
                  </div>
                  <div className="space-x-2">
                    <Button size="sm" variant="outline">低</Button>
                    <Button size="sm" variant="secondary">中</Button>
                    <Button size="sm" variant="outline">高</Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">反射质量</div>
                    <div className="text-sm text-gray-500">调整水面等反射效果</div>
                  </div>
                  <div className="space-x-2">
                    <Button size="sm" variant="outline">低</Button>
                    <Button size="sm" variant="secondary">中</Button>
                    <Button size="sm" variant="outline">高</Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">动态光照</div>
                    <div className="text-sm text-gray-500">实时光照效果</div>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">体积光</div>
                    <div className="text-sm text-gray-500">光线散射效果</div>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>显存使用</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>当前使用</span>
                  <span>2.5GB</span>
                </div>
                <div className="flex justify-between">
                  <span>建议限制</span>
                  <span>4GB</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

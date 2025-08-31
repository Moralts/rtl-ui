"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function ModsPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">模组管理</h1>
          <p className="text-gray-500">管理和配置您的 Minecraft 模组</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">检查更新</Button>
          <Button>添加模组</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>已安装模组</CardTitle>
              <CardDescription>共 72 个模组</CardDescription>
              <div className="mt-2">
                <Input placeholder="搜索模组..." className="max-w-sm" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((mod) => (
                  <div key={mod} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <Checkbox />
                      <div>
                        <h3 className="font-medium">JEI (Just Enough Items)</h3>
                        <p className="text-sm text-gray-500">版本：10.2.1.1004</p>
                      </div>
                      <Badge variant="secondary">UI</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">配置</Button>
                      <Button variant="outline" size="sm">更新</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>快速操作</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button className="w-full" variant="outline">启用所有模组</Button>
                  <Button className="w-full" variant="outline">禁用所有模组</Button>
                  <Button className="w-full" variant="outline">导出模组列表</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>模组类别</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>优化</span>
                    <Badge>15</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>界面</span>
                    <Badge>8</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>世界生成</span>
                    <Badge>12</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>魔法</span>
                    <Badge>6</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>科技</span>
                    <Badge>18</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

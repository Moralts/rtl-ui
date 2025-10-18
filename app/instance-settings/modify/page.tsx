"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ModifyPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">实例修改</h1>
          <p className="text-gray-500">修改实例的配置和文件</p>
        </div>
        <div className="flex gap-2">
          <Button>打开配置文件夹</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>配置文件</CardTitle>
                <CardDescription>查看和编辑实例配置文件</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-2">
                    {[
                      { name: "options.txt", description: "游戏选项配置" },
                      { name: "servers.dat", description: "服务器列表" },
                      { name: "config/", description: "模组配置目录" },
                      { name: "options.amethy", description: "启动器配置" },
                    ].map((file) => (
                      <div key={file.name} className="flex items-center justify-between p-2 border rounded-lg hover:bg-gray-50">
                        <div>
                          <h3 className="font-medium">{file.name}</h3>
                          <p className="text-sm text-gray-500">{file.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">编辑</Button>
                          <Button variant="outline" size="sm">备份</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Alert>
              <AlertTitle>注意</AlertTitle>
              <AlertDescription>
                修改配置文件可能会影响游戏的稳定性。建议在修改前先备份文件。
              </AlertDescription>
            </Alert>
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>文件状态</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>配置文件</span>
                  <Badge variant="outline">12 个文件</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>已修改</span>
                  <Badge variant="outline">3 个文件</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>已备份</span>
                  <Badge variant="outline">8 个文件</Badge>
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
                <Button className="w-full" variant="outline">备份所有文件</Button>
                <Button className="w-full" variant="outline">还原默认配置</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

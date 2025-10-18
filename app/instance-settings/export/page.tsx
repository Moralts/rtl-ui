"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ExportPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">实例导出</h1>
          <p className="text-gray-500">导出和分享您的实例配置</p>
        </div>
        <div className="flex gap-2">
          <Button>开始导出</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>导出选项</CardTitle>
                <CardDescription>选择要导出的内容</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "模组文件", size: "1.2GB", count: "72 个文件" },
                    { name: "配置文件", size: "8MB", count: "15 个文件" },
                    { name: "资源包", size: "256MB", count: "4 个文件" },
                    { name: "光影包", size: "128MB", count: "3 个文件" },
                    { name: "存档文件", size: "512MB", count: "6 个世界" },
                  ].map((item) => (
                    <div key={item.name} className="flex items-center justify-between p-2 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <input type="checkbox" className="w-4 h-4" defaultChecked />
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.size} • {item.count}</p>
                        </div>
                      </div>
                      <Badge variant="outline">{item.size}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>导出格式</CardTitle>
                <CardDescription>选择导出文件的格式和压缩方式</CardDescription>
              </CardHeader>
              <CardContent>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="选择导出格式" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zip">ZIP 格式 (推荐)</SelectItem>
                    <SelectItem value="7z">7Z 格式 (高压缩率)</SelectItem>
                    <SelectItem value="folder">文件夹</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>导出信息</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>总大小</span>
                    <span>2.1GB</span>
                  </div>
                  <Progress value={33} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>已选择</span>
                    <Badge>5 项</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>预计时间</span>
                    <span>约 5 分钟</span>
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
                <Button className="w-full" variant="outline">全选</Button>
                <Button className="w-full" variant="outline">取消全选</Button>
                <Button className="w-full" variant="outline">打开导出位置</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

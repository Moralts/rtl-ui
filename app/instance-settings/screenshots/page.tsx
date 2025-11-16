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

export default function ScreenshotsPage() {
  return (
    <div className="space-y-3">
      <div className="mb-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <h1 className="text-2xl font-bold leading-tight">截图设置</h1>
        <div className="flex gap-2">
          <Button variant="outline">打开截图文件夹</Button>
          <Button>导入截图</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>所有截图</CardTitle>
                  <CardDescription>共 126 张截图</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Select>
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
                  <Select>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="查看方式" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="grid">网格视图</SelectItem>
                        <SelectItem value="list">列表视图</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6].map((screenshot) => (
                  <Card key={screenshot} className="cursor-pointer hover:shadow-lg transition-all">
                    <div className="aspect-video relative">
                      <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                        截图预览
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">2025-08-31_001</h3>
                          <p className="text-sm text-gray-500">2MB • 1920x1080</p>
                        </div>
                        <Badge>今天</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">分享</Button>
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
              <CardTitle>筛选</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">日期范围</label>
                  <Select>
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
                  <label className="text-sm font-medium">分辨率</label>
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
                <Button className="w-full" variant="outline">导出选中</Button>
                <Button className="w-full" variant="outline">删除选中</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

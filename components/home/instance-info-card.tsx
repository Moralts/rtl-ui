"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Upload, Clock } from "lucide-react";

export function InstanceInfoCard() {
  return (
    <Card className="h-full group relative overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/2 to-fuchsia-500/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <CardHeader className="relative">
        <div className="w-16 h-16 mb-4 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-2xl opacity-20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-indigo-600 dark:text-indigo-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
              />
            </svg>
          </div>
        </div>
        <CardTitle className="text-xl">实例信息</CardTitle>
        <CardDescription className="text-muted-foreground">
          查看当前实例的详细信息
        </CardDescription>
      </CardHeader>
      <CardContent className="relative">
        <div className="space-y-6">
          <div className="p-4 rounded-lg bg-gradient-to-r from-indigo-50 to-fuchsia-50 dark:from-indigo-950/20 dark:to-fuchsia-950/20">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-indigo-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                />
              </svg>
              实例名称
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">名称:</span>
                <span className="text-sm font-medium">RTL World</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">ID:</span>
                <span className="text-sm font-medium">RTLE-001</span>
              </div>
            </div>
            <div className="mt-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <Upload className="h-4 w-4" />
                    更改信息
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>更改实例信息</SheetTitle>
                    <SheetDescription>修改实例的名称和图标</SheetDescription>
                  </SheetHeader>
                  <div className="grid flex-1 auto-rows-min gap-6 px-4 mt-6">
                    <div className="grid gap-3">
                      <Label htmlFor="instance-name">实例名称</Label>
                      <Input id="instance-name" defaultValue="RTL World" />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="instance-icon">实例图标</Label>
                      <Input
                        id="instance-icon"
                        defaultValue="https://fabricmc.net/assets/logo.png"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">放弃更改</Button>
                      <Button type="submit">保存更改</Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-gradient-to-r from-indigo-50 to-fuchsia-50 dark:from-indigo-950/20 dark:to-fuchsia-950/20">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Clock className="h-5 w-5 text-violet-500" />
              启动时间
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">上次启动:</span>
                <span className="text-sm font-medium">2小时前</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">运行时长:</span>
                <span className="text-sm font-medium">45分钟</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

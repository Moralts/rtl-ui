import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function Home() {
  return (
    <div className="relative h-screen">
      {/* 公告栏 - 左侧 1/4，保持原有非占满样式 */}
      <div className="absolute left-0 top-0 w-1/4 h-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle>公告栏</CardTitle>
            <CardDescription>最新消息和更新</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-[calc(100%-theme(spacing.20))]">
            <Carousel className="w-full max-w-xs">
              <CarouselContent>
                <CarouselItem>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold">欢迎使用 RTL UI</h3>
                    <p>这是您的新用户界面系统，提供现代化的设计和流畅的体验。</p>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold">系统更新</h3>
                    <p>我们最近发布了新功能，改善了用户体验。</p>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold">使用提示</h3>
                    <p>查看我们的文档了解如何更好地使用本系统。</p>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </CardContent>
        </Card>
      </div>
      

      
      {/* 右侧栏 - 1/4 宽度，上下占满 */}
      <div className="absolute right-0 top-0 w-1/4 h-full p-4">
        <Card className="h-full flex flex-col justify-between">

          {/* 卡片主要内容区域 */}
          <CardContent className="flex-grow flex flex-col items-center justify-center">
            <div className="w-15 h-15 rounded-full overflow-hidden">
              <AspectRatio ratio={1} className="flex items-center justify-center bg-gray-200 border-2 border-dashed rounded-xl w-full h-full">
                {/* 这里可以放置实际的头像图片 */}
              </AspectRatio>
            </div>
            <span className="font-bold mt-4">RTL User</span>
          </CardContent>

          {/* 卡片底部按钮区域 */}
          <CardContent className="flex items-center space-x-4">
            <div className="w-full">
              <Button variant="default" size="lg" className="w-full mb-2">启动游戏</Button>
              <div className="flex space-x-2 mt-2">
                <Button variant="secondary" className="flex-1">版本管理</Button>
                <Button variant="secondary" className="flex-1">版本设置</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 
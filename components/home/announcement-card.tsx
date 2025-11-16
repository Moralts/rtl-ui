"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ANNOUNCEMENTS } from "@/constants/data";

export function AnnouncementCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>公告栏</CardTitle>
        <CardDescription>最新消息和更新</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-[calc(100%-theme(spacing.20))]">
        <Carousel className="w-full max-w-xs">
          <CarouselContent>
            {ANNOUNCEMENTS.map((announcement) => (
              <CarouselItem key={announcement.id}>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">{announcement.title}</h3>
                  <p className="text-sm text-muted-foreground">{announcement.content}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </CardContent>
    </Card>
  );
}

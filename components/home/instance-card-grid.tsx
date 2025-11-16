"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { INSTANCE_CARDS } from "@/constants/data";
import { cn } from "@/lib/utils";

export function InstanceCardGrid() {
  return (
    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[minmax(0,1fr)] h-full items-stretch min-h-0">
      {INSTANCE_CARDS.map((card) => (
        <Link key={card.id} href={card.href} className="block h-full">
          <Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col">
            <div className={cn(
              "absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300",
              `from-${card.colorFrom} to-${card.colorTo}`
            )} />
            <CardHeader className="relative">
              <div className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center mb-4",
                card.iconBgColor
              )}>
                <div className={cn("h-6 w-6", card.iconColor)}>
                  {card.icon}
                </div>
              </div>
              <CardTitle className="flex items-center gap-2">{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardContent className="relative flex-1">
              <div className="space-y-2">
                {card.stats.map((stat, index) => (
                  <p key={index} className="text-sm text-muted-foreground">
                    {stat}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

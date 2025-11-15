"use client";

import React from "react";
import { useAccountContext } from "@/components/accounts/AccountProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Account = {
  id: number;
  name: string;
  status: string;
};

export default function AccountSwitcher({
  open,
  onClose,
  onSelect,
  className,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (acc: Account) => void;
  className?: string;
}) {
  const { profiles } = useAccountContext();

  if (!open) return null;

  return (
    <div className={cn("fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center p-4", className)}>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>切换账户</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2">
          {profiles.map((acc: Account) => (
            <div key={acc.id} className="relative group rounded-lg">
              <div
                className="p-3 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150 flex items-center gap-3"
                onClick={() => {
                  onSelect(acc);
                  onClose();
                }}
              >
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-medium text-gray-700 dark:text-gray-200">
                  {acc.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{acc.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{acc.status}</div>
                </div>
                <div className="text-sm text-gray-400">
                  <Button size="icon" variant="ghost" className="opacity-70">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-gray-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M12 3v18"/>
                    </svg>
                  </Button>
                </div>
              </div>

              {/* hover actions */}
              <div className="absolute left-full top-1/2 ml-3 -translate-y-1/2 hidden group-hover:flex z-50 pointer-events-auto">
                <div className="flex flex-col gap-2 bg-white dark:bg-gray-900 border rounded-md shadow-md p-2 min-w-[96px]">
                  <Button size="sm" variant="ghost" className="justify-start" onClick={(e) => e.stopPropagation()}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.232-6.232" />
                    </svg>
                    修改
                  </Button>
                  <Button size="sm" variant="destructive" className="justify-start" onClick={(e) => e.stopPropagation()}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7L5 7M10 11v6M14 11v6M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2" />
                    </svg>
                    删除
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
        <div className="p-3 flex justify-between items-center">
          <div>
            <Button variant="default" size="sm" className="ml-3 mr-2">
              新增
            </Button>
          </div>
          <div>
            <Button variant="outline" size="sm" className="mr-3" onClick={onClose}>
              取消
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

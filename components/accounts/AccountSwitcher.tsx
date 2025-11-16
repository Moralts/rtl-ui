"use client";

import React from "react";
import { useAccountContext } from "@/components/accounts/AccountProvider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Edit, Trash2, UserPlus } from "lucide-react";
import type { Account } from "@/types";

type AccountSwitcherProps = {
  open: boolean;
  onClose: () => void;
  onSelect: (acc: Account) => void;
  onEdit?: (acc: Account) => void;
  onDelete?: (acc: Account) => void;
  onAdd?: () => void;
};

export default function AccountSwitcher({
  open,
  onClose,
  onSelect,
  onEdit,
  onDelete,
  onAdd,
}: AccountSwitcherProps) {
  const { profiles } = useAccountContext();

  const handleSelect = (acc: Account) => {
    onSelect(acc);
    onClose();
  };

  const handleEdit = (acc: Account, e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(acc);
  };

  const handleDelete = (acc: Account, e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(acc);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>切换账户</DialogTitle>
          <DialogDescription>
            选择一个账户或管理现有账户
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 py-4">
          {profiles.map((acc: Account) => (
            <div
              key={acc.id}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer group"
              onClick={() => handleSelect(acc)}
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-medium text-primary">
                {acc.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold truncate">{acc.name}</div>
                <div className="text-sm text-muted-foreground truncate">{acc.status}</div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => e.stopPropagation()}
                    aria-label="账户操作"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={(e) => handleEdit(acc, e)}>
                    <Edit className="h-4 w-4 mr-2" />
                    修改
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => handleDelete(acc, e)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    删除
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center pt-2 border-t">
          <Button
            variant="default"
            size="sm"
            onClick={onAdd}
            className="gap-2"
          >
            <UserPlus className="h-4 w-4" />
            新增账户
          </Button>
          <Button variant="outline" size="sm" onClick={onClose}>
            取消
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

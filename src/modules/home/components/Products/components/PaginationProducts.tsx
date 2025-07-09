import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationProductsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PaginationProducts({ currentPage, totalPages, onPageChange }: PaginationProductsProps) {
  // Tạo mảng các trang để hiển thị
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Nếu tổng số trang <= 5, hiển thị tất cả
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Nếu tổng số trang > 5, hiển thị thông minh
      if (currentPage <= 3) {
        // Trang đầu
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Trang cuối
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Trang giữa
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const getItemProps = (page: number | string) => {
    if (typeof page === 'string') {
      return {
        variant: "outline" as "outline",
        disabled: true,
        className: "rounded-full w-14 h-14 p-0 text-sm border-gray-300 text-gray-400 cursor-default",
      };
    }

    return {
      variant: (currentPage === page ? "default" : "outline") as "default" | "outline",
      onClick: () => onPageChange(page),
      className: `rounded-full w-14 h-14 p-0 text-sm ${currentPage === page
        ? "bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white"
        : "border-primary text-primary hover:bg-primary/10"
        }`,
    };
  };

  const next = () => {
    if (currentPage === totalPages) return;
    onPageChange(currentPage + 1);
  };

  const prev = () => {
    if (currentPage === 1) return;
    onPageChange(currentPage - 1);
  };

  if (totalPages <= 1) {
    return null; // Không hiển thị phân trang nếu chỉ có 1 trang
  }

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        className="flex items-center gap-2 rounded-full cursor-pointer text-primary hover:bg-primary/10"
        onClick={prev}
        disabled={currentPage === 1}
      >
        <ArrowLeft className="h-4 w-4" />
        Trước
      </Button>

      <div className="flex items-center gap-2">
        {getPageNumbers().map((page, index) => (
          <Button key={index} {...getItemProps(page)}>
            {page}
          </Button>
        ))}
      </div>

      <Button
        variant="ghost"
        className="flex items-center gap-2 rounded-full cursor-pointer text-primary hover:bg-primary/10"
        onClick={next}
        disabled={currentPage === totalPages}
      >
        Tiếp
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

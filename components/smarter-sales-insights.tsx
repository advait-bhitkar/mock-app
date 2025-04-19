import { cn } from "@/lib/utils";
import React from "react";

interface SmarterSalesInsightsProps {
  className?: string;
}

const SmarterSalesInsights = ({
  className,
}: SmarterSalesInsightsProps) => {
  return (
    <div className={cn("bg-[#efeffb] px-3 py-2 rounded-sm w-fit", className)}>
      <h2 className="text-[#5866E1] font-normal font-outfit">
        Fast Api Mocking
      </h2>
    </div>
  );
};

export default SmarterSalesInsights; 
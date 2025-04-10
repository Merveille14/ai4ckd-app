"use client";

import React, { useMemo } from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { browser: "Médecins", visitors: 275, fill: "var(--primary)" },
  { browser: "infirmiers", visitors: 200, fill: "green" },
  { browser: "Aides", visitors: 287, fill:"yellow" },

];

const chartConfig = {
  visitors: { label: "Visitors" },
  chrome: { label: "Chrome", color: "hsl(var(--chart-1))" },
  infirmiers: { label: "infirmiers", color: "hsl(var(--chart-2))" },
  Aides: { label: "Aides", color: "hsl(var(--chart-3))" },
};

export default function Mychart() {
  const totalVisitors = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Apperçu des différents utilisateurs</CardTitle>
        <CardDescription>Classement par rôle</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="visitors" nameKey="browser" innerRadius={60} strokeWidth={5}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                         Comptes
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">

        <div className="leading-none text-muted-foreground">
         Médecins - Infirmiers - Aides soignants 
        </div>
      </CardFooter>
    </Card>
  );
}
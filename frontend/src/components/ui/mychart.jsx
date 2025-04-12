"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Pie, PieChart, Label } from "recharts";
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
import axios from "axios";

const COLORS = {
  doctor: "var(--primary)",
  nurse: "green",
  dietician: "orange",
  admin: "blue",
  pharmacist: "purple",
  lab_technician: "teal",
};

export default function Mychart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios.get("/api/users/count-by-role")
      .then(res => {
        const roles = res.data.data;
        const transformed = Object.keys(roles).map((role) => ({
          role,
          count: roles[role],
          fill: COLORS[role] || "gray",
        }));
        setChartData(transformed);
      })
      .catch(err => console.error("Erreur lors de la récupération des données :", err));
  }, []);

  const totalUsers = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
  }, [chartData]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Apperçu des différents utilisateurs</CardTitle>
        <CardDescription>Classement par rôle</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="role"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                          {totalUsers}
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
          {chartData.map((item) => item.role).join(" - ")}
        </div>
      </CardFooter>
    </Card>
  );
}

"use client";

import React, { useMemo, useEffect, useState } from "react";
import { PieChart, Pie, Label } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import api from "@/services/axios";

export default function Mychart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await api.get("/users/count-by-role");
        const roleColorMap = {
          doctor: "var(--primary)",
          nurse: "green",
          dietician: "orange",
          pharmacist: "purple",
          lab_technician: "blue",
          admin: "gray",
        };

        const roleLabelMap = {
          doctor: "Médecins",
          nurse: "Infirmiers",
          dietician: "Diététiciens",
          pharmacist: "Pharmaciens",
          lab_technician: "Techniciens",
          admin: "Admins",
        };

        const formatted = response.data.map((item) => ({
          browser: roleLabelMap[item.role] || item.role,
          visitors: item.total,
          fill: roleColorMap[item.role] || "gray",
        }));

        setChartData(formatted);
      } catch (error) {
        console.error("Erreur lors du chargement des données de rôle :", error);
      }
    };

    fetchChartData();
  }, []);

  const totalVisitors = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, [chartData]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Aperçu des différents utilisateurs</CardTitle>
        <CardDescription>Classement par rôle</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer className="mx-auto aspect-square max-h-[250px]">
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
          {chartData.map((item) => item.browser).join(" - ")}
        </div>
      </CardFooter>
    </Card>
  );
}

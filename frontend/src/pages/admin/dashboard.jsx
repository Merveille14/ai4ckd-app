"use client"
import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { useState } from "react"
import data from "./data.json"
import { User } from "@/components/users"
import EcommerceMetrics from "@/components/EcommerceMetrics"

export default function Dashboard() {
  const [selectedPage, setSelectedPage] = useState("dashboard");
  return (
    <SidebarProvider>
      <AppSidebar variant="inset"  setSelectedPage={setSelectedPage} />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col p-10">
              {selectedPage == "dashboard" && <EcommerceMetrics/> }
              {selectedPage == "User" && <User/> }
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

"use client"
import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { useState } from "react"
import data from "./data.json"
import { Users } from "@/components/users"

export default function Dashboard() {
  const [selectedPage, setSelectedPage] = useState("medecins");
  return (
    <SidebarProvider>
      <AppSidebar variant="inset"  setSelectedPage={setSelectedPage} />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col p-10">

              {selectedPage == "medecins" && <Users/> }
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

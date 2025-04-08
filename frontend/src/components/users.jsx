"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog"
import axios from "axios"
import api from "@/services/axios"
import { Label } from "@/components/ui/label"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import { Pencil, Trash2, Eye, Search, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { useState, useEffect } from "react"

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "nom",
    header: "Nom",
    cell: ({ row }) => <div className="capitalize">{row.getValue("last_name")}</div>
  },
  {
    accessorKey: "prenom",
    header: "Prénom",
    cell: ({ row }) => <div className="capitalize">{row.getValue("first_name")}</div>
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>
  },
  {
    accessorKey: "role",
    header: "Rôle",
    cell: ({ row }) => <div className="capitalize">{row.getValue("role")}</div>
  },
  {
    accessorKey: "mot_de_passe",
    header: "Mot de passe",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("mot_de_passe")}</div>
    )
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Supprimer</DropdownMenuItem>
          <DropdownMenuItem>Modifier</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
]

export function User() {
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [dashboardData, setDashboardData] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "",
    phone_number: "",
    specialization: "",
    address: ""
  });
  const fetchUsers = async () => {
    try {
      const response = await api.get('/user');
      setDashboardData(response.data.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des livres :", error);
    }
  };

  // Configuration useEffect pour récupérer les données
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post("/register", formData)
      setFormData({ // Réinitialiser le formulaire après envoi
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "",
        phone_number: "",
        specialization: "",
        address: ""
      });
      setOpen(false);
      console.log("role envoyé :", res.data);
      alert("Utilisateur créé avec succès !")
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      alert("Erreur : " + (error.response?.data?.message || "Inscription échouée"));
    }
  };

  const table = useReactTable({
    data: dashboardData, // Utiliser directement les données récupérées de l'API
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-2">
        <Input
          placeholder="Filtrer par email..."
          value={table.getColumn("email")?.getFilterValue() ?? ""}
          onChange={(event) => table.getColumn("email")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colonnes <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table.getAllColumns().filter(col => col.getCanHide()).map(col => (
              <DropdownMenuCheckboxItem
                key={col.id}
                checked={col.getIsVisible()}
                onCheckedChange={(value) => col.toggleVisibility(!!value)}
              >
                {col.id}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#9ac441] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#7fa637]">
              <UserPlus size={18} /><span>Ajouter</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Ajouter un utilisateur</DialogTitle>
              <DialogDescription>Entrez les informations</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                {[
                  { label: "Prénom", name: "first_name" },
                  { label: "Nom", name: "last_name" },
                  { label: "Email", name: "email", type: "email" },
                  { label: "Mot de passe", name: "password", type: "password" },
                  { label: "confirmation du mot de passe", name: "password_confirmation", type: "password" },
                  { label: "Numéro", name: "phone_number" },
                  { label: "Spécialisation", name: "specialization" },
                  { label: "Adresse", name: "address" }
                ].map(({ label, name, type = "text" }) => (
                  <div key={name} className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor={name} className="text-right">{label}</Label>
                    <Input
                      type={type}
                      name={name}
                      placeholder={label}
                      value={formData[name]}
                      onChange={handleChange}
                      className="col-span-3"
                    />
                  </div>
                ))}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">Rôle</Label>
                  <select name="role" value={formData.role} onChange={handleChange} className="col-span-3">
                    <option value="doctor">Docteur</option>
                    <option value="nurse">Infirmier</option>
                    <option value="admin">Admin</option>
                    <option value="staff">Personnel</option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Ajouter</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map(row => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

interface DecadeJumpProps {
  decades: number[]
  onDecadeSelect: (decade: number) => void
}

export default function DecadeJump({ decades, onDecadeSelect }: DecadeJumpProps) {
  const [selectedDecade, setSelectedDecade] = useState<number | null>(null)

  const handleDecadeSelect = (decade: number) => {
    setSelectedDecade(decade)
    onDecadeSelect(decade)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-blue-600 hover:bg-blue-700 text-white">
          Jump to Decade {selectedDecade ? `(${selectedDecade}s)` : ""} <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-gray-800 border border-gray-700">
        {decades.map((decade) => (
          <DropdownMenuItem
            key={decade}
            onSelect={() => handleDecadeSelect(decade)}
            className="text-white hover:bg-gray-700 cursor-pointer"
          >
            {decade}s
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


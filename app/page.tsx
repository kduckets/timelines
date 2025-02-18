"use client"

import { useState } from "react"
import CombinedTimeline from "./components/CombinedTimeline"
import ScrollToTopButton from "./components/ScrollToTopButton"
import SearchBox from "./components/SearchBox"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white font-mono">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <SearchBox onSearch={handleSearch} />
        <CombinedTimeline />
      </div>
      <ScrollToTopButton />
    </main>
  )
}


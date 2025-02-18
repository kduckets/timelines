"use client"

import { useState, useMemo } from "react"
import Timeline from "./Timeline"
import FilterBar from "./FilterBar"
import { Button } from "@/components/ui/button"
import { humanMilestones, categoryGroups as humanCategoryGroups } from "../../data/humanMilestones"
import {
  buildingBlockMilestones,
  categoryGroups as buildingBlockCategoryGroups,
} from "../../data/buildingBlocksMilestones"
import { milestones, categoryGroups as milestoneCategoryGroups } from "../../data/milestones"

type TimelineType = "all" | "artTechnology" | "internetBuildingBlocks" | "internetHistory"

interface TimelineInfo {
  title: string
  description: string
  filterText: string
}

const timelineInfo: Record<TimelineType, TimelineInfo> = {
  all: {
    title: "Combined Art, Technology, and Internet Milestones",
    description:
      "Explore a comprehensive timeline of human achievements, internet building blocks, and digital milestones throughout history.",
    filterText: "Filter All Milestones",
  },
  artTechnology: {
    title: "Art & Technology Milestones",
    description:
      "Explore the technological and artistic achievements of humanity throughout history, from prehistoric times to the modern era.",
    filterText: "Filter Art & Technology Milestones",
  },
  internetBuildingBlocks: {
    title: "Building Blocks of the Internet",
    description: "Discover the key technologies and innovations that formed the foundation of the modern internet.",
    filterText: "Filter Internet Building Blocks",
  },
  internetHistory: {
    title: "History of the Internet",
    description: "Explore the pivotal moments and innovations in the history of the internet and digital technology.",
    filterText: "Filter Internet History Milestones",
  },
}

export default function CombinedTimeline() {
  const [timelineType, setTimelineType] = useState<TimelineType>("artTechnology")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const handleToggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handleClearAll = () => {
    setSelectedCategories([])
  }

  const allMilestones = useMemo(() => {
    return [
      ...humanMilestones.map((m) => ({ ...m, source: "human" })),
      ...buildingBlockMilestones.map((m) => ({ ...m, source: "buildingBlock" })),
      ...milestones.map((m) => ({ ...m, source: "internet" })),
    ]
  }, [])

  const getCurrentMilestones = () => {
    switch (timelineType) {
      case "all":
        return allMilestones
      case "artTechnology":
        return humanMilestones
      case "internetBuildingBlocks":
        return buildingBlockMilestones
      case "internetHistory":
        return milestones
      default:
        return humanMilestones
    }
  }

  const consolidatedCategoryGroups = useMemo(() => {
    const allCategories = new Set([
      ...humanCategoryGroups.flatMap((group) => group.categories),
      ...buildingBlockCategoryGroups.flatMap((group) => group.categories),
      ...milestoneCategoryGroups.flatMap((group) => group.categories),
    ])

    return [
      {
        name: "All Categories",
        categories: Array.from(allCategories).sort(),
      },
    ]
  }, [])

  const getCurrentCategoryGroups = () => {
    switch (timelineType) {
      case "all":
        return consolidatedCategoryGroups
      case "artTechnology":
        return humanCategoryGroups
      case "internetBuildingBlocks":
        return buildingBlockCategoryGroups
      case "internetHistory":
        return milestoneCategoryGroups
      default:
        return humanCategoryGroups
    }
  }

  const filteredMilestones = getCurrentMilestones().filter((milestone) => {
    return selectedCategories.length === 0 || selectedCategories.some((cat) => milestone.categories.includes(cat))
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-center space-x-4 flex-wrap">
        <Button
          onClick={() => setTimelineType("all")}
          variant={timelineType === "all" ? "default" : "outline"}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
        >
          All Milestones
        </Button>
        <Button
          onClick={() => setTimelineType("artTechnology")}
          variant={timelineType === "artTechnology" ? "default" : "outline"}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
        >
          Art & Technology
        </Button>
        <Button
          onClick={() => setTimelineType("internetBuildingBlocks")}
          variant={timelineType === "internetBuildingBlocks" ? "default" : "outline"}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
        >
          Building Blocks of the Internet
        </Button>
        <Button
          onClick={() => setTimelineType("internetHistory")}
          variant={timelineType === "internetHistory" ? "default" : "outline"}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
        >
          History of the Internet
        </Button>
      </div>
      <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
        {timelineInfo[timelineType].title}
      </h1>
      <p className="text-center text-gray-300 mb-8 md:mb-12 max-w-2xl mx-auto text-sm md:text-base">
        {timelineInfo[timelineType].description}
      </p>
      <FilterBar
        categoryGroups={getCurrentCategoryGroups()}
        selectedCategories={selectedCategories}
        onToggleCategory={handleToggleCategory}
        onClearAll={handleClearAll}
        filterText={timelineInfo[timelineType].filterText}
      />
      <Timeline
        milestones={filteredMilestones}
        filteredCategories={selectedCategories}
        onCategoryClick={handleToggleCategory}
      />
    </div>
  )
}


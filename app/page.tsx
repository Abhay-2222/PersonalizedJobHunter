"use client"

import { useState, useEffect, useRef } from "react"
import {
  Bell,
  Briefcase,
  Plus,
  Search,
  Settings,
  Zap,
  Globe,
  MessageSquare,
  RefreshCw,
  ExternalLink,
  MousePointerClick,
  Keyboard,
  X,
  Filter,
  MapPin,
  Tag,
  Clock,
  TrendingUp,
  BarChart3,
  Activity,
  Users,
  Sparkles,
  Timer,
  Code,
  Flag,
  Laptop,
  Building,
  UserPlus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"
import { Line, Bar, Doughnut, Pie } from "react-chartjs-2"

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
)

interface JobMatch {
  id: string
  url: string
  keywords: string[]
  timestamp: string
  company: string
  apply_url?: string
  position?: string
  country: string
  jobDetails?: {
    location?: string
    salary?: string
    type?: string
  }
  scrapingDetails?: {
    searchInteraction?: boolean
    buttonInteraction?: boolean
  }
}

interface ScrapingStatus {
  isRunning: boolean
  progress: number
  currentSite: string
  totalSites: number
  completedSites: number
}

interface JobAlert {
  id: string
  name: string
  keywords: string[]
  locations: string[]
  country: string
  isActive: boolean
  createdAt: string
}

interface ScrapingSession {
  id: string
  timestamp: string
  totalJobs: number
  jobsByLocation: Record<string, number>
  jobsByCompany: Record<string, number>
  jobsByKeyword: Record<string, number>
  jobsByCountry: Record<string, number>
}

export default function JobAlertDashboard() {
  const [jobMatches, setJobMatches] = useState<JobMatch[]>([])
  const [filteredJobs, setFilteredJobs] = useState<JobMatch[]>([])
  const [scrapingStatus, setScrapingStatus] = useState<ScrapingStatus>({
    isRunning: false,
    progress: 0,
    currentSite: "",
    totalSites: 0,
    completedSites: 0,
  })
  const [logs, setLogs] = useState<string[]>([])
  const [stats, setStats] = useState({
    activeAlerts: 0,
    totalMatches: 0,
    newMatches: 0,
  })
  const [jobAlerts, setJobAlerts] = useState<JobAlert[]>([])
  const [locationFilter, setLocationFilter] = useState<string>("all")
  const [countryFilter, setCountryFilter] = useState<string>("all")
  const [keywordFilter, setKeywordFilter] = useState<string>("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [newAlert, setNewAlert] = useState({
    name: "",
    keywords: "",
    locations: ["All"],
    country: "Canada",
  })
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false)
  const [nextScrapeTime, setNextScrapeTime] = useState<Date | null>(null)
  const [scrapingSessions, setScrapingSessions] = useState<ScrapingSession[]>([])
  const [selectedJobType, setSelectedJobType] = useState<string>("design")
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState<boolean>(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Apply filters to jobs
  useEffect(() => {
    let filtered = [...jobMatches]

    // Filter by country
    if (countryFilter && countryFilter !== "all") {
      filtered = filtered.filter((job) => job.country === countryFilter)
    }

    // Filter by location
    if (locationFilter && locationFilter !== "all") {
      filtered = filtered.filter(
        (job) =>
          job.jobDetails?.location?.toLowerCase().includes(locationFilter.toLowerCase()) ||
          (locationFilter === "Remote" && job.jobDetails?.location === "Remote"),
      )
    }

    // Filter by role type
    if (roleFilter && roleFilter !== "all") {
      if (roleFilter === "design") {
        filtered = filtered.filter(
          (job) =>
            job.position?.toLowerCase().includes("design") ||
            job.position?.toLowerCase().includes("ux") ||
            job.position?.toLowerCase().includes("ui") ||
            job.keywords.some(
              (kw) =>
                kw.toLowerCase().includes("design") ||
                kw.toLowerCase().includes("ux") ||
                kw.toLowerCase().includes("ui"),
            ),
        )
      } else if (roleFilter === "software") {
        filtered = filtered.filter(
          (job) =>
            job.position?.toLowerCase().includes("software") ||
            job.position?.toLowerCase().includes("developer") ||
            job.position?.toLowerCase().includes("engineer") ||
            job.position?.toLowerCase().includes("programming") ||
            job.keywords.some(
              (kw) =>
                kw.toLowerCase().includes("software") ||
                kw.toLowerCase().includes("developer") ||
                kw.toLowerCase().includes("engineer") ||
                kw.toLowerCase().includes("programming"),
            ),
        )
      } else if (roleFilter === "management") {
        filtered = filtered.filter(
          (job) =>
            job.position?.toLowerCase().includes("manager") ||
            job.position?.toLowerCase().includes("lead") ||
            job.position?.toLowerCase().includes("director") ||
            job.position?.toLowerCase().includes("head") ||
            job.keywords.some(
              (kw) =>
                kw.toLowerCase().includes("manager") ||
                kw.toLowerCase().includes("lead") ||
                kw.toLowerCase().includes("director") ||
                kw.toLowerCase().includes("head"),
            ),
        )
      }
    }

    // Filter by keyword
    if (keywordFilter) {
      filtered = filtered.filter(
        (job) =>
          job.position?.toLowerCase().includes(keywordFilter.toLowerCase()) ||
          job.keywords.some((kw) => kw.toLowerCase().includes(keywordFilter.toLowerCase())) ||
          job.company.toLowerCase().includes(keywordFilter.toLowerCase()),
      )
    }

    setFilteredJobs(filtered)
  }, [jobMatches, locationFilter, keywordFilter, countryFilter, roleFilter])

  // Set up automatic scraping every hour
  useEffect(() => {
    // Initial scrape
    startScraping()

    // Set up interval for hourly scraping only if auto-refresh is enabled
    if (autoRefreshEnabled) {
      intervalRef.current = setInterval(
        () => {
          startScraping()
        },
        60 * 60 * 1000,
      ) // 1 hour in milliseconds
    }

    // Update next scrape time
    const updateNextScrapeTime = () => {
      const next = new Date()
      next.setHours(next.getHours() + 1)
      setNextScrapeTime(next)
    }

    updateNextScrapeTime()
    const timeInterval = setInterval(updateNextScrapeTime, 60000) // Update every minute

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      clearInterval(timeInterval)
    }
  }, [autoRefreshEnabled])

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs((prev) => [`[${timestamp}] ${message}`, ...prev.slice(0, 49)])
  }

  const testTelegram = async () => {
    try {
      const response = await fetch("/api/test-telegram", {
        method: "POST",
      })
      const result = await response.json()
      if (result.success) {
        addLog("✅ Telegram connection successful!")
      } else {
        addLog("❌ Telegram connection failed")
      }
    } catch (error) {
      addLog("❌ Error testing Telegram connection")
    }
  }

  const startScraping = async () => {
    try {
      setScrapingStatus((prev) => ({ ...prev, isRunning: true, progress: 0 }))
      addLog(
        `🚀 Starting job scraper for ${selectedJobType === "design" ? "design" : selectedJobType === "software" ? "software" : "management"} roles...`,
      )

      const sessionStartTime = new Date()
      const sessionJobsByLocation: Record<string, number> = {}
      const sessionJobsByCompany: Record<string, number> = {}
      const sessionJobsByKeyword: Record<string, number> = {}
      const sessionJobsByCountry: Record<string, number> = {}
      let sessionTotalJobs = 0

      const response = await fetch("/api/scrape-jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobType: selectedJobType,
        }),
      })

      if (!response.ok) throw new Error("Scraping failed")

      const reader = response.body?.getReader()
      if (!reader) throw new Error("No response stream")

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = new TextDecoder().decode(value)
        const lines = chunk.split("\n").filter((line) => line.trim())

        for (const line of lines) {
          try {
            const data = JSON.parse(line)

            if (data.type === "progress") {
              setScrapingStatus((prev) => ({
                ...prev,
                progress: data.progress,
                currentSite: data.currentSite,
                totalSites: data.totalSites,
                completedSites: data.completedSites,
              }))
              addLog(`🔍 Checking: ${data.currentSite}`)
            } else if (data.type === "match") {
              const newMatch: JobMatch = {
                id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
                url: data.url,
                keywords: data.keywords,
                timestamp: new Date().toISOString(),
                company: data.company,
                apply_url: data.apply_url || data.url,
                position: data.position || data.keywords[0],
                country:
                  data.country ||
                  (data.jobDetails?.location?.includes("USA") || data.jobDetails?.location?.includes("US")
                    ? "USA"
                    : "Canada"),
                jobDetails: data.jobDetails,
                scrapingDetails: data.scrapingDetails,
              }
              setJobMatches((prev) => [newMatch, ...prev])
              setStats((prev) => ({
                ...prev,
                totalMatches: prev.totalMatches + 1,
                newMatches: prev.newMatches + 1,
              }))

              // Update session analytics
              sessionTotalJobs++
              const location = newMatch.jobDetails?.location || "Unknown"
              sessionJobsByLocation[location] = (sessionJobsByLocation[location] || 0) + 1
              sessionJobsByCompany[newMatch.company] = (sessionJobsByCompany[newMatch.company] || 0) + 1
              sessionJobsByCountry[newMatch.country] = (sessionJobsByCountry[newMatch.country] || 0) + 1
              newMatch.keywords.forEach((keyword) => {
                sessionJobsByKeyword[keyword] = (sessionJobsByKeyword[keyword] || 0) + 1
              })

              // Add detailed log about how the job was found
              let foundLog = `✅ Job found at ${data.company}: ${data.position || data.keywords[0]}`
              if (data.scrapingDetails?.searchInteraction) {
                foundLog += " (via search)"
              }
              if (data.scrapingDetails?.buttonInteraction) {
                foundLog += " (via button click)"
              }
              addLog(foundLog)
            } else if (data.type === "log") {
              addLog(data.message)
            } else if (data.type === "error") {
              addLog(`❌ Error: ${data.message}`)
            } else if (data.type === "complete") {
              addLog(`🎯 Scraping complete! Found ${data.totalMatches} matches`)
              setScrapingStatus((prev) => ({ ...prev, isRunning: false }))

              // Save scraping session
              const session: ScrapingSession = {
                id: Date.now().toString(),
                timestamp: sessionStartTime.toISOString(),
                totalJobs: sessionTotalJobs,
                jobsByLocation: sessionJobsByLocation,
                jobsByCompany: sessionJobsByCompany,
                jobsByKeyword: sessionJobsByKeyword,
                jobsByCountry: sessionJobsByCountry,
              }
              setScrapingSessions((prev) => [session, ...prev.slice(0, 9)]) // Keep last 10 sessions
            }
          } catch (e) {
            // Ignore JSON parse errors for incomplete chunks
          }
        }
      }

      // Update next scrape time
      const next = new Date()
      next.setHours(next.getHours() + 1)
      setNextScrapeTime(next)
    } catch (error) {
      addLog(`❌ Scraping failed: ${error instanceof Error ? error.message : "Unknown error"}`)
      setScrapingStatus((prev) => ({ ...prev, isRunning: false }))
    }
  }

  const handleCreateAlert = () => {
    if (!newAlert.name || !newAlert.keywords) {
      addLog("❌ Alert name and keywords are required")
      return
    }

    const keywords = newAlert.keywords.split(",").map((k) => k.trim())

    const alert: JobAlert = {
      id: Date.now().toString(),
      name: newAlert.name,
      keywords: keywords,
      locations: newAlert.locations,
      country: newAlert.country,
      isActive: true,
      createdAt: new Date().toISOString(),
    }

    setJobAlerts((prev) => [...prev, alert])
    setStats((prev) => ({
      ...prev,
      activeAlerts: prev.activeAlerts + 1,
    }))

    addLog(`✅ Created new alert: ${newAlert.name}`)
    setNewAlert({ name: "", keywords: "", locations: ["All"], country: "Canada" })
    setIsAlertDialogOpen(false)
  }

  const clearFilters = () => {
    setLocationFilter("all")
    setCountryFilter("all")
    setKeywordFilter("")
    setRoleFilter("all")
  }

  const toggleAutoRefresh = () => {
    setAutoRefreshEnabled((prev) => !prev)
    addLog(`🔄 Auto-refresh ${!autoRefreshEnabled ? "enabled" : "disabled"}`)

    // Clear existing interval if turning off
    if (autoRefreshEnabled && intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  // Prepare chart data
  const getLocationChartData = () => {
    const locationCounts: Record<string, number> = {}
    jobMatches.forEach((job) => {
      const location = job.jobDetails?.location || "Unknown"
      locationCounts[location] = (locationCounts[location] || 0) + 1
    })

    // Get top 8 locations
    const sortedLocations = Object.entries(locationCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8)

    return {
      labels: sortedLocations.map(([location]) => location),
      datasets: [
        {
          label: "Jobs by Location",
          data: sortedLocations.map(([, count]) => count),
          backgroundColor: [
            "rgba(59, 130, 246, 0.8)",
            "rgba(16, 185, 129, 0.8)",
            "rgba(251, 146, 60, 0.8)",
            "rgba(147, 51, 234, 0.8)",
            "rgba(236, 72, 153, 0.8)",
            "rgba(250, 204, 21, 0.8)",
            "rgba(14, 165, 233, 0.8)",
            "rgba(168, 85, 247, 0.8)",
          ],
          borderColor: [
            "rgba(59, 130, 246, 1)",
            "rgba(16, 185, 129, 1)",
            "rgba(251, 146, 60, 1)",
            "rgba(147, 51, 234, 1)",
            "rgba(236, 72, 153, 1)",
            "rgba(250, 204, 21, 1)",
            "rgba(14, 165, 233, 1)",
            "rgba(168, 85, 247, 1)",
          ],
          borderWidth: 1,
        },
      ],
    }
  }

  const getCompanyChartData = () => {
    const companyCounts: Record<string, number> = {}
    jobMatches.forEach((job) => {
      companyCounts[job.company] = (companyCounts[job.company] || 0) + 1
    })

    // Get top 10 companies
    const sortedCompanies = Object.entries(companyCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)

    return {
      labels: sortedCompanies.map(([company]) => company),
      datasets: [
        {
          label: "Jobs by Company",
          data: sortedCompanies.map(([, count]) => count),
          backgroundColor: "rgba(59, 130, 246, 0.8)",
          borderColor: "rgba(59, 130, 246, 1)",
          borderWidth: 1,
        },
      ],
    }
  }

  const getTrendChartData = () => {
    const last7Sessions = scrapingSessions.slice(0, 7).reverse()

    return {
      labels: last7Sessions.map((session) => new Date(session.timestamp).toLocaleDateString()),
      datasets: [
        {
          label: "Jobs Found",
          data: last7Sessions.map((session) => session.totalJobs),
          borderColor: "rgba(59, 130, 246, 1)",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          tension: 0.4,
          fill: true,
        },
      ],
    }
  }

  const getKeywordChartData = () => {
    const keywordCounts: Record<string, number> = {}
    jobMatches.forEach((job) => {
      job.keywords.forEach((keyword) => {
        keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1
      })
    })

    // Get top 8 keywords
    const sortedKeywords = Object.entries(keywordCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8)

    return {
      labels: sortedKeywords.map(([keyword]) => keyword),
      datasets: [
        {
          label: "Jobs by Keyword",
          data: sortedKeywords.map(([, count]) => count),
          backgroundColor: [
            "rgba(59, 130, 246, 0.8)",
            "rgba(16, 185, 129, 0.8)",
            "rgba(251, 146, 60, 0.8)",
            "rgba(147, 51, 234, 0.8)",
            "rgba(236, 72, 153, 0.8)",
            "rgba(250, 204, 21, 0.8)",
            "rgba(14, 165, 233, 0.8)",
            "rgba(168, 85, 247, 0.8)",
          ],
        },
      ],
    }
  }

  const getCountryChartData = () => {
    const countryCounts: Record<string, number> = {
      Canada: jobMatches.filter((job) => job.country === "Canada").length,
      USA: jobMatches.filter((job) => job.country === "USA").length,
      Other: jobMatches.filter((job) => job.country !== "Canada" && job.country !== "USA").length,
    }

    return {
      labels: Object.keys(countryCounts),
      datasets: [
        {
          label: "Jobs by Country",
          data: Object.values(countryCounts),
          backgroundColor: ["rgba(59, 130, 246, 0.8)", "rgba(239, 68, 68, 0.8)", "rgba(16, 185, 129, 0.8)"],
          borderColor: ["rgba(59, 130, 246, 1)", "rgba(239, 68, 68, 1)", "rgba(16, 185, 129, 1)"],
          borderWidth: 1,
        },
      ],
    }
  }

  const getRoleChartData = () => {
    const roleCounts = {
      Design: jobMatches.filter(
        (job) =>
          job.position?.toLowerCase().includes("design") ||
          job.position?.toLowerCase().includes("ux") ||
          job.position?.toLowerCase().includes("ui") ||
          job.keywords.some(
            (kw) =>
              kw.toLowerCase().includes("design") || kw.toLowerCase().includes("ux") || kw.toLowerCase().includes("ui"),
          ),
      ).length,
      Software: jobMatches.filter(
        (job) =>
          job.position?.toLowerCase().includes("software") ||
          job.position?.toLowerCase().includes("developer") ||
          job.position?.toLowerCase().includes("engineer") ||
          job.position?.toLowerCase().includes("programming") ||
          job.keywords.some(
            (kw) =>
              kw.toLowerCase().includes("software") ||
              kw.toLowerCase().includes("developer") ||
              kw.toLowerCase().includes("engineer") ||
              kw.toLowerCase().includes("programming"),
          ),
      ).length,
      Management: jobMatches.filter(
        (job) =>
          job.position?.toLowerCase().includes("manager") ||
          job.position?.toLowerCase().includes("lead") ||
          job.position?.toLowerCase().includes("director") ||
          job.position?.toLowerCase().includes("head") ||
          job.keywords.some(
            (kw) =>
              kw.toLowerCase().includes("manager") ||
              kw.toLowerCase().includes("lead") ||
              kw.toLowerCase().includes("director") ||
              kw.toLowerCase().includes("head"),
          ),
      ).length,
      Other: jobMatches.filter(
        (job) =>
          !(
            job.position?.toLowerCase().includes("design") ||
            job.position?.toLowerCase().includes("ux") ||
            job.position?.toLowerCase().includes("ui") ||
            job.keywords.some(
              (kw) =>
                kw.toLowerCase().includes("design") ||
                kw.toLowerCase().includes("ux") ||
                kw.toLowerCase().includes("ui"),
            )
          ) &&
          !(
            job.position?.toLowerCase().includes("software") ||
            job.position?.toLowerCase().includes("developer") ||
            job.position?.toLowerCase().includes("engineer") ||
            job.position?.toLowerCase().includes("programming") ||
            job.keywords.some(
              (kw) =>
                kw.toLowerCase().includes("software") ||
                kw.toLowerCase().includes("developer") ||
                kw.toLowerCase().includes("engineer") ||
                kw.toLowerCase().includes("programming"),
            )
          ) &&
          !(
            job.position?.toLowerCase().includes("manager") ||
            job.position?.toLowerCase().includes("lead") ||
            job.position?.toLowerCase().includes("director") ||
            job.position?.toLowerCase().includes("head") ||
            job.keywords.some(
              (kw) =>
                kw.toLowerCase().includes("manager") ||
                kw.toLowerCase().includes("lead") ||
                kw.toLowerCase().includes("director") ||
                kw.toLowerCase().includes("head"),
            )
          ),
      ).length,
    }

    return {
      labels: Object.keys(roleCounts),
      datasets: [
        {
          label: "Jobs by Role",
          data: Object.values(roleCounts),
          backgroundColor: [
            "rgba(59, 130, 246, 0.8)",
            "rgba(16, 185, 129, 0.8)",
            "rgba(251, 146, 60, 0.8)",
            "rgba(147, 51, 234, 0.8)",
          ],
          borderColor: [
            "rgba(59, 130, 246, 1)",
            "rgba(16, 185, 129, 1)",
            "rgba(251, 146, 60, 1)",
            "rgba(147, 51, 234, 1)",
          ],
          borderWidth: 1,
        },
      ],
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                  <Briefcase className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    JobsJam
                  </span>
                  <p className="text-xs text-gray-500">Smart Job Discovery</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {nextScrapeTime && (
                <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg">
                  <Timer className="h-4 w-4" />
                  <span>Next scan: {nextScrapeTime.toLocaleTimeString()}</span>
                </div>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={testTelegram}
                className="hover:bg-blue-50 hover:border-blue-300"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Test Telegram
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={startScraping}
                disabled={scrapingStatus.isRunning}
                className="hover:bg-green-50 hover:border-green-300"
              >
                {scrapingStatus.isRunning ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Search className="h-4 w-4 mr-2" />
                )}
                {scrapingStatus.isRunning ? "Scanning..." : "Scan Now"}
              </Button>
              <Dialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Alert
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Create New Job Alert</DialogTitle>
                    <DialogDescription>Set up a new alert to monitor for specific job opportunities.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="alert-name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="alert-name"
                        placeholder="e.g., UX Designer Jobs"
                        className="col-span-3"
                        value={newAlert.name}
                        onChange={(e) => setNewAlert({ ...newAlert, name: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="keywords" className="text-right">
                        Keywords
                      </Label>
                      <Input
                        id="keywords"
                        placeholder="e.g., UX Designer, UI Designer"
                        className="col-span-3"
                        value={newAlert.keywords}
                        onChange={(e) => setNewAlert({ ...newAlert, keywords: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Country</Label>
                      <div className="col-span-3">
                        <Select
                          value={newAlert.country}
                          onValueChange={(value) => setNewAlert({ ...newAlert, country: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Canada">Canada</SelectItem>
                            <SelectItem value="USA">USA</SelectItem>
                            <SelectItem value="Both">Both</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleCreateAlert}>
                      Create Alert
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                    <Settings className="h-5 w-5 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Notifications</DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">JobsJam</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover your dream job with AI-powered search across 90+ top companies in Canada and the USA. Find design,
            software development, and management roles with automated hourly scans.
          </p>
        </div>

        {/* Job Type Selector */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Select Job Type to Scan</h2>
            <RadioGroup
              value={selectedJobType}
              onValueChange={setSelectedJobType}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="design" id="design" />
                <Label htmlFor="design" className="flex items-center cursor-pointer">
                  <div className="p-1.5 bg-blue-100 rounded-md mr-2">
                    <Sparkles className="h-4 w-4 text-blue-600" />
                  </div>
                  Design Roles
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="software" id="software" />
                <Label htmlFor="software" className="flex items-center cursor-pointer">
                  <div className="p-1.5 bg-green-100 rounded-md mr-2">
                    <Code className="h-4 w-4 text-green-600" />
                  </div>
                  Software Developer Roles
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="management" id="management" />
                <Label htmlFor="management" className="flex items-center cursor-pointer">
                  <div className="p-1.5 bg-orange-100 rounded-md mr-2">
                    <UserPlus className="h-4 w-4 text-orange-600" />
                  </div>
                  Management & Lead Roles
                </Label>
              </div>
            </RadioGroup>
            <div className="mt-4 flex justify-end">
              <Button
                onClick={startScraping}
                disabled={scrapingStatus.isRunning}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {scrapingStatus.isRunning ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Search className="h-4 w-4 mr-2" />
                )}
                {scrapingStatus.isRunning ? "Scanning..." : "Scan Selected Job Type"}
              </Button>
            </div>
          </div>
        </div>

        {/* Scraping Progress */}
        {scrapingStatus.isRunning && (
          <Alert className="mb-6 bg-blue-50 border-blue-200">
            <RefreshCw className="h-4 w-4 animate-spin text-blue-600" />
            <AlertDescription>
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span>Scanning job opportunities with Playwright...</span>
                  <span className="text-blue-600">
                    {scrapingStatus.completedSites}/{scrapingStatus.totalSites} sites
                  </span>
                </div>
                <Progress value={scrapingStatus.progress} className="w-full h-2" />
                <p className="text-xs text-gray-600">Currently checking: {scrapingStatus.currentSite}</p>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-100">Active Alerts</p>
                  <p className="text-3xl font-bold">{stats.activeAlerts}</p>
                </div>
                <div className="h-12 w-12 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center">
                  <Bell className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-100">Total Matches</p>
                  <p className="text-3xl font-bold">{stats.totalMatches}</p>
                </div>
                <div className="h-12 w-12 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center">
                  <Briefcase className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-100">New Matches</p>
                  <p className="text-3xl font-bold">{stats.newMatches}</p>
                </div>
                <div className="h-12 w-12 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center">
                  <Sparkles className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-100">Data Sources</p>
                  <p className="text-3xl font-bold">90+</p>
                  <p className="text-xs text-purple-200">Websites + APIs</p>
                </div>
                <div className="h-12 w-12 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center">
                  <Globe className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different sections */}
        <Tabs defaultValue="jobs" className="mb-8">
          <TabsList className="grid w-full md:w-[600px] grid-cols-4 bg-white shadow-sm">
            <TabsTrigger
              value="jobs"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white"
            >
              <Briefcase className="h-4 w-4 mr-2" />
              Jobs
            </TabsTrigger>
            <TabsTrigger
              value="alerts"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white"
            >
              <Bell className="h-4 w-4 mr-2" />
              Alerts
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="logs"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white"
            >
              <Activity className="h-4 w-4 mr-2" />
              Logs
            </TabsTrigger>
          </TabsList>

          {/* Jobs Tab */}
          <TabsContent value="jobs" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Filters Card */}
              <div className="lg:col-span-1">
                <Card className="shadow-lg sticky top-24">
                  <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <CardTitle className="flex items-center space-x-2">
                      <Filter className="h-5 w-5 text-blue-600" />
                      <span>Filter Jobs</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-6">
                    <div className="space-y-2">
                      <Label htmlFor="country-filter" className="text-sm font-medium">
                        Country
                      </Label>
                      <Select value={countryFilter} onValueChange={setCountryFilter}>
                        <SelectTrigger id="country-filter" className="w-full">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="all">All Countries</SelectItem>
                            <SelectItem value="Canada">Canada</SelectItem>
                            <SelectItem value="USA">USA</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location-filter" className="text-sm font-medium">
                        Location
                      </Label>
                      <Select value={locationFilter} onValueChange={setLocationFilter}>
                        <SelectTrigger id="location-filter" className="w-full">
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="all">All Locations</SelectItem>
                            {countryFilter === "all" || countryFilter === "Canada" ? (
                              <>
                                <SelectLabel>Canada</SelectLabel>
                                <SelectItem value="Toronto">Toronto</SelectItem>
                                <SelectItem value="Vancouver">Vancouver</SelectItem>
                                <SelectItem value="Montreal">Montreal</SelectItem>
                                <SelectItem value="Calgary">Calgary</SelectItem>
                                <SelectItem value="Ottawa">Ottawa</SelectItem>
                              </>
                            ) : null}
                            {countryFilter === "all" || countryFilter === "USA" ? (
                              <>
                                <SelectLabel>USA</SelectLabel>
                                <SelectItem value="New York">New York</SelectItem>
                                <SelectItem value="San Francisco">San Francisco</SelectItem>
                                <SelectItem value="Seattle">Seattle</SelectItem>
                                <SelectItem value="Austin">Austin</SelectItem>
                                <SelectItem value="Boston">Boston</SelectItem>
                              </>
                            ) : null}
                            <SelectItem value="Remote">Remote</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="role-filter" className="text-sm font-medium">
                        Role Type
                      </Label>
                      <Select value={roleFilter} onValueChange={setRoleFilter}>
                        <SelectTrigger id="role-filter" className="w-full">
                          <SelectValue placeholder="Select role type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Roles</SelectItem>
                          <SelectItem value="design">Design Roles</SelectItem>
                          <SelectItem value="software">Software Developer Roles</SelectItem>
                          <SelectItem value="management">Management & Lead Roles</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="keyword-filter" className="text-sm font-medium">
                        Search
                      </Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="keyword-filter"
                          placeholder="Search jobs..."
                          value={keywordFilter}
                          onChange={(e) => setKeywordFilter(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    {(locationFilter !== "all" || countryFilter !== "all" || keywordFilter || roleFilter !== "all") && (
                      <Button variant="outline" size="sm" onClick={clearFilters} className="w-full">
                        <X className="h-4 w-4 mr-2" />
                        Clear Filters
                      </Button>
                    )}

                    <Separator className="my-4" />

                    <div>
                      <h4 className="text-sm font-medium mb-3">Quick Stats</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Total Jobs</span>
                          <span className="font-medium">{jobMatches.length}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Filtered</span>
                          <span className="font-medium">{filteredJobs.length}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Canada Jobs</span>
                          <span className="font-medium">
                            {jobMatches.filter((job) => job.country === "Canada").length}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">USA Jobs</span>
                          <span className="font-medium">
                            {jobMatches.filter((job) => job.country === "USA").length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={startScraping}
                      disabled={scrapingStatus.isRunning}
                    >
                      {scrapingStatus.isRunning ? (
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Search className="h-4 w-4 mr-2" />
                      )}
                      {scrapingStatus.isRunning ? "Scanning..." : "Scan Now"}
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              {/* Job Matches Card */}
              <div className="lg:col-span-3">
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <Briefcase className="h-5 w-5 text-blue-600" />
                          <span>All Available Jobs</span>
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {filteredJobs.length} jobs found •
                          {countryFilter === "all" ? " All countries" : countryFilter === "Canada" ? " Canada" : " USA"}{" "}
                          •{locationFilter === "all" ? " All locations" : ` ${locationFilter}`} •
                          {roleFilter === "all"
                            ? " All roles"
                            : roleFilter === "design"
                              ? " Design roles"
                              : roleFilter === "software"
                                ? " Software roles"
                                : " Management roles"}
                        </CardDescription>
                      </div>
                      <Badge
                        variant="secondary"
                        className={`cursor-pointer ${autoRefreshEnabled ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}
                        onClick={toggleAutoRefresh}
                      >
                        Auto-refresh: {autoRefreshEnabled ? "ON" : "OFF"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    {filteredJobs.length === 0 ? (
                      <div className="text-center py-16">
                        <div className="h-20 w-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Briefcase className="h-10 w-10 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                        <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                          {jobMatches.length === 0
                            ? "Start scanning to discover job opportunities"
                            : "Try adjusting your filters to see more results"}
                        </p>
                        {jobMatches.length === 0 && (
                          <Button onClick={startScraping} disabled={scrapingStatus.isRunning}>
                            {scrapingStatus.isRunning ? "Scanning..." : "Start Scanning"}
                          </Button>
                        )}
                      </div>
                    ) : (
                      <ScrollArea className="h-[700px]">
                        <div className="p-6 space-y-4">
                          {filteredJobs.map((match) => (
                            <div
                              key={match.id}
                              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all hover:border-blue-200 group"
                            >
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <h4 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                                    {match.position || match.keywords[0]}
                                  </h4>
                                  <p className="text-gray-600 flex items-center mt-1">
                                    <Users className="h-4 w-4 mr-1" />
                                    {match.company}
                                  </p>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                  <Badge variant="secondary" className="text-xs">
                                    {new Date(match.timestamp).toLocaleDateString()}
                                  </Badge>
                                  <Badge
                                    variant="outline"
                                    className={`text-xs ${match.country === "Canada" ? "bg-blue-50 text-blue-700" : "bg-red-50 text-red-700"}`}
                                  >
                                    <Flag className="h-3 w-3 mr-1" />
                                    {match.country}
                                  </Badge>
                                </div>
                              </div>

                              {/* Role Type Badge */}
                              <div className="mb-3">
                                {match.position?.toLowerCase().includes("software") ||
                                match.position?.toLowerCase().includes("developer") ||
                                match.position?.toLowerCase().includes("engineer") ? (
                                  <Badge className="bg-green-100 text-green-700 border-0">
                                    <Code className="h-3 w-3 mr-1" />
                                    Software Development
                                  </Badge>
                                ) : match.position?.toLowerCase().includes("manager") ||
                                  match.position?.toLowerCase().includes("lead") ||
                                  match.position?.toLowerCase().includes("director") ? (
                                  <Badge className="bg-orange-100 text-orange-700 border-0">
                                    <UserPlus className="h-3 w-3 mr-1" />
                                    Management
                                  </Badge>
                                ) : match.position?.toLowerCase().includes("design") ||
                                  match.position?.toLowerCase().includes("ux") ||
                                  match.position?.toLowerCase().includes("ui") ? (
                                  <Badge className="bg-blue-100 text-blue-700 border-0">
                                    <Sparkles className="h-3 w-3 mr-1" />
                                    Design
                                  </Badge>
                                ) : (
                                  <Badge className="bg-purple-100 text-purple-700 border-0">
                                    <Briefcase className="h-3 w-3 mr-1" />
                                    Other Role
                                  </Badge>
                                )}
                              </div>

                              {/* Job Details */}
                              {match.jobDetails && (
                                <div className="flex flex-wrap gap-4 mb-4 text-sm">
                                  <div className="flex items-center text-gray-600">
                                    <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                                    {match.jobDetails.location || "Not specified"}
                                  </div>
                                  <div className="flex items-center text-gray-600">
                                    <Clock className="h-4 w-4 mr-1 text-gray-400" />
                                    {match.jobDetails.type || "Not specified"}
                                  </div>
                                  <div className="flex items-center text-gray-600">
                                    <TrendingUp className="h-4 w-4 mr-1 text-gray-400" />
                                    {match.jobDetails.salary || "Salary not specified"}
                                  </div>
                                </div>
                              )}

                              {/* Scraping Details */}
                              {match.scrapingDetails && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                  {match.scrapingDetails.searchInteraction && (
                                    <Badge variant="outline" className="text-xs bg-blue-50 border-blue-200">
                                      <Keyboard className="h-3 w-3 mr-1" />
                                      Searched "
                                      {selectedJobType === "design"
                                        ? "designer"
                                        : selectedJobType === "software"
                                          ? "developer"
                                          : "manager"}
                                      "
                                    </Badge>
                                  )}
                                  {match.scrapingDetails.buttonInteraction && (
                                    <Badge variant="outline" className="text-xs bg-green-50 border-green-200">
                                      <MousePointerClick className="h-3 w-3 mr-1" />
                                      Clicked "View Jobs"
                                    </Badge>
                                  )}
                                </div>
                              )}

                              <div className="flex flex-wrap gap-2 mb-4">
                                {match.keywords.map((keyword, idx) => (
                                  <Badge
                                    key={idx}
                                    variant="secondary"
                                    className="text-xs bg-purple-100 text-purple-700"
                                  >
                                    {keyword}
                                  </Badge>
                                ))}
                              </div>

                              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                <p className="text-sm text-gray-500 truncate max-w-md">{match.url}</p>
                                <Button
                                  size="sm"
                                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                                  onClick={() => window.open(match.apply_url || match.url, "_blank")}
                                >
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  Apply Now
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Alerts Tab */}
          <TabsContent value="alerts" className="mt-6">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-5 w-5 text-blue-600" />
                    <span>My Job Alerts</span>
                  </CardTitle>
                  <Dialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        New Alert
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Create New Job Alert</DialogTitle>
                        <DialogDescription>
                          Set up a new alert to monitor for specific job opportunities.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="alert-name-2" className="text-right">
                            Name
                          </Label>
                          <Input
                            id="alert-name-2"
                            placeholder="e.g., UX Designer Jobs"
                            className="col-span-3"
                            value={newAlert.name}
                            onChange={(e) => setNewAlert({ ...newAlert, name: e.target.value })}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="keywords-2" className="text-right">
                            Keywords
                          </Label>
                          <Input
                            id="keywords-2"
                            placeholder="e.g., UX Designer, UI Designer"
                            className="col-span-3"
                            value={newAlert.keywords}
                            onChange={(e) => setNewAlert({ ...newAlert, keywords: e.target.value })}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">Country</Label>
                          <div className="col-span-3">
                            <Select
                              value={newAlert.country}
                              onValueChange={(value) => setNewAlert({ ...newAlert, country: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select country" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Canada">Canada</SelectItem>
                                <SelectItem value="USA">USA</SelectItem>
                                <SelectItem value="Both">Both</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" onClick={handleCreateAlert}>
                          Create Alert
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {jobAlerts.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="h-20 w-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Bell className="h-10 w-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No job alerts yet</h3>
                    <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                      Create your first alert to get notified about matching job opportunities
                    </p>
                    <Button
                      onClick={() => setIsAlertDialogOpen(true)}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Alert
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {jobAlerts.map((alert) => (
                      <div
                        key={alert.id}
                        className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all hover:border-blue-200"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center">
                            <h4 className="font-semibold text-lg text-gray-900">{alert.name}</h4>
                            {alert.isActive && (
                              <Badge variant="outline" className="ml-3 bg-green-50 text-green-700 border-green-200">
                                Active
                              </Badge>
                            )}
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {new Date(alert.createdAt).toLocaleDateString()}
                          </Badge>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-start">
                            <Tag className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
                            <div className="flex flex-wrap gap-2">
                              {alert.keywords.map((keyword, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {keyword}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Flag className="h-4 w-4 mr-2 text-gray-400" />
                            {alert.country}
                          </div>
                        </div>

                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Jobs by Country */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <CardTitle className="flex items-center space-x-2">
                    <Flag className="h-5 w-5 text-blue-600" />
                    <span>Jobs by Country</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {jobMatches.length > 0 ? (
                    <Doughnut data={getCountryChartData()} options={{ maintainAspectRatio: true }} />
                  ) : (
                    <div className="text-center py-8 text-gray-500">No data available yet</div>
                  )}
                </CardContent>
              </Card>

              {/* Jobs by Role */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <CardTitle className="flex items-center space-x-2">
                    <Laptop className="h-5 w-5 text-blue-600" />
                    <span>Jobs by Role Type</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {jobMatches.length > 0 ? (
                    <Pie data={getRoleChartData()} options={{ maintainAspectRatio: true }} />
                  ) : (
                    <div className="text-center py-8 text-gray-500">No data available yet</div>
                  )}
                </CardContent>
              </Card>

              {/* Jobs by Location */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <span>Top Locations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {jobMatches.length > 0 ? (
                    <Bar data={getLocationChartData()} options={{ maintainAspectRatio: true }} />
                  ) : (
                    <div className="text-center py-8 text-gray-500">No data available yet</div>
                  )}
                </CardContent>
              </Card>

              {/* Jobs by Company */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <CardTitle className="flex items-center space-x-2">
                    <Building className="h-5 w-5 text-blue-600" />
                    <span>Top 10 Companies</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {jobMatches.length > 0 ? (
                    <Bar data={getCompanyChartData()} options={{ maintainAspectRatio: true }} />
                  ) : (
                    <div className="text-center py-8 text-gray-500">No data available yet</div>
                  )}
                </CardContent>
              </Card>

              {/* Jobs Trend */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <span>Jobs Found Over Time</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {scrapingSessions.length > 0 ? (
                    <Line data={getTrendChartData()} options={{ maintainAspectRatio: true }} />
                  ) : (
                    <div className="text-center py-8 text-gray-500">No data available yet</div>
                  )}
                </CardContent>
              </Card>

              {/* Keywords Distribution */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <CardTitle className="flex items-center space-x-2">
                    <Tag className="h-5 w-5 text-blue-600" />
                    <span>Popular Keywords</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {jobMatches.length > 0 ? (
                    <Doughnut data={getKeywordChartData()} options={{ maintainAspectRatio: true }} />
                  ) : (
                    <div className="text-center py-8 text-gray-500">No data available yet</div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Summary Stats */}
            <Card className="mt-6 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  <span>Analytics Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{scrapingSessions.length}</div>
                    <div className="text-sm text-gray-600 mt-1">Total Scans</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      {scrapingSessions.reduce((acc, session) => acc + session.totalJobs, 0)}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Jobs Found</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">
                      {Object.keys(jobMatches.reduce((acc, job) => ({ ...acc, [job.company]: true }), {})).length}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Companies</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">
                      {jobMatches.filter((job) => job.country === "Canada").length}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Canada Jobs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600">
                      {jobMatches.filter((job) => job.country === "USA").length}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">USA Jobs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-600">
                      {scrapingSessions.length > 0
                        ? Math.round(
                            scrapingSessions.reduce((acc, session) => acc + session.totalJobs, 0) /
                              scrapingSessions.length,
                          )
                        : 0}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Avg Jobs/Scan</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Logs Tab */}
          <TabsContent value="logs" className="mt-6">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-blue-600" />
                  <span>Activity Logs</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[600px]">
                  <div className="p-6 space-y-2">
                    {logs.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">No activity yet</p>
                    ) : (
                      logs.map((log, idx) => (
                        <div
                          key={idx}
                          className="text-sm font-mono bg-gray-50 p-3 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                        >
                          {log}
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Advanced Features */}
        <Card className="shadow-lg bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-blue-600" />
              <span>Advanced Job Scraping with Playwright Integration</span>
            </CardTitle>
            <CardDescription>Using your exact Playwright scraping logic across 90+ websites</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/80 backdrop-blur rounded-xl p-6 shadow-sm">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Code className="h-5 w-5 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Software Developer Jobs</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Find software developer, engineer, and programming roles across top tech companies in both Canada and
                  the USA.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur rounded-xl p-6 shadow-sm">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <UserPlus className="h-5 w-5 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Management & Lead Roles</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Discover management positions, team lead roles, and director opportunities with our specialized search
                  algorithms.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur rounded-xl p-6 shadow-sm">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Flag className="h-5 w-5 text-orange-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">USA & Canada Coverage</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Comprehensive job search across both Canadian and American job markets with location-specific
                  filtering.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

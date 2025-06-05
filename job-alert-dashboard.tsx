import { Bell, Briefcase, Mail, Plus, Search, Settings, Zap, Globe, Clock, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function JobAlertDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Briefcase className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">Job Alert Bot</span>
              </div>
              <nav className="hidden md:flex space-x-8">
                <a href="#" className="text-blue-600 font-medium">
                  Dashboard
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-700">
                  Create Alert
                </a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Test Telegram
              </Button>
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Run Scraper
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Create Alert
              </Button>
              <div className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600">abhaysharma2020</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor your job alerts and track new opportunities</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Alerts</p>
                  <p className="text-3xl font-bold text-gray-900">0</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Bell className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Matches</p>
                  <p className="text-3xl font-bold text-gray-900">0</p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">New Matches</p>
                  <p className="text-3xl font-bold text-gray-900">0</p>
                </div>
                <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Mail className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Your Job Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Your Job Alerts</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No job alerts yet</h3>
                <p className="text-gray-500 mb-6">Create your first alert to start monitoring job opportunities</p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Alert
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Job Matches */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5" />
                <span>Recent Job Matches</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No job matches yet</h3>
                <p className="text-gray-500">Create job alerts to start receiving matches!</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Advanced Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-blue-600" />
              <span>Advanced Job Scraping with Telegram Notifications</span>
            </CardTitle>
            <CardDescription>Enhance your job search with our premium features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  <h4 className="font-semibold text-gray-900">Instant Notifications</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Get real-time Telegram messages when new jobs are found or when jobs match your alerts.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-green-600" />
                  <h4 className="font-semibold text-gray-900">Advanced Scraping</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Our enhanced scraper monitors 20+ top companies including Google, Microsoft, Shopify, and more.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-orange-600" />
                  <h4 className="font-semibold text-gray-900">Automatic Scheduling</h4>
                </div>
                <p className="text-sm text-gray-600">
                  The advanced scraper runs every 4 hours automatically, plus you can trigger it manually anytime.
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">How to use:</h4>
              <ol className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start space-x-2">
                  <Badge variant="outline" className="mt-0.5">
                    1
                  </Badge>
                  <span>Click "Test Telegram" to verify your bot connection</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Badge variant="outline" className="mt-0.5">
                    2
                  </Badge>
                  <span>Click "Run Advanced Scraper" to start finding jobs immediately</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Badge variant="outline" className="mt-0.5">
                    3
                  </Badge>
                  <span>Create job alerts with your preferred keywords</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Badge variant="outline" className="mt-0.5">
                    4
                  </Badge>
                  <span>Receive instant Telegram notifications for matches!</span>
                </li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

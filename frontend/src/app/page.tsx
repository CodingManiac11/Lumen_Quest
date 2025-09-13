import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { ArrowRight, Shield, Users, Zap, BarChart3 } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-8">
            <div className="flex justify-center">
              <div className="h-16 w-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <Zap className="h-9 w-9 text-white" />
              </div>
            </div>

            <div className="space-y-4">
              <Badge variant="primary" className="mb-4">
                 Welcome to SubsPro
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight">
                Subscription Management
                <span className="block text-primary-600">Made Simple</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Streamline your subscription business with our powerful platform. 
                Manage customers, track billing, and analyze growth with ease.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth">
                <Button size="lg" icon={<ArrowRight className="h-5 w-5" />}>
                  Get Started
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="secondary" size="lg">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Access Level
            </h2>
            <p className="text-xl text-gray-600">
              Sign in as a customer or administrator to access your dashboard
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-2 border-gray-200 hover:border-primary-300 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl">Customer Portal</CardTitle>
                <CardDescription className="text-base">
                  Access your subscription details, billing history, and account settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Link href="/login" className="block">
                    <Button className="w-full" size="lg">
                      Customer Login
                    </Button>
                  </Link>
                  <Link href="/signup" className="block">
                    <Button variant="secondary" className="w-full">
                      Create Customer Account
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200 hover:border-primary-300 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary-600" />
                </div>
                <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
                <CardDescription className="text-base">
                  Manage customers, subscriptions, billing, and system analytics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Link href="/login" className="block">
                    <Button className="w-full" size="lg">
                      Admin Login
                    </Button>
                  </Link>
                  <Link href="/signup" className="block">
                    <Button variant="secondary" className="w-full">
                      Create Admin Account
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

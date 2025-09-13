'use client'

import { Bell, Search, User, LogOut, Menu, Plus, Settings } from 'lucide-react'
import { useAuthStore } from '@/store/auth-store'
import { useUIStore } from '@/store/ui-store'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

export function Header() {
  const { user, logout } = useAuthStore()
  const { notifications, toggleSidebar } = useUIStore()

  const unreadCount = notifications.length

  return (
    <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="h-full flex items-center justify-between px-6">
        <div className="flex items-center space-x-4 flex-1">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex-1 max-w-lg">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search customers, subscriptions..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white transition-all duration-200 text-sm placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="hidden lg:block">
            <Breadcrumb />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="secondary" size="sm" icon={<Plus className="h-4 w-4" />}>
              Add Customer
            </Button>
          </div>

          <div className="relative">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <div className="absolute -top-1 -right-1">
                  <Badge variant="error" size="sm">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </Badge>
                </div>
              )}
            </button>
          </div>

          {user && (
            <div className="flex items-center space-x-3 pl-3 border-l border-gray-200">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
              
              <div className="relative group">
                <button className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center hover:bg-primary-200 transition-colors duration-200">
                  <span className="text-sm font-medium text-primary-700">
                    {user.name?.charAt(0).toUpperCase()}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

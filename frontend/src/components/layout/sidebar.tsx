'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/store/ui-store'
import { useAuthStore } from '@/store/auth-store'
import { Badge } from '@/components/ui/Badge'
import {
  LayoutDashboard,
  Users,
  CreditCard,
  FileText,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Home,
  Zap,
} from 'lucide-react'

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    current: false,
  },
  {
    name: 'Customers',
    href: '/customers',
    icon: Users,
    current: false,
    badge: '24',
  },
  {
    name: 'Subscriptions',
    href: '/subscribe',
    icon: CreditCard,
    current: false,
    badge: 'New',
    badgeVariant: 'primary' as const,
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
    current: false,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    current: false,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const { sidebarOpen, toggleSidebar } = useUIStore()
  const { user } = useAuthStore()

  return (
    <>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed left-0 top-0 z-50 h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out',
          'flex flex-col',
          sidebarOpen 
            ? 'w-64 translate-x-0' 
            : 'w-64 -translate-x-full lg:w-16 lg:translate-x-0'
        )}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 bg-gray-50/80">
          <div className={cn('flex items-center space-x-3', !sidebarOpen && 'lg:justify-center lg:space-x-0')}>
            <div className="h-8 w-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="text-lg font-semibold text-gray-900">SubsPro</h1>
                <p className="text-xs text-gray-500 -mt-0.5">Management</p>
              </div>
            )}
          </div>
          
          {/* Toggle button - only show on large screens when expanded */}
          <button
            onClick={toggleSidebar}
            className={cn(
              'hidden lg:flex p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors',
              !sidebarOpen && 'lg:hidden'
            )}
          >
            {sidebarOpen ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
            const Icon = item.icon

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200',
                  isActive
                    ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                  !sidebarOpen && 'lg:justify-center lg:px-2'
                )}
              >
                <Icon
                  className={cn(
                    'h-5 w-5 transition-colors',
                    isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-600',
                    sidebarOpen ? 'mr-3' : 'lg:mr-0'
                  )}
                />
                {sidebarOpen && (
                  <>
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <Badge 
                        variant={item.badgeVariant || 'neutral'} 
                        size="sm"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
                
                {/* Tooltip for collapsed state */}
                {!sidebarOpen && (
                  <div className="hidden lg:group-hover:block absolute left-16 ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap z-50">
                    {item.name}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 border-4 border-transparent border-r-gray-900"></div>
                  </div>
                )}
              </Link>
            )
          })}
        </nav>

        {/* User section */}
        {user && (
          <div className="border-t border-gray-200 p-4">
            <div className={cn(
              'flex items-center space-x-3',
              !sidebarOpen && 'lg:justify-center lg:space-x-0'
            )}>
              <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary-700">
                  {user.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              {sidebarOpen && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user.email}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
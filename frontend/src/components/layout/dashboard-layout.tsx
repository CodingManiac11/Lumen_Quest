'use client'

import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Sidebar } from './sidebar'
import { Header } from './header'
import { useUIStore } from '@/store/ui-store'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname() || '' // fallback to empty string
  const { sidebarOpen } = useUIStore()

  // Don't show layout for auth pages
  const isAuthPage =
    pathname.startsWith('/auth') ||
    pathname === '/login' ||
    pathname === '/register'

  if (isAuthPage) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div
        className={cn(
          'transition-all duration-300',
          'lg:ml-16', // Default margin for large screens when collapsed
          sidebarOpen ? 'lg:ml-64' : '', // Expanded margin when open
          'ml-0' // No margin on mobile - sidebar overlays
        )}
      >
        <Header />
        <main className="p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

  

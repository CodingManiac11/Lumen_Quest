'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown } from 'lucide-react'

export interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  value: string | number
  change?: {
    value: number
    type: 'increase' | 'decrease'
    period?: string
  }
  icon?: React.ReactNode
  loading?: boolean
}

const MetricCard = forwardRef<HTMLDivElement, MetricCardProps>(
  ({ className, title, value, change, icon, loading = false, ...props }, ref) => {
    if (loading) {
      return (
        <div
          ref={ref}
          className={cn(
            'bg-white rounded-xl p-6 border border-gray-200 shadow-sm',
            className
          )}
          {...props}
        >
          <div className="animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-8 w-8 bg-gray-200 rounded"></div>
            </div>
            <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
          </div>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          'bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200',
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          {icon && (
            <div className="h-8 w-8 text-gray-400">
              {icon}
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <p className="text-2xl font-semibold text-gray-900">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          
          {change && (
            <div className="flex items-center space-x-1">
              {change.type === 'increase' ? (
                <TrendingUp className="h-4 w-4 text-success-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-error-600" />
              )}
              <span
                className={cn(
                  'text-sm font-medium',
                  change.type === 'increase' ? 'text-success-600' : 'text-error-600'
                )}
              >
                {change.value > 0 ? '+' : ''}{change.value}%
              </span>
              {change.period && (
                <span className="text-sm text-gray-500">
                  {change.period}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
)

MetricCard.displayName = 'MetricCard'

export { MetricCard }
"use client"

import * as React from "react"
import * as Recharts from "recharts"

import { cn } from "@/lib/utils"

// Context for sharing chart configuration and state
const ChartContext = React.createContext<{
  config: Record<string, { label: React.ReactNode; color?: string }>
} | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChart must be used within a ChartContainer")
  }
  return context
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: Record<string, { label: React.ReactNode; color?: string }>
    children: React.ReactNode
  }
>(({ className, config, children, ...props }, ref) => {
  return (
    <ChartContext.Provider value={{ config }}>
      <div
        ref={ref}
        className={cn("flex flex-col gap-2", className)}
        {...props}
      >
        {children}
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = Recharts.Tooltip

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    active?: boolean
    payload?: any[]
    labelKey?: string
    indicator?: "line" | "dot" | "dashed"
    hideLabel?: boolean
  }
>(({ className, active, payload, labelKey, indicator = "dot", hideLabel = false, ...props }, ref) => {
  const { config } = useChart()

  if (!active || !payload || !payload.length) {
    return null
  }

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border border-border bg-background px-3 py-1.5 text-xs shadow-md dark:border-border",
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-1.5">
        {payload.map((item, index) => {
          const key = labelKey || item.dataKey || item.name
          const configItem = config[key]
          const color = item.color || configItem?.color

          return (
            <div key={index} className="flex items-center gap-1.5">
              {indicator === "dot" && (
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: color }}
                />
              )}
              <span className="text-muted-foreground">
                {configItem?.label || item.name}:
              </span>
              <span className="font-medium text-foreground">
                {item.value}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
})
ChartTooltipContent.displayName = "ChartTooltipContent"

export { ChartContainer, ChartTooltip, ChartTooltipContent }

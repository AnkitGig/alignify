
import React from "react";
import { Element, ChartVariant } from "@/types/wireframe";
import {
  Area,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "./ui/chart";

// Sample data for the chart
const sampleData = [
  { month: "Jan", dataset1: 30, dataset2: 10 },
  { month: "Feb", dataset1: 40, dataset2: 15 },
  { month: "Mar", dataset1: 20, dataset2: 25 },
  { month: "Apr", dataset1: 45, dataset2: 20 },
  { month: "May", dataset1: 35, dataset2: 30 },
  { month: "Jun", dataset1: 25, dataset2: 15 },
];

interface AreaChartDisplayProps {
  element: Element;
}

export const AreaChartDisplay: React.FC<AreaChartDisplayProps> = ({ element }) => {
  const properties = element.properties || {};
  const {
    chartTitle = "Title goes here",
    chartVariant = "basic-area" as ChartVariant,
    barColor = "#9b87f5",
    secondaryBarColor = "#D6BCFA",
    showLegend = true,
    showGridLines = true,
    showLabels = true,
    chartHeight = 200,
  } = properties;

  // Ensure chartVariant is treated as a ChartVariant type
  const variant = chartVariant as ChartVariant;
  
  // Determine what data to display based on chart variant
  const chartData = sampleData;
  
  return (
    <div className="flex flex-col h-full w-full bg-white overflow-hidden">
      <div className="p-2">
        <div className="text-sm font-medium">{chartTitle}</div>
        
        {variant === "kpi-area" && (
          <div className="flex items-center mb-2">
            <div className="flex items-center text-xs mr-3" style={{ color: barColor }}>
              <span className="mr-1">●</span> Metric 1
            </div>
            <div className="text-xs text-gray-700">
              1234 | 12% <span className="text-green-600">▲</span>
            </div>
          </div>
        )}

        {variant === "multi-area" && (
          <div className="flex items-center mb-2">
            <div className="flex items-center text-xs mr-3" style={{ color: barColor }}>
              <span className="mr-1">●</span> Dataset 1
            </div>
            <div className="flex items-center text-xs mr-3" style={{ color: secondaryBarColor }}>
              <span className="mr-1">●</span> Dataset 2
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 w-full min-h-[100px]" style={{ height: chartHeight ? `${chartHeight}px` : '200px' }}>
        <ChartContainer
          config={{
            dataset1: {
              label: "Dataset 1",
              theme: {
                light: barColor,
                dark: barColor,
              },
            },
            dataset2: {
              label: "Dataset 2",
              theme: {
                light: secondaryBarColor,
                dark: secondaryBarColor,
              },
            },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <RechartsAreaChart
              data={chartData}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              {showGridLines && <CartesianGrid strokeDasharray="3 3" />}
              <XAxis dataKey="month" />
              <YAxis />
              {showLabels && <Tooltip content={<ChartTooltipContent />} />}
              {showLegend && <Legend />}

              {variant === "stacked-area" ? (
                <>
                  <Area
                    type="monotone"
                    dataKey="dataset1"
                    stackId="1"
                    stroke={barColor}
                    fill={barColor}
                  />
                  <Area
                    type="monotone"
                    dataKey="dataset2"
                    stackId="1"
                    stroke={secondaryBarColor}
                    fill={secondaryBarColor}
                  />
                </>
              ) : (
                <>
                  <Area
                    type="monotone"
                    dataKey="dataset1"
                    stroke={barColor}
                    fill={barColor}
                    fillOpacity={0.6}
                  />
                  {variant === "multi-area" && (
                    <Area
                      type="monotone"
                      dataKey="dataset2"
                      stroke={secondaryBarColor}
                      fill={secondaryBarColor}
                      fillOpacity={0.6}
                    />
                  )}
                </>
              )}
            </RechartsAreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
};

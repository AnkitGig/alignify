
export interface GaugeRendererProps {
  value: number;
  min: number;
  max: number;
  target: number;
  showTarget: boolean;
  showNeedle: boolean;
  showLabels: boolean;
  units: string;
  primaryColor: string;
  secondaryColor: string;
  percentage: number;
  targetPercentage: number;
}

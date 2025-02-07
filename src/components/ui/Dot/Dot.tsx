import { DEFAULT_COLOR, DEFAULT_COLORS } from '@/constants/colors';

interface DotProps {
  color: string;
}

export default function Dot({ color }: DotProps) {
  const isDefaultColor = (color: string) => {
    return DEFAULT_COLORS.includes(color as DEFAULT_COLOR);
  };

  return (
    <svg width='8' height='8' viewBox='0 0 8 8' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='4' cy='4' r='4' fill={isDefaultColor(color) ? color : DEFAULT_COLORS[0]} />
    </svg>
  );
}

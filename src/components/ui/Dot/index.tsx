import { DEFAULT_COLOR } from '@/constants/colors';

interface DotProps {
  color: DEFAULT_COLOR;
}

export default function Dot({ color }: DotProps) {
  return (
    <svg width='8' height='8' viewBox='0 0 8 8' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='4' cy='4' r='4' fill={color} />
    </svg>
  );
}

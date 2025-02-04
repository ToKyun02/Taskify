interface DotProps {
  colorClass: 'green-30' | 'blue-20' | 'orange-20' | 'purple' | 'pink-20';
}

export default function Dot({ colorClass }: DotProps) {
  let className = '';
  switch (colorClass) {
    case 'green-30':
      className = 'text-green-30';
      break;
    case 'blue-20':
      className = 'text-blue-20';
      break;
    case 'orange-20':
      className = 'text-orange-20';
      break;
    case 'pink-20':
      className = 'text-pink-20';
      break;
    case 'purple':
      className = 'text-purple';
      break;
    default:
      className = 'text-gray-50';
  }

  return (
    <svg className={`fill-current ${className}`} width='8' height='8' viewBox='0 0 8 8' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='4' cy='4' r='4' fill='currentColor' />
    </svg>
  );
}

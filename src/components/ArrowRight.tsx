interface ArrowProps {
  disabled?: boolean;
}

export default function ArrowRight({ disabled = false }: ArrowProps) {
  const baseStyle = 'w-4 h-4 fill-current';
  const colorStyle = disabled ? 'text-gray-30 cursor-default' : 'text-gray-50 hover:text-gray-70 cursor-pointer';

  return (
    <svg className={`${baseStyle} ${colorStyle}`} width='10' height='16' viewBox='0 0 10 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M7.35901 7.99933L1.08176 1.72208C0.916163 1.55648 0.835496 1.35937 0.83976 1.13074C0.844038 0.902106 0.928975 0.704996 1.09457 0.539412C1.26017 0.373815 1.45728 0.291016 1.68591 0.291016C1.91453 0.291016 2.11164 0.373815 2.27724 0.539412L8.65705 6.93204C8.80769 7.08268 8.91934 7.25147 8.99199 7.43843C9.06463 7.62541 9.10095 7.81237 9.10095 7.99933C9.10095 8.18629 9.06463 8.37325 8.99199 8.56022C8.91934 8.74718 8.80769 8.91598 8.65705 9.06662L2.26443 15.4592C2.09883 15.6248 1.90385 15.7055 1.67949 15.7012C1.45514 15.697 1.26017 15.612 1.09457 15.4464C0.928975 15.2808 0.846176 15.0837 0.846176 14.8551C0.846176 14.6265 0.928975 14.4294 1.09457 14.2638L7.35901 7.99933Z'
        fill='currentColor'
      />
    </svg>
  );
}

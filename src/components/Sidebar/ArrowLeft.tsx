interface ArrowProps {
  disabled?: boolean;
}

export default function ArrowLeft({ disabled = false }: ArrowProps) {
  const baseStyle = 'w-4 h-4 fill-current';

  // disabled 여부에 따른 색상 및 hover
  // - 비활성화(disabled=true)일 땐 text-gray-30, 클릭 불가(cursor-default)
  // - 활성화(disabled=false)일 땐 text-gray-80, hover:text-gray-60, cursor-pointer
  const colorStyle = disabled ? 'text-gray-30 cursor-default' : 'text-gray-50 hover:text-gray-60 cursor-pointer';

  return (
    <svg className={`${baseStyle} ${colorStyle}`} width='10' height='16' viewBox='0 0 10 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M2.641 7.99933L8.91824 1.72208C9.08384 1.55648 9.16451 1.35937 9.16024 1.13074C9.15596 0.902106 9.07103 0.704996 8.90543 0.539412C8.73983 0.373815 8.54272 0.291016 8.31409 0.291016C8.08547 0.291016 7.88836 0.373815 7.72276 0.539412L1.34295 6.93204C1.19231 7.08268 1.08066 7.25147 1.00801 7.43843C0.93537 7.62541 0.899048 7.81237 0.899048 7.99933C0.899048 8.18629 0.93537 8.37325 1.00801 8.56022C1.08066 8.74718 1.19231 8.91598 1.34295 9.06662L7.73557 15.4592C7.90117 15.6248 8.09615 15.7055 8.32051 15.7012C8.54486 15.697 8.73983 15.612 8.90543 15.4464C9.07103 15.2808 9.15383 15.0837 9.15383 14.8551C9.15383 14.6265 9.07103 14.4294 8.90543 14.2638L2.641 7.99933Z'
        fill='currentColor'
      />
    </svg>
  );
}

import { UseFormRegisterReturn } from 'react-hook-form';

export default function Checkbox({ errorMessage, register }: { errorMessage?: string; register: UseFormRegisterReturn }) {
  return (
    <div className='flex flex-col gap-2'>
      <label className='flex items-center gap-2'>
        <input
          type='checkbox'
          {...register}
          className="h-5 w-5 cursor-pointer appearance-none rounded-[4px] border border-gray-30 bg-center bg-no-repeat checked:bg-violet-10 checked:bg-[url('/checked.svg')]"
        />
        <span className='text-gray-70'>이용약관에 동의합니다.</span>
      </label>
      {<span className='h-6 text-md text-red'>{errorMessage}</span>}
    </div>
  );
}

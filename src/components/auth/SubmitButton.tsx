interface SubmitButtonProps {
  isValid: boolean;
  text: string;
  isSubmitting: boolean;
}

function BouncingLoader() {
  return (
    <div className='flex h-[26px] items-center justify-center space-x-2'>
      <div className='h-2 w-2 animate-bounce rounded-full bg-violet-20'></div>
      <div className='h-2 w-2 animate-bounce rounded-full bg-violet-20 [animation-delay:0.2s]'></div>
      <div className='h-2 w-2 animate-bounce rounded-full bg-violet-20 [animation-delay:0.4s]'></div>
    </div>
  );
}

export default function SubmitButton({ isValid, text, isSubmitting }: SubmitButtonProps) {
  return (
    <button
      disabled={!isValid || isSubmitting}
      className={`rounded-lg ${isValid && !isSubmitting ? 'cursor-pointer bg-violet-20' : 'cursor-not-allowed bg-gray-40'} py-3 text-2lg font-medium text-white`}
    >
      {!isSubmitting ? text : <BouncingLoader />}
    </button>
  );
}

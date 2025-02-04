interface SubmitButtonProps {
  isValid: boolean;
  text: string;
}

export default function SubmitButton({ isValid, text }: SubmitButtonProps) {
  return (
    <button disabled={!isValid} className={`rounded-lg ${isValid ? 'cursor-pointer bg-violet-20' : 'cursor-not-allowed bg-gray-40'} py-3 text-2lg font-medium text-white`}>
      {text}
    </button>
  );
}

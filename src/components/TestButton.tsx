interface TestButtonProps {
  text: string;
  onClick?: () => void;
  variant?: 'filled' | 'outlined';
}

const TestButton = ({text, onClick, variant = 'filled'}: TestButtonProps) => {
  const baseStyle =
    'w-full h-[60px] text-center rounded-full font-bold text-2xl leading-[normal]';
  const filledStyle = 'bg-primary-pink text-white';
  const outlinedStyle = 'border border-primary-pink text-primary-pink';

  return (
    <button
      className={`${baseStyle} ${variant === 'filled' ? filledStyle : outlinedStyle}`}
      onClick={onClick}>
      {text}
    </button>
  );
};

export default TestButton;

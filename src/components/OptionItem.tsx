interface OptionItemProps {
  text: string;
  variant?: 'text-light' | 'text-bold';
  onClick?: () => void;
  isSelected?: boolean;
}

const OptionItem = ({
  text,
  variant = 'text-light',
  onClick,
  isSelected,
}: OptionItemProps) => {
  return (
    <div
      onClick={onClick}
      className={`
        w-[438px] h-[60px] flex justify-center items-center text-xl rounded-[50px] cursor-pointer
        transition-all duration-200 border-2 border-dashed border-primary-pink
        ${variant === 'text-light' ? 'font-normal' : 'font-semibold'}
        ${isSelected ? ' bg-pink-1 text-white' : ' bg-transparent text-black'}
      `}>
      {text}
    </div>
  );
};

export default OptionItem;

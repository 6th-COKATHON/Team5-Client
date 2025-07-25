interface OptionItemProps {
  text: string;
}

const OptionItem = ({text}: OptionItemProps) => {
  return (
    <div className='w-[438px] h-[60px] flex justify-center items-center text-xl font-semibold rounded-[50px] border-2 border-dashed border-pink-400 bg-transparent'>
      {text}
    </div>
  );
};

export default OptionItem;

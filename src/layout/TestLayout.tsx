import {Outlet} from 'react-router-dom';

const TestLayout = () => {
  return (
    <div className='w-full min-h-screen flex justify-center overflow-x-hidden'>
      <div
        className='max-w-[540px] shadow-2xl px-20 mx-auto'
        style={{
          background:
            'linear-gradient(0deg, #FFF 0%, #FFF 0.01%, var(--pink3, #FCC9E0) 100%)',
        }}>
        <Outlet />
      </div>
    </div>
  );
};

export default TestLayout;

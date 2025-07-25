import {Outlet} from 'react-router-dom';

const ChemistryLayout = () => {
  return (
    <div className='w-full min-h-screen flex justify-center overflow-x-hidden'>
      <div
        className='max-w-[540px] w-full shadow-2xl mx-auto'
        style={{
          backgroundImage:
            'linear-gradient(0deg, var(--pink3, #FCC9E0) 0%, #FFF 99.99%, #FFF 100%)',
        }}>
        <Outlet />
      </div>
    </div>
  );
};

export default ChemistryLayout;

import { Spin } from 'antd';

function Screen() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <Spin size='large' />
    </div>
  );
}

function Block() {
  return (
    <div className='flex justify-center'>
      <Spin size='large' />
    </div>
  );
}

export default { Screen, Block };

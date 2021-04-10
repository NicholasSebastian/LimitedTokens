import { FC, MouseEventHandler } from 'react';

interface IBlanketProps {
  onClick?: MouseEventHandler<HTMLDivElement>
}

const Blanket: FC<IBlanketProps> = ({ onClick }) => {
  return (
    <div onClick={onClick} 
      style={{
        background: '#000',
        opacity: 0.5,
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      }} />
  );
}

export default Blanket;
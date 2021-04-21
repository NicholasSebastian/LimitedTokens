import { FC, useState } from 'react';

import styles from '../../styles/components/overlay.module.scss';
import Login from './login';
import Signup from './signup';

interface IProps {
  open: boolean
  closeOverlay: () => void
}

interface IViewProps {
  open: boolean
  closeOverlay: () => void
  changeMode: () => void
}

const Overlay: FC<IProps> = props => {
  const { open, closeOverlay } = props;
  const [mode, setMode] = useState<boolean>(false);

  const view = mode ? (
    <Signup changeMode={() => setMode(false)} 
      open={open} closeOverlay={closeOverlay} />
  ) : (
    <Login changeMode={() => setMode(true)} 
      open={open} closeOverlay={closeOverlay} />
  );

  return (
    <div className={styles.blackout}
      style={{ display: open ? 'block' : 'none' }}>
      <div onClick={e => e.stopPropagation()}>
        <button onClick={closeOverlay}>X</button>
        {view}
      </div>
    </div>
  );
}

export type { IViewProps };
export default Overlay;
import { FC, ComponentType } from 'react';
import '../styles/globals.scss';

interface IAppProps {
  Component: ComponentType
  pageProps: object
}

const App: FC<IAppProps> = ({ Component, pageProps }) => {
  return (
    <Component {...pageProps} />
  );
}

export default App;

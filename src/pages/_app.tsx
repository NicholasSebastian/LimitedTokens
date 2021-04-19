import { FC, ComponentType } from 'react';
import { Provider } from 'next-auth/client';
import '../styles/Global.scss';

interface IAppProps {
  Component: ComponentType
  pageProps: any
}

const App: FC<IAppProps> = ({ Component, pageProps }) => {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;

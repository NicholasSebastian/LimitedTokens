import { FC, Fragment, useState } from 'react';
import Head from 'next/head';

import styles from '../styles/components/layout.module.scss';

import Header from './header';
import Footer from './footer';
import Overlay from './auth/overlay';

interface ILayoutProps {
  title?: string
  className?: string
}

const Layout: FC<ILayoutProps> = props => {
  const { title, children, className } = props;
  const [overlayOpen, setOverlayOpen] = useState<boolean>(false);

  const suffix = title && `: ${title}`;
  const seo = (
    <Head>
      <title>Limited Tokens{suffix}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no" />
      <meta name="theme-color" content="#000000" />
    </Head>
  );

  return (
    <Fragment>
      <div className={styles.container}>
        {seo}
        <Header loginOrRegister={() => setOverlayOpen(true)} />
        <main className={className}>
          {children}
        </main>
        <Footer />
      </div>
      <Overlay open={overlayOpen} closeOverlay={() => setOverlayOpen(false)} />
    </Fragment>
  );
}

export default Layout;
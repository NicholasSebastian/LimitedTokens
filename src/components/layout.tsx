import { FC } from 'react';
import Head from 'next/head';
import styles from '../styles/Layout.module.scss';

import Header from './header';
import Footer from './footer';

interface ILayoutProps {
  title?: string
  className?: string
}

const Layout: FC<ILayoutProps> = props => {
  const { title, className, children } = props;

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

  const classNames = className ? `${styles.main} ${className}` : styles.main;
  return (
    <div className={styles.container}>
      {seo}
      <Header />
      <main className={classNames}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
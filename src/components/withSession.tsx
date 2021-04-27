import { ComponentType, FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

function withSession<P extends object>(Component: ComponentType<P>): FC<P> {
  return (props: P) => {
    const router = useRouter();
    const [session, loading] = useSession();

    useEffect(() => {
      if (!loading && !session) {
        router.push('/404');
      }
    }, [loading]);

    return <Component {...props as P} />
  }
}

export default withSession;
import { FC } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

import Layout from '../../components/layout';

const Profile: FC = props => {
  const {} = props;
  return (
    <Layout>
      {/* here */}
    </Layout>
  );
}

export { getServerSideProps };
export default Profile;

const getServerSideProps: GetServerSideProps = async (context) => {
  const { profileid } = context.params;
  // here
  return { props: {} };
}
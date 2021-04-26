import { FC, useState } from 'react';
import { IPageProps } from '../../pages/profile/[profileid]/settings';

const Wallet: FC<IPageProps> = props => {
  const { data } = props;
  return (
    <div>Connect an external wallet</div>
  );
}

export default Wallet;
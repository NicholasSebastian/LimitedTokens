import { FC, useState } from 'react';
import { IPageProps } from '../../pages/profile/[profileid]/settings';

const Payment: FC<IPageProps> = props => {
  const { data } = props;
  return (
    <div>Payment Methods</div>
  );
}

export default Payment;
import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const Works: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <h1>Works</h1>
      {
        router.query.pid
      }
    </>
  );
};

export default Works;

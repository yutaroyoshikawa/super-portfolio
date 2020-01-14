import React from 'react';
import { NextPage } from 'next';
import { ErrorProps } from 'next/error';

const Error: NextPage<ErrorProps> = props => {
  return (
    <>
      <h1>
        {
          props.statusCode === 404
            ? "Not Found"
            : "Error"
        }
      </h1>
      <code>
        {props.statusCode}
      </code>
    </>
  );
};

Error.getInitialProps = props => {
  const statusCode = props.res ? props.res.statusCode : props.err ? props.err.statusCode : 404;
  return { statusCode };
};

export default Error;

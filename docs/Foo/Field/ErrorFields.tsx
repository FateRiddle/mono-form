import React from 'react';

const ErrorFields = ({ className, children }: any) => {
  if (!children.length) {
    return <div style={{ height: 22 }}></div>;
  }
  return (
    <ul className={`${className} red list pa0 ma0`}>
      {children.map((error: any, index: number) => (
        <li key={index}>{error}</li>
      ))}
    </ul>
  );
};

export default ErrorFields;

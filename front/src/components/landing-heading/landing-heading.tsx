import React from 'react';

// antd


// css
import './landing-heading.less';

interface ComponentProps {
  children: React.ReactNode;
  className?: string;
}

function LandingHeading(props: ComponentProps) {
  const { children } = props;
  const className = props.className ? props.className : '';

  return (
    <h2 className={["custom-heading", className].join(" ")}>{children}</h2>
  );
}

export default LandingHeading;

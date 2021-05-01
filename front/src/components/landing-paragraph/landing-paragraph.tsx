import React from 'react';

// antd


// css
import './landing-paragraph.less';

interface ComponentProps {
  children: React.ReactNode;
  className?: string;
}

function LandingParagraph(props: ComponentProps) {
  const { children } = props;
  const className = props.className ? props.className : '';

  return (
    <p className={["custom-paragraph", className].join(" ")}>{children}</p>
  );
}

export default LandingParagraph;

import React from 'react';

// css
import './errors.less';

// components

interface ComponentProps {
  errors?: { [key: string]: any };
  className?: string;


}

function Errors(props: ComponentProps) {

  const parseErrors = () => {
    const { errors } = props;

    if (!errors) {
      return;
    }

    for (const [key, value] of Object.entries(errors)) {
      return <span key={key} className="errors__elem">{value}</span>
    }
  }

  return (
    <div className={["errors", props.className].join(" ")}>
      {parseErrors()}
    </div>
  );
}

export default Errors;

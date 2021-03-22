import * as React from 'react';
import './Button.scss';

interface IButtonProps {
  disabled?: boolean;
  onClick?: any;
  children: string;
}

const Button: React.FunctionComponent<IButtonProps> = ({
  children,
  onClick,
  disabled,
}) => {
  return (
    <button
      className='button'
      disabled={disabled}
      onClick={() => onClick('summary')}
    >
      {children}
    </button>
  );
};

export default Button;

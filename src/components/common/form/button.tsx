import React from 'react';
import { useStyletron } from 'styletron-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  type?: 'primary' | 'secondary' | 'tertiary';
}

const Button: React.FC<ButtonProps> = ({ label, type = 'primary', ...props }) => {
  const [css] = useStyletron();
  return (
    <button
      {...props}
      className={css({
        backgroundColor:
          type === 'primary'
            ? 'var(--primary-color)'
            : type === 'secondary'
            ? 'var(--secondary-color)'
            : 'transparent',
        color: type === 'tertiary' ? 'var(--primary-color)' : 'white',
        textDecoration: type === 'tertiary' ? 'underline' : 'none',
        padding: type === 'tertiary' ? '0.5rem' : '0.5rem 1rem',
        borderRadius: '0.25rem',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1rem',
      })}
    >
      {label}
    </button>
  );
};

export default Button;
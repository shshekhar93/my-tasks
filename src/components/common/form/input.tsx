import React, { useMemo, useState } from 'react';
import { StyleObject, useStyletron } from 'styletron-react';
import { getIDFromProps } from './utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  labelAnimation?: boolean;
  multiline?: boolean;
}

const Input: React.FC<InputProps> = ({ label, labelAnimation = true, multiline = false, ...props }) => {
  const [css] = useStyletron();
  const id = useMemo(() => getIDFromProps(props), [props.id, props.name]);
  const [hasFocus, setHasFocus] = useState(false);

  const showLargeLabel = labelAnimation && (props.value ?? '')?.toString().length === 0 && !hasFocus;
  const Component = multiline ? 'textarea' : 'input';

  return (
    <div className={css({
      position: 'relative',
      border: `${hasFocus ? 2 : 1}px solid ${hasFocus ? 'var(--primary-color)' : 'var(--border-color)'}`,
      borderRadius: '0.25rem',
      padding: `${hasFocus ? 0 : 1}px`,
    })}
    >
      {label
        && (
          <label
            htmlFor={id}
            className={css({
              position: 'absolute',
              top: showLargeLabel ? '0.75rem' : '1px',
              left: hasFocus ? '1px' : '2px',
              right: !showLargeLabel ? '2px' : undefined,
              background: 'var(--background-primary)',
              color: 'var(--content-secondary)',
              padding: `0 0.5rem`,
              fontSize: showLargeLabel ? '1rem' : '0.8rem',
              fontWeight: 600,
              transition: 'font-size 0.1s linear, top 0.1s linear',
              transform: hasFocus ? 'translateY(-1px)' : undefined,
            })}
          >
            {label}
          </label>
        )}
      <Component
        {...props}
        id={id}
        placeholder=" "
        className={css({
          background: 'var(--background-primary)',
          color: 'var(--content-primary)',
          ...(props.style as StyleObject),
          padding: `1.2rem 0.5rem 0.3rem`,
          fontSize: '1rem',
          width: `calc(100% - ${props.type === 'date' ? 0 : 0}rem)`,
          height: !multiline ? '3rem' : '5rem',
          borderWidth: 0,
          outline: 'none',

          // Date field
          ...(props.type === 'date' && {
            '-webkit-appearance': 'none',
            'appearance': 'none',
            '::-webkit-date-and-time-value': {
              textAlign: 'left',
            },
            '::-webkit-calendar-picker-indicator': {
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              width: 'auto',
              height: 'auto',
              background: 'transparent',
              color: 'transparent',
              cursor: 'pointer',
            },
            ...(labelAnimation && !props.value && !hasFocus && {
              ':not(:focus)::-webkit-datetime-edit': {
                color: 'transparent',
              },
            }),
          }),
        })}
        onFocus={(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          setHasFocus(true);
          props.onFocus?.(e);
        }}
        onBlur={(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          setHasFocus(false);
          props.onBlur?.(e);
        }}
      />
    </div>
  );
};

export default Input;

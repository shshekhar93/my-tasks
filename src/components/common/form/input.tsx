import React, { useEffect, useMemo, useState } from 'react';
import { StyleObject, useStyletron } from 'styletron-react';
import { getIDFromProps, getLabelWidth } from './utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  labelAnimation?: boolean;
  multiline?: boolean;
}

const Input: React.FC<InputProps> = ({ label, labelAnimation = true, multiline = false, ...props }) => {
  const [css] = useStyletron();
  const id = useMemo(() => getIDFromProps(props), [props.id, props.name]);
  const [minWidth, setMinWidth] = useState<number>(0);
  const [hasFocus, setHasFocus] = useState(false);

  const showLargeLabel = labelAnimation && (props.value ?? '')?.toString().length === 0 && !hasFocus;
  const Component = multiline ? 'textarea' : 'input';

  useEffect(() => {
    setMinWidth(getLabelWidth(id));
  }, [id]);

  return (
    <div className={css({ position: 'relative' })}>
      {label
        && (
          <label
            htmlFor={id}
            className={css({
              position: 'absolute',
              top: showLargeLabel ? '0.75rem' : '2px',
              left: '2px',
              padding: '0 0.5rem',
              fontSize: showLargeLabel ? '1rem' : '0.8rem',
              fontWeight: 600,
              transition: 'font-size 0.1s linear, top 0.1s linear',
            })}
          >
            {label}
          </label>
        )}
      <Component
        {...props}
        id={id}
        className={css({
          ...(props.style as StyleObject),
          padding: '1.2rem 0.5rem 0.3rem',
          borderRadius: '0.25rem',
          fontSize: '1rem',
          minWidth: `calc(${minWidth}px + 1rem)`,
          width: '100%',
          height: '3rem',
          border: `1px solid ${hasFocus ? 'var(--primary-color)' : 'var(--border-color)'}`,
          outline: 'none',
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

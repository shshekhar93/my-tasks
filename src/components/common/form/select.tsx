import React, { useMemo, useState } from 'react';
import { StyleObject, useStyletron } from 'styletron-react';
import { getIDFromProps } from './utils';

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'onChange' | 'label'> {
  options: {
    [key: string]: string;
  };
  value: string;
  onChange: (value: string) => void;
  label?: string;
  labelAnimation?: boolean;
}

const Select: React.FC<SelectProps> = ({ options, value, onChange, label, labelAnimation = true, style, ...props }) => {
  const [css] = useStyletron();
  const id = useMemo(() => getIDFromProps(props), [props.id, props.name]);
  const [hasFocus, setHasFocus] = useState(false);

  const showLargeLabel = labelAnimation && value.length === 0;

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
              right: hasFocus ? '1px' : '2px',
              background: 'var(--background-primary)',
              color: 'var(--content-secondary)',
              padding: `0 0.5rem`,
              fontSize: showLargeLabel ? '1rem' : '0.8rem',
              fontWeight: 600,
              transition: 'font-size 0.1s linear, top 0.1s linear',
              transform: hasFocus ? 'translateY(-1px)' : undefined,
              pointerEvents: 'none',
            })}
          >
            {label}
          </label>
        )}
      <select
        {...props}
        id={id}
        className={css({
          'background': 'var(--background-primary)',
          'color': 'var(--content-primary)',
          ...(style as StyleObject),
          'padding': '1.2rem 0.5rem 0.3rem',
          '-webkit-appearance': 'none',
          'borderRadius': '0.25rem',
          'fontSize': '1rem',
          'width': '100%',
          'height': '3rem',
          'borderWidth': 0,
          'outline': 'none',
        })}
        onFocus={(e) => {
          setHasFocus(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setHasFocus(false);
          props.onBlur?.(e);
        }}
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        {value === '' && <option disabled value=""></option>}
        {Object.entries(options).map(([key, label]) => (
          <option key={key} value={key}>{label}</option>
        ))}
      </select>
      <div className={css({
        position: 'absolute',
        top: '50%',
        right: '0.5rem',
        width: 0,
        height: 0,
        borderLeft: '5px solid transparent',
        borderRight: '5px solid transparent',
        borderTop: '5px solid #333',
        display: 'inline-block',
        verticalAlign: 'middle',
        marginLeft: '5px',
      })}
      >
      </div>
    </div>
  );
};

export default Select;

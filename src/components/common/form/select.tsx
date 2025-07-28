import React, { useEffect, useMemo, useState } from 'react';
import { StyleObject, useStyletron } from 'styletron-react';
import { getIDFromProps, getLabelWidth } from './utils';

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
  const [minWidth, setMinWidth] = useState<number>(0);
  const [hasFocus, setHasFocus] = useState(false);

  const showLargeLabel = labelAnimation && value.length === 0 && !hasFocus;

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
              top: '2px',
              left: '2px',
              padding: '0 0.5rem',
              fontSize: showLargeLabel ? '1rem' : '0.8rem',
              fontWeight: 600,
            })}
          >
            {label}
          </label>
        )}
      <select
        {...props}
        id={id}
        className={css({
          ...(style as StyleObject),
          padding: '1.2rem 0.5rem 0.3rem',
          borderRadius: '0.25rem',
          fontSize: '1rem',
          width: '100%',
          minWidth: `calc(${minWidth}px + 1rem)`,
          height: '3rem',
          border: `${hasFocus ? 2 : 1}px solid ${hasFocus ? 'var(--primary-color)' : 'var(--border-color)'}`,
          outline: 'none',
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
        {Object.entries(options).map(([key, label]) => (
          <option key={key} value={key}>{label}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;

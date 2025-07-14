import React, { useEffect, useMemo, useState } from 'react';
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
  const id = useMemo(() => getIDFromProps(props), [props.id, props.name]);
  const [minWidth, setMinWidth] = useState<number>(0);
  const [hasFocus, setHasFocus] = useState(false);

  const showLargeLabel = labelAnimation && value.length === 0 && !hasFocus;

  useEffect(() => {
    setMinWidth(getLabelWidth(id));
  }, [id]);

  return (
    <div style={{ position: 'relative' }}>
      {label && 
        <label 
          htmlFor={id} 
          style={{ 
            position: 'absolute', 
            top: 2, 
            left: 2, 
            padding: '0 0.5rem', 
            fontSize: showLargeLabel ? '1rem' : '0.8rem', 
            fontWeight: '600' 
          }}>{label}</label>
      }
      <select 
        {...props}
        id={id}
        style={{
          ...style,
          padding: '1.2rem 0.5rem 0.3rem',
          borderRadius: '0.25rem',
          fontSize: '1rem',
          width: '100%',
          minWidth: `calc(${minWidth}px + 1rem)`,
          height: '3rem',
          border: `1px solid ${hasFocus ? 'var(--primary-color)' : 'var(--border-color)'}`,
        }} 
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
      >
        {Object.entries(options).map(([key, label]) => (
          <option key={key} value={key}>{label}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;

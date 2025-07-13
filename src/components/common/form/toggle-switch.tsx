import React, { useMemo } from 'react';
import './toggle-switch.css';
import { getIDFromProps } from './utils';

interface ToggleSwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, ...props }) => {
  const id = useMemo(() => getIDFromProps(props), [props.id, props.name]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
      <label className="toggle-switch" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
        <input {...props} id={id} type="checkbox" />
        <span className="slider round"></span>
      </label>
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default ToggleSwitch;
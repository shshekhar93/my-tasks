import React, { useMemo } from 'react';
import { useStyletron } from 'styletron-react';
import './toggle-switch.css';
import { getIDFromProps } from './utils';

interface ToggleSwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, ...props }) => {
  const [css] = useStyletron();
  const id = useMemo(() => getIDFromProps(props), [props.id, props.name]);

  return (
    <div className={css({ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.5rem' })}>
      <label className={['toggle-switch', css({ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.5rem' })].join(' ')}>
        <input {...props} id={id} type="checkbox" />
        <span className="slider round"></span>
      </label>
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default ToggleSwitch;
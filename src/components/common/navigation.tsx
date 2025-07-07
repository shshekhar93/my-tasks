import React from 'react';
import './navigation.css';
import logo from '../../logo.svg';

export function Navigation({ children }: { children: React.ReactNode }) {
  return (
    <nav className="navigation">
      <div className="navigation-brand">
        <img src={logo} alt="Task Manager" />
        <h1>Task Manager</h1>
      </div>
      <div className="navigation-actions">
        {children}
      </div>
    </nav>
  );
};

import React from "react";
import { Task } from "./types";
import Modal from "../common/modal";
import Button from "../common/form/button";

interface ViewTaskProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onTransition: (task: Task) => void;
  onDelete: () => void;
}

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
});

const statusToCTAMap = {
  pending: 'Start',
  'in-progress': 'Complete',
  completed: 'Close',
};

const nextStatus: Record<Task['status'], Task['status'] | null> = {
  pending: 'in-progress',
  'in-progress': 'completed',
  completed: null,
};

const ViewTask: React.FC<ViewTaskProps> = ({ task, isOpen, onClose, onEdit, onTransition, onDelete }) => {
  if (!isOpen) return null;

  const CTALabel = statusToCTAMap[task.status] ?? statusToCTAMap.pending;
  const handleTransition = () => {
    onTransition({ 
      ...task, 
      status: nextStatus[task.status ?? 'pending'] ?? task.status
    });
    onClose();
  }

  const handleDelete = () => {
    onDelete();
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" labelledById="view-task-title" describedById="view-task-description" style={{ width: '500px' }}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div id="view-task-title" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
          {task.title}
        </div>
        <div id="view-task-description">
          <p style={{ marginBottom: '1rem' }}>{task.description}</p>
          <p><b>Due Date:</b> {dateFormatter.format(new Date(task.dueDate))}</p>
          <p><b>Effort:</b> {task.effort}</p>
          <p><b>Priority:</b> {task.priority}</p>
          <p><b>Status:</b> {task.status || 'pending'}</p>
        </div>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '0.5rem',
          justifyContent: 'center' 
        }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {task.status !== 'completed' && <Button 
              type="secondary" 
              onClick={onEdit} 
              label="Edit" 
              style={{ flex: 1 }} />
            }
            <Button 
              type="primary" 
              onClick={handleTransition} 
              label={CTALabel} 
              style={{ flex: 1 }} />
          </div>
          <Button 
            type="tertiary" 
            onClick={handleDelete} 
            label="Delete" />
        </div>
      </div>
    </Modal>
  );
};

export default ViewTask;
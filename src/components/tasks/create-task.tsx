import React, { useEffect, useState } from 'react';
import Modal from '../common/modal.tsx';
import { TaskFormData } from './types.ts';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (taskData: TaskFormData) => void;
}

function formatDate(date: number) {
  const dateObj = new Date(date);
  if(isNaN(dateObj.getTime())) {
    return '';
  }
  return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 101).substring(1)}-${dateObj.getDate()}`;
}

const defaultFormData = (): TaskFormData => ({
  title: 'New Task',
  description: '',
  dueDate: Date.now(),
  effort: 1,
  priority: 2,
  category: '',
  tags: [],
  completed: false,
});

const mappers = {
  dueDate: (value: string) => new Date(value).getTime(),
  effort: (value: string) => parseInt(value) || 1,
  priority: (value: string) => parseInt(value) || 2,
  default: (value: string) => value,
};

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    if(!isOpen) { // Reset form when modal is closed
      setFormData(defaultFormData());
    }
  }, [isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: (mappers[name as keyof typeof mappers] || mappers.default)(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Task"
      labelledById="create-task-title"
      describedById="create-task-description"
    >
      <div id="create-task-description">
        Fill out the form below to create a new task.
      </div>
      
      <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="title" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '1rem',
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="description" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '1rem',
              resize: 'vertical',
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="eta" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            ETA
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formatDate(formData.dueDate)}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '1rem',
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="effortEstimate" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Effort Estimate (days)
          </label>
          <input
            type="number"
            id="effortEstimate"
            name="effortEstimate"
            value={formData.effort}
            onChange={handleInputChange}
            min="1"
            max="365"
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '1rem',
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="priority" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '1rem',
            }}
          >
            <option value="0">P0 - Critical</option>
            <option value="1">P1 - High</option>
            <option value="2">P2 - Medium</option>
            <option value="3">P3 - Low</option>
            <option value="4">P4 - Very Low</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              background: '#f8f9fa',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '4px',
              background: '#007bff',
              color: 'white',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            Create Task
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateTaskModal;

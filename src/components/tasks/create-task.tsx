import React, { useState } from 'react';
import Modal from '../common/modal.tsx';
import { TaskFormData } from './types.ts';


interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (taskData: TaskFormData) => void;
}

const defaultFormData = (): TaskFormData => ({
  title: 'New Task',
  description: '',
  dueDate: '',
  effort: 1,
  priority: 2,
  category: '',
  tags: [],
  completed: false,
});

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState(defaultFormData);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'effortEstimate' ? parseInt(value) || 1 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(defaultFormData());
    onClose();
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
            id="eta"
            name="eta"
            value={formData.eta}
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
            value={formData.effortEstimate}
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

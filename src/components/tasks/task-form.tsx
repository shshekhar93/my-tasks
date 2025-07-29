import React, { useEffect, useState } from 'react';
import { useStyletron } from 'styletron-react';
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from '../../constants/filters.ts';
import Input from '../common/form/input.tsx';
import Select from '../common/form/select.tsx';
import { Flex } from '../common/layout/flex.tsx';
import Modal from '../common/modal.tsx';
import { TaskFormData } from './types.ts';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (taskData: TaskFormData) => void;
  task?: TaskFormData | null;
}

function formatDate(date: number) {
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 101).substring(1)}-${dateObj.getDate()}`;
}

const defaultFormData = (): TaskFormData => ({
  title: '',
  description: '',
  dueDate: 0,
  effort: 0,
  priority: -1,
  category: '',
  tags: [],
  status: 'pending',
});

const mappers = {
  dueDate: (value: string) => new Date(value).getTime(),
  effort: (value: string) => value ? parseInt(value) : 0,
  priority: (value: string) => value ? parseInt(value) : -1,
  default: (value: string) => value,
};

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  task,
}) => {
  const [css] = useStyletron();
  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    if (isOpen) {
      setFormData(task ?? defaultFormData());
    }
  }, [isOpen, task]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
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
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={task ? 'Edit Task' : 'Create New Task'}
      labelledById="create-task-title"
      describedById="create-task-description"
    >
      <div id="create-task-description">
        {task ? 'Edit the form below to update the task.' : 'Fill out the form below to create a new task.'}
      </div>

      <Flex as="form" flexDirection="column" gap="1rem" onSubmit={handleSubmit} className={css({ marginTop: '1rem' })}>
        <Input
          label="Title"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
        <Input
          label="Description"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          multiline
        />
        <Input
          label="Category"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
        />
        <Input
          label="ETA"
          id="dueDate"
          name="dueDate"
          type="date"
          value={formData.dueDate ? formatDate(formData.dueDate) : ''}
          onChange={handleInputChange}
          style={{
            // @ts-expect-error Vendor prefix
            ':not(:focus)::-webkit-datetime-edit': {
              color: 'transparent',
            },
          }}
        />
        <Input
          label="Effort Estimate (days)"
          id="effort"
          name="effort"
          value={formData.effort ? formData.effort.toString() : ''}
          onChange={handleInputChange}
          min={1}
          max={365}
        />
        <Select
          label="Priority"
          id="priority"
          name="priority"
          value={formData.priority !== -1 ? formData.priority.toString() : ''}
          onChange={value => setFormData(prev => ({ ...prev, priority: parseInt(value) ?? 2 }))}
          options={PRIORITY_OPTIONS}
        />
        {task
          && (
            <Select
              label="Status"
              id="status"
              name="status"
              value={formData.status ?? 'pending'}
              onChange={value => setFormData(prev => ({ ...prev, status: value as 'pending' | 'in-progress' | 'completed' }))}
              options={STATUS_OPTIONS}
            />
          )}

        <Flex gap="1rem" justifyContent="flex-end">
          <button
            kind="button"
            onClick={onClose}
            className={css({
              padding: '0.5rem 1rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              background: '#f8f9fa',
              cursor: 'pointer',
              fontSize: '1rem',
            })}
          >
            Cancel
          </button>
          <button
            kind="submit"
            className={css({
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '4px',
              background: '#007bff',
              color: 'white',
              cursor: 'pointer',
              fontSize: '1rem',
            })}
          >
            {task ? 'Update Task' : 'Create Task'}
          </button>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default CreateTaskModal;

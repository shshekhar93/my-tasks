import { DBSchema, IDBPDatabase, openDB } from 'idb';
import { Task } from '../components/tasks/types';
import { downloadToFile, readFile } from '../utils/utils';

export interface TasksDBSchema extends DBSchema {
  tasks: {
    key: number;
    value: Task;
    indexes: {
      createdAt: number;
      updatedAt: number;
      title: string;
      dueDate: number;
      effort: number;
      priority: number;
      category: string;
    };
  };
}

export class TasksManager {
  private db: IDBPDatabase<TasksDBSchema> | null = null;

  get isOpen() {
    return this.db !== null;
  }

  constructor() {
    this.open();
  }

  async open() {
    this.db = await openDB<TasksDBSchema>('tasks', 1, {
      upgrade: (db) => {
        const store = db.createObjectStore('tasks', {
          keyPath: 'id',
          autoIncrement: true,
        });
        store.createIndex('createdAt', 'createdAt');
        store.createIndex('updatedAt', 'updatedAt');
        store.createIndex('title', 'title');
        store.createIndex('dueDate', 'dueDate');
        store.createIndex('effort', 'effort');
        store.createIndex('priority', 'priority');
        store.createIndex('category', 'category');
      },
    });
  }

  async close() {
    if (this.db) {
      await this.db.close();
    }
  }

  async getAllTasks() {
    if (!this.db) {
      throw new Error('Database not open');
    }
    return this.db.getAll('tasks');
  }

  async addTask(task: Omit<Task, 'id'> & { id?: number }) {
    if (!this.db) {
      throw new Error('Database not open');
    }
    return this.db.add('tasks', task as Task);
  }

  async getTask(id: number) {
    if (!this.db) {
      throw new Error('Database not open');
    }
    return this.db.get('tasks', id);
  }

  async updateTask(task: Task) {
    if (!this.db) {
      throw new Error('Database not open');
    }
    return this.db.put('tasks', task);
  }

  async removeTask(id: number) {
    if (!this.db) {
      throw new Error('Database not open');
    }
    return this.db.delete('tasks', id);
  }

  async backup() {
    if (!this.db) {
      throw new Error('Database not open');
    }

    const allTasks = await this.db?.getAll('tasks');
    downloadToFile(JSON.stringify(allTasks, null, 2));
  }

  async restore() {
    if (!this.db) {
      throw new Error('Database not open');
    }

    try {
      const tasksToRestore = JSON.parse(await readFile()) as Task[];
      if ((await this.getAllTasks()).length !== 0) {
        const confirmation = window.confirm('All existing tasks will be permanently deleted. Are you sure?');
        if (!confirmation) {
          return;
        }
      }
      await this.db.clear('tasks');
      console.log('Clear complete');
      for (const aTask of tasksToRestore) {
        await this.db.add('tasks', aTask);
      }
      console.log('restore complete');
    }
    catch (e) {
      window.alert((e as Error).message);
    }
  }
}

export const tasksManager = new TasksManager();

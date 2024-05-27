import { backendApi } from 'api/requests';

export default class TasksService {
  static async getTasks() {
    const [error, { data }] = await backendApi.get('/tasks');

    if (error) {
      return { result: null, error };
    }

    return { result: data, error: null };
  }

  static async getTask(taskId) {
    const [error, { data }] = await backendApi.get(`/tasks/${taskId}`);

    if (error) {
      return { result: null, error };
    }

    return { result: data, error: null };
  }

  static async createTask(taskObject) {
    const [error, { data }] = await backendApi.post('/tasks/new', taskObject);

    if (error) {
      return { result: null, error };
    }

    return { result: data, error: null };
  }

  static async editTask(updatedTask, id) {
    const [error, { data }] = await backendApi.put(`/tasks/edit/${id}`, updatedTask);

    if (error) {
      return { result: null, error };
    }

    return { result: data, error: null };
  }

  static async deleteTask(id) {
    const [error, { data }] = await backendApi.delete(`/tasks/delete/${id}`);

    if (error) {
      return { result: null, error };
    }

    return { result: data, error: null };
  }
}

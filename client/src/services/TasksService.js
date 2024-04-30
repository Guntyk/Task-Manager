import { backendApi } from 'api/requests';

export default class TasksService {
  static async getTasks() {
    const [error, result] = await backendApi.get('/tasks');

    if (error) {
      return { result: null, error };
    }

    return { result, error: null };
  }

  static async createTask(taskObject) {
    const [error, result] = await backendApi.post('/tasks/new', taskObject);

    if (error) {
      return { result: null, error };
    }

    return { result, error: null };
  }

  static async deleteTask(id) {
    const [error, result] = await backendApi.delete(`/tasks/delete/${id}`);

    if (error) {
      return { result: null, error };
    }

    return { result, error: null };
  }
}

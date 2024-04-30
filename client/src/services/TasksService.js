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
    console.log(taskObject);
    const [error, result] = await backendApi.post('/tasks/new', taskObject);

    if (error) {
      return { result: null, error };
    }

    return { result, error: null };
  }
}

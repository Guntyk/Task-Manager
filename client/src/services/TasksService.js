import { backendApi } from 'api/requests';

export default class TasksService {
  static async getTasks() {
    const [error, result] = await backendApi.get('/tasks');

    if (error) {
      return { result: null, error };
    }

    return { result, error: null };
  }
}

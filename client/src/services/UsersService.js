import { backendApi } from 'api/requests';

export default class UsersService {
  static async getUsers() {
    const [error, result] = await backendApi.get('/users');

    if (error) {
      return { result: null, error };
    }

    return { result, error: null };
  }
}

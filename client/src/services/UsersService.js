import { backendApi } from 'api/requests';

export default class UsersService {
  static async getUsers() {
    const [error, { data }] = await backendApi.get('/users');

    if (error) {
      return { result: null, error };
    }

    return { result: data, error: null };
  }
}

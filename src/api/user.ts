import { UpdateUserRequest, User, UserPagination } from '@/models/user';
import axiosInstance from './axios-instance';

const prefix = '/user';

export const userApi = {
  async getUserById(id: string) {
    const res = await axiosInstance.get<User>(`${prefix}/${id}`);
    return res.data;
  },
  async updateUser(payload: UpdateUserRequest) {
    const res = await axiosInstance.patch(`${prefix}/update`, payload);
    return res;
  },
  async updateUserAvatar(payload: FormData) {
    const res = await axiosInstance.patch(`${prefix}/update/avatar`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res;
  },
  async getAllUsers() {
    const res = await axiosInstance.get<User[]>(prefix);
    return res.data;
  },

  async getSearchUser(query: string) {
    const res = await axiosInstance.get<UserPagination>(
      `${prefix}?page=1&pageSize=10&usernameOrEmail=${query}`
    );

    console.log('[getSearchUser] ', res.data);

    return res.data;
  },
};

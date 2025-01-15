import {
  FollowerQuantity,
  RelationshipFollower,
} from '@/models/relationship-follower';
import axiosInstance from './axios-instance';
import {
  FollowingQuantity,
  RelationshipFollowing,
} from '@/models/relationship-following';
import { PersonalMessenger } from '@/models/personal-messenger';
import { RecommendationPagination } from '@/models/relationship';

const prefix = '/relationship';

export const relationshipApi = {
  async getRelationshipMeFollower() {
    const res = await axiosInstance.get<RelationshipFollower[]>(
      `${prefix}/me/follower`
    );
    return res.data;
  },
  async getRelationshipMeFollowing() {
    const res = await axiosInstance.get<RelationshipFollowing[]>(
      `${prefix}/me/following`
    );
    return res.data;
  },
  async getPersonalMessenger() {
    const res = await axiosInstance.get<PersonalMessenger[]>(
      `${prefix}/me/personal-messenger`
    );
    return res.data;
  },
  async getRelationshipByUserIdFollowing(userId: string) {
    const res = await axiosInstance.get<RelationshipFollowing[]>(
      `${prefix}/${userId}/following`
    );
    return res.data;
  },
  async getRelationshipByUserIdFollower(userId: string) {
    const res = await axiosInstance.get<RelationshipFollower[]>(
      `${prefix}/${userId}/follower`
    );
    return res.data;
  },
  async getFollowingQuantity(userId: string) {
    const res = await axiosInstance.get<FollowingQuantity>(
      `${prefix}/${userId}/following/get-quantity`
    );
    return res.data;
  },
  async getFollowerQuantity(userId: string) {
    const res = await axiosInstance.get<FollowerQuantity>(
      `${prefix}/${userId}/follower/get-quantity`
    );
    return res.data;
  },
  async followUser(user_id: string) {
    const res = await axiosInstance.post(`${prefix}/follow/${user_id}`);
    return res;
  },
  async acceptFollower(user_id: string) {
    const res = await axiosInstance.post(`${prefix}/follow/${user_id}/accept`);
    return res;
  },
  async unfollowUser(user_id: string) {
    const res = await axiosInstance.post(`${prefix}/${user_id}/unfollow`);
    return res;
  },
  async getRecommendation() {
    const res = await axiosInstance.get<RecommendationPagination>(
      `${prefix}/recommendation`
    );
    return res.data;
  },
};

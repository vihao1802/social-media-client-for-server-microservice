'use server';

import { StreamClient } from '@stream-io/node-sdk';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async (userId: string) => {
  if (!apiKey) throw new Error('No API key');
  if (!apiSecret) throw new Error('No API secret');

  const client = new StreamClient(apiKey, apiSecret);

  // exp is optional (by default the token is valid for an hour)
  const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
  const validity = 60 * 60;

  const token = client.generateUserToken({
    user_id: userId,
    exp,
    validity_in_seconds: validity,
  });

  return token;
};

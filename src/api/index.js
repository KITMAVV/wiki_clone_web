import { makeClient } from './client';
import { getToken } from '../auth/tokenStore';

export const api = makeClient(getToken);

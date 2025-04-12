import { Configuration } from '@/generate-api';
import apiClient from './api-client';

export const apiConfig = new Configuration({
  baseOptions: {
    axios: apiClient
  }
});

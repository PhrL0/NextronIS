import { ActivityLogApi, AiApi, AuthApi, LocationApi, MachineApi, MachineTypeApi, RoleApi } from '@/generate-api';
import apiClient from './api-client';

export const authApi = new AuthApi(undefined, undefined, apiClient);
export const machineApi = new MachineApi(undefined, undefined, apiClient);
export const locationApi = new LocationApi(undefined, undefined, apiClient);
export const machineTypeApi = new MachineTypeApi(undefined, undefined, apiClient);
export const activityLogApi = new ActivityLogApi(undefined, undefined, apiClient);
export const aiApi = new AiApi(undefined, undefined, apiClient);
export const roleApi = new RoleApi(undefined, undefined, apiClient);

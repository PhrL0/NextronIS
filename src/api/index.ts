import { AiApi, AuthApi, MachineApi } from "@/generate-api";
import apiClient from "./api-client";

export const authApi = new AuthApi(undefined, undefined, apiClient);
export const machineApi = new MachineApi(undefined, undefined, apiClient);
export const aiApi = new AiApi(undefined, undefined, apiClient);

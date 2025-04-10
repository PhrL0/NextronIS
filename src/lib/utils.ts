import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function capitalize(s: string) {
  return String(s[0]).toUpperCase() + String(s).slice(1);
}

export function isNestedObject(value: unknown): boolean {
  return value !== null && (typeof value === "object" || Array.isArray(value));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function autoFormat(value: any) {
  // TODO: ARRUMAR ISSO
  if (value === null || value === undefined || value === "") {
    return "-"; // para mostrar "-" em campos vazios
  }

  // Tenta converter para número
  if (!isNaN(value) && typeof value !== "object" && value.trim?.() !== "") {
    return Number(value);
  }

  // Tenta converter para booleano
  if (value === "true" || value === "false") {
    return value === "true" ? "Sim" : "Não";
  }

  // Tenta converter para data
  if (
    typeof value === "string" &&
    !isNaN(Date.parse(value)) &&
    value.length >= 6
  ) {
    const date = new Date(value);
    return date.toLocaleDateString("pt-BR");
  }

  // Se for objeto ou array, transforma em string
  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return value;
}

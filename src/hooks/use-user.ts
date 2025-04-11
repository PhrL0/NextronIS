import { TUserDecoded } from "@/schemas/user";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export function useUserDecode() {
  const [user, setUser] = useState<TUserDecoded | undefined>(undefined);

  useEffect(() => {
    setUser(undefined);
    const token = localStorage.getItem("token");
    if (!token) {
      localStorage.removeItem("token");
      return;
    }

    const userDecoded = jwtDecode(token!);
    if (userDecoded.exp! < Date.now() / 1000) {
      localStorage.removeItem("token");
      return;
    }

    setUser(userDecoded as TUserDecoded);
  }, []);

  return { ...user };
}

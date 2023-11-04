import { useState, useEffect } from "react";
import { auth } from "../../firebase-config";

//custom hook to check if a user is signed in
export const useAuth = () => {
  const [data, setData] = useState<any>({
    user: null,
    loading: true,
  });

  useEffect(() => {
    const checkAuthState = auth.onAuthStateChanged((user) =>
      setData({ user, loading: false })
    );
    return () => checkAuthState();
  }, []);

  return data;
};

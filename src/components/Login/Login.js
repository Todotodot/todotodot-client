import React from "react";

import {
  firebaseAuth,
  googleProvider,
  googlePopup,
} from "../../config/firebase";
import { login } from "../../api/index";

export default function Login() {
  const onLogin = async () => {
    try {
      await googlePopup(firebaseAuth, googleProvider);

      const token = await firebaseAuth.currentUser.getIdToken(true);

      if (token) {
        await login(token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={onLogin}>Google</button>
    </div>
  );
}

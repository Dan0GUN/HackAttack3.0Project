import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [questionnaireCompleted, setQuestionnaireCompleted] = useState(false);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Check localStorage for questionnaire completion status
        const completed = localStorage.getItem(`questionnaire_${currentUser.uid}`);
        setQuestionnaireCompleted(!!completed);
      } else {
        setQuestionnaireCompleted(false);
      }
      setLoading(false);
    });

    return unsubscribe;

  }, []);

  const markQuestionnaireCompleted = () => {
    if (user) {
      localStorage.setItem(`questionnaire_${user.uid}`, 'true');
      setQuestionnaireCompleted(true);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, questionnaireCompleted, markQuestionnaireCompleted }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
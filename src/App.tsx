import LoginModal from "./components/LoginModal";
import NavBar from "./components/NavBar";
import SignUpModal from "./components/SignUpModal";

import { useEffect, useState } from "react";
import { User } from "./models/user";
import * as NotesApi from "./network/note_api";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import { Container } from "react-bootstrap";
import NotesPage from "./pages/NotesPage";
import PrivacyPage from "./pages/PrivacyPage";
import NotFoundPage from "./pages/NotFoundPage";
import styles from "./styles/App.module.css";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLogInModal, setShowedLogInModal] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await NotesApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }
  });

  return (
    <BrowserRouter>
      <div>
        <NavBar
          loggedInUser={loggedInUser}
          onLogInClicked={() => setShowedLogInModal(true)}
          onSignUpClicked={() => setShowSignUpModal(true)}
          onLogOutSucessful={() => setLoggedInUser(null)}
        />

        <Container className={styles.pageContainer}>
          <Routes>
            <Route
              path="/"
              element={<NotesPage loggedInUser={loggedInUser} />}
            />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </Container>

        {showSignUpModal && (
          <SignUpModal
            onDismiss={() => setShowSignUpModal(false)}
            onSignUpSucessful={(user) => {
              setLoggedInUser(user);
              setShowSignUpModal(false);
            }}
          />
        )}
        {showLogInModal && (
          <LoginModal
            onDismiss={() => setShowedLogInModal(false)}
            onLoginSucessful={(user) => {
              setLoggedInUser(user);
              setShowedLogInModal(false);
            }}
          />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;

import { GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import routerBindings, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Auth } from "./pages/auth";
import { Chat } from "./pages/chat";
import { Profile } from "./pages/profile";
import { useSelector } from "react-redux";
import { CHannelProfile } from "./pages/chat/contact/ChannelProfile";
import { ProfileInsta } from "./ProfileInsta";



function App() {

  const userInfo = useSelector((state) => state?.auth?.userInfo);




  const PrivateRoute = ({ children }) => {
    const isAuthenticated = !!userInfo;
    return isAuthenticated ? children : <Navigate to="/auth" />;
  };
  const AuthRoute = ({ children }) => {
    const isAuthenticated = !!userInfo;
    return isAuthenticated ? <Navigate to="/" /> : children;
  }


  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <DevtoolsProvider>
          <Refine
            dataProvider={dataProvider("https://chat-application-clit.onrender.com")}
            routerProvider={routerBindings}
            // authProvider={authProvider}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              useNewQueryKeys: true,
              projectId: "AizJQk-tSUiPs-UenYIW",
            }}
          >
            <Routes>
              <Route path="/auth" element={<AuthRoute>
                <Auth />
              </AuthRoute>} />
              <Route path="/" element={<PrivateRoute>
                <Chat />
                {/* <ProfileInsta /> */}
              </PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute>
                <Profile />
              </PrivateRoute>} />
              <Route path="/groupprofile" element={<CHannelProfile />} />
            </Routes>
            <RefineKbar />
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
        </DevtoolsProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;

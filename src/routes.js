import { Navigate, Route } from "react-router-dom";

import { AdminPage } from "./pages/AdminPage";
import { CreateCertificatePage } from "./pages/CreateCertificatePage";
import { CreateClubPage } from "./pages/CreateClubPage";
import { CreateLessonPage } from "./pages/CreateLessonPage";
import { CreateSensorPage } from "./pages/CreateSensorPage";
import { CreateUserPage } from "./pages/CreateUserPage";
import { HelpPage } from "./pages/HelpPage";
import Home from "./components/Home";
import { LessonPage } from "./pages/LessonPage";
import { LoginPage } from "./pages/LoginPage";
import NavBar from "./components/utils/NavBar/NavBar";
import ProfilePage from "./pages/ProfilePage";
import { ShowCertificatesPage } from "./pages/ShowCertificatesPage";
import { ShowClubsPage } from "./pages/ShowClubsPage";
import { ShowSensorsPage } from "./pages/ShowSensorsPage";
import { ShowUsersPage } from "./pages/ShowUsersPage";

export function getRoutesByAuth(isAuthenticated, user) {
  if (!isAuthenticated || user === null || user === undefined) {
    return (
      <>
        <Route path={"/support"} element={<HelpPage />} />
        <Route path={"/auth/login"} element={<LoginPage />} />
        <Route path={"/singup"} element={<CreateUserPage />} />

        <Route path="/*" element={<Navigate to="/auth/login" />} />
      </>
    );
  }
  if (user.roles.length === 2) {
    return (
      <>
        <Route path="/users" element={putNav(<ShowUsersPage />)}></Route>
        <Route path="/users/create" element={putNav(<CreateUserPage />)} />

        <Route path="/clubs" element={putNav(<ShowClubsPage />)}></Route>
        <Route path="/clubs/create" element={putNav(<CreateClubPage />)} />

        <Route path="/sensors" element={putNav(<ShowSensorsPage />)}></Route>
        <Route path="/sensors/create" element={putNav(<CreateSensorPage />)} />

        <Route path="/certificates" element={putNav(<ShowCertificatesPage />)}></Route>
        <Route path="/certificates/create" element={putNav(<CreateCertificatePage />)}/>

        <Route path="/admin" element={putNav(<AdminPage />)}></Route>
        <Route path="/lessons" element={putNav(<LessonPage />)}></Route>
        <Route path="/lessons/create" element={putNav(<CreateLessonPage />)}></Route>
        <Route path="/profile" element={putNav(<ProfilePage />)}></Route>
        <Route path="/home" element={putNav(<Home />)} />
        <Route path="/support" element={<HelpPage />} />

        <Route path="/*" element={<Navigate to="/home" />} />
      </>
    );
  }

  if (user.roles.length === 1) {
    return (
      <>
        <Route path="/lessons" element={putNav(<LessonPage />)}></Route>
        <Route path="/profile" element={putNav(<ProfilePage />)}></Route>
        <Route path="/home" element={putNav(<Home />)} />
        <Route path="/support" element={<HelpPage />} />

        <Route path="/*" element={<Navigate to="/home" />} />
      </>
    );
  }
  return (
    <>
      <Route path={"/support"} element={<HelpPage />} />
      <Route path="/*" element={<Navigate to="/support" />} />
    </>
  );
}

export function putNav(component, isLetIn = false) {
  return (
    <>
      <NavBar isLetIn={isLetIn} />
      {component}
    </>
  );
}

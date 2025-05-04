import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import Header from "./Components/Header";
import AulasPage from "./Pages/AulasPage";
import DesafiosPage from "./Pages/DesafiosPage";
import './globals.css'; 


export default function Home() {
  return (
    <html>

      <body>
        <Header />
        {/* <RegisterPage /> */}
        {/* <LoginPage /> */}
        <LandingPage />
        {/*<DesafiosPage /> */}
        {/*<AulasPage /> */}
      </body>
    </html>
  );
}

import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import Header from "./Components/Header";
import './globals.css'; 


export default function Home() {
  return (
    <html>

      <body>
        <Header />
        <LoginPage />
        {/* <LandingPage /> */}
      </body>
    </html>
  );
}

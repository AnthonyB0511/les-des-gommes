import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import styles from "./App.module.scss";
import AuthProvider from "./components/Authprovider/Authprovider";

function App() {

  return (

    <div className={`${styles.app}`}>
      <AuthProvider>
        <Header />
        <Suspense>
          <main className={`${styles.containerApp}`}>
            <Outlet />
          </main>
        </Suspense>
        <Footer />

      </AuthProvider>
    </div>

  );
}

export default App;

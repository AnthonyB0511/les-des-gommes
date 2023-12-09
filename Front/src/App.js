import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import styles from "./App.module.scss";
import AuthProvider from "./components/Authprovider/Authprovider";

function App() {
  const user = useLoaderData();
  return (

    <body className={`${styles.app}`}>
      <AuthProvider>
        <Header />

        <Suspense>
          <div className={`${styles.containerApp}`}>
            <Outlet />
          </div>

        </Suspense>
        <Footer />

      </AuthProvider>
    </body>

  );
}

export default App;

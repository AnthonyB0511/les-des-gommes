import styles from "./App.module.scss";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";

function App() {

  return (

    // <div className={`d-flex flex-column ${styles.appContainer}`}>
    //   <Layout />
    // </div>
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;

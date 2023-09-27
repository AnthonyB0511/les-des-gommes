import styles from "./App.module.scss";
import Header from "./components/Header/Header";
import Layout from "./components/Routes/Layout";
import Footer from "./components/Footer/Footer";
import Register from "./components/Forms/Register";
import Login from "./components/Forms/Login";
function App() {

  return (

    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Header />
      <Layout />
      {/* <Register />
      <Login /> */}

      <Footer />
    </div>
  );
}

export default App;

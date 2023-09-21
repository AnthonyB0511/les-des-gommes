import styles from "./App.module.scss";
import Header from "./components/Header/Header";
import Layout from "./components/Routes/Layout";
import Footer from "./components/Footer/Footer";
;
function App() {

  return (

    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Header />
      <Layout />
      <Footer />
    </div>
  );
}

export default App;

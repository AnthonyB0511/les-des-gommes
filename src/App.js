import styles from "./App.module.scss"
import Header from "./components/Header/Header";
import Content from "./components/Content";
import Footer from "./components/Footer/Footer";
function App() {
  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
    <Header />
    <Content />
    <Footer />
    </div>
  );
}

export default App;

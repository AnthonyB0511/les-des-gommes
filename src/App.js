import styles from "./App.module.scss"
import Header from "./components/Header/Header";
import Content from "./components/Content"
import Footer from "./components/Footer/Footer";
import { Ludotheque } from "./components/Ludotheque/Ludotheque";
import Inscription from "./components/Header/Inscription"
function App() {
  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
    <Header />
    {/* <Content /> */}
    <Ludotheque />
    <Footer />
    {/* <Inscription /> */}

    </div>
  );
}

export default App;

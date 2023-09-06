import styles from "./App.module.scss";
import { Routes, Route } from "react-router-dom"
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Accueil/Home"
import { Ludotheque } from "./pages/Ludotheque/Ludotheque";
import Inscription from "./components/Header/Inscription";
import { Presentation } from "./pages/Presentation/Presentation";
function App() {

  return (

    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Header />
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/presentation' exact element={<Presentation />} />
        <Route path="/ludotheque" exact element={<Ludotheque />} />
        <Route path="*">Not Found </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

import styles from "./App.module.scss";

import Layout from "./components/Routes/Layout";

function App() {

  return (

    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Layout />
    </div>
  );
}

export default App;

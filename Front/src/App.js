import styles from "./App.module.scss";

import Layout from "./Routes/Layout";

function App() {

  return (

    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Layout />
    </div>
  );
}

export default App;

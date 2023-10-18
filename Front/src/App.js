import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

function App() {
  const user = useLoaderData();
  console.log({ user });
  return (
    <>
      <Header />
      <Suspense>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
}

export default App;

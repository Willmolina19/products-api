import { useState } from "react";
import LoginForm from "./components/LoginForm";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import "./App.css";

export default function App() {
  const [token, setToken] = useState(
    () => sessionStorage.getItem("token") || ""
  );

  function handleLogin(newToken) {
    sessionStorage.setItem("token", newToken);
    setToken(newToken);
  }

  function handleLogout() {
    sessionStorage.removeItem("token");
    setToken("");
  }

  return (
    <main>
      <h1>Gestión de Productos</h1>

      {token ? (
        <>
          <p>Sesión iniciada</p>
          <button onClick={handleLogout}>Cerrar sesión</button>
          <ProductForm
            token={token}
            onUnauthorized={handleLogout}
          />
        </>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}

      <ProductList />
    </main>
  );
}
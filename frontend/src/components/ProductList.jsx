import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/api";

export default function ProductList() {
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) return <p>Cargando productos...</p>;

  if (isError) {
    return <p role="alert">Error: {error.message}</p>;
  }

  return (
    <section>
      <h2>Lista de productos</h2>

      {products.length === 0 ? (
        <p>No hay productos registrados.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              <strong>{product.name}</strong>
              {" — "}Precio: ${product.price}
              {" — "}Stock: {product.stock}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
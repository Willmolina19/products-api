import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../services/api";

const productSchema = z.object({
  name: z.string().trim().min(1, "El nombre es obligatorio"),
  price: z.number().positive("El precio debe ser mayor que 0"),
  stock: z.number().int().min(0, "El stock no puede ser negativo"),
});

export default function ProductForm({ token, onUnauthorized }) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: 0,
      stock: 0,
    },
  });

  const mutation = useMutation({
    mutationFn: (product) => createProduct(product, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      reset();
    },
    onError: (error) => {
      if (/token|401|autorizad/i.test(error.message)) {
        onUnauthorized();
      }
    },
  });

  function onSubmit(data) {
    mutation.mutate(data);
  }

  return (
    <section>
      <h2>Crear producto</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Nombre</label>
          <input id="name" {...register("name")} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="price">Precio</label>
          <input
            id="price"
            type="number"
            step="0.01"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && <p>{errors.price.message}</p>}
        </div>

        <div>
          <label htmlFor="stock">Stock</label>
          <input
            id="stock"
            type="number"
            step="1"
            {...register("stock", { valueAsNumber: true })}
          />
          {errors.stock && <p>{errors.stock.message}</p>}
        </div>

        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Guardando..." : "Crear producto"}
        </button>
      </form>

      {mutation.isError && (
        <p role="alert">{mutation.error.message}</p>
      )}

      {mutation.isSuccess && <p>Producto creado correctamente.</p>}
    </section>
  );
}
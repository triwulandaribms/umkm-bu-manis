import { useEffect, useState, useContext } from "react";
import { api } from "../utils";
import { AdminContext } from "../pages/Admin";

export default function CashierCardProduct({ id, name, image, price, stock }) {

  const [cashierProduct, setCashierProduct] = useState({});
  const { cashier } = useContext(AdminContext);

  useEffect(() => {
    setCashierProduct({
      id_product: id,
      total_product: 1,
      price: price,
      name: name,
      stock: stock
    });
  }, [id, price]);

  const handleProductClick = async () => {
    try {
      const productResponse = await api.get(`/user/get-product-by/${id}`);
  
      const currentStock = productResponse.stock;
  
      const existingProduct = cashier.find(
        (item) => item.id_product === id
      );
  
      const totalInCart = existingProduct
        ? parseInt(existingProduct.total_product)
        : 0;
  
      if (totalInCart + 1 > currentStock) {
        alert("Stock tidak mencukupi");
        return;
      }
  
      // update stock produk
      await api.put(`/user/update-stock-by/${id}`, {
        stock: currentStock - 1,
      });
  
      // kalau produk sudah ada di cashier
      if (existingProduct) {
        await api.put(`/user/update-cashier/${existingProduct.id}`, {
          total_product: totalInCart + 1,
          sub_total: (totalInCart + 1) * price,
        });
      } else {
        // kalau belum ada
        await api.post("/user/add-cashier", {
          id_product: id,
          total_product: 1,
          price: price,
          sub_total: price,
        });
      }
  
      window.location.reload();
    } catch (error) {
      console.error("Error checking stock or adding product to cashier", error);
      alert("Terjadi kesalahan saat menambahkan produk ke keranjang");
    }
  };
  
  return (
    <div
      onClick={handleProductClick}
      className="relative bg-teal text-white cursor-pointer flex flex-col rounded-md overflow-hidden shadow-lg hover:scale-105 duration-200"
    >
  
      <img
        src={`http://localhost:3000/uploads/${image}`}
        alt={name}
        className="w-full h-40 object-cover"
      />
  
      <div className="absolute bottom-2 right-1 bg-white text-teal px-1 py-1 rounded-full text-xs font-bold shadow-md">
        Stok : {stock}
      </div>
  
      <div className="p-3 flex flex-col gap-2">
        <p className="text-base text-center font-bold">
          {name}
        </p>
  
        <p className="text-base font-extrabold text-center text-white">
          Rp{parseInt(price).toLocaleString("id-ID")}
        </p>
      </div>
    </div>
  );
}

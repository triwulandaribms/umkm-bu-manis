import { FaRegTrashAlt } from "react-icons/fa";
import { api } from "../utils";

export default function CashierCheckoutProduct({
  id,
  name,
  price,
  qty,
}) {

  const totalPrice = parseInt(price) * parseInt(qty);

  return (
    <div className="flex justify-between items-center py-2 px-3 border-b">
      
      <div className="flex items-start gap-3">
        <FaRegTrashAlt
          className="cursor-pointer mt-1 text-red-500"
          onClick={() => {
            api.delete(`/user/delete/${id}`).then(() => {
              window.location.reload();
            });
          }}
        />

        <div className="flex flex-col">
          <p className="font-semibold text-sm">
            {name}
          </p>

          <p className="text-xs text-gray-500">
            {qty} x Rp{parseInt(price).toLocaleString("id-ID")}
          </p>
        </div>
      </div>

      <div>
        <p className="font-bold text-sm">
          Rp{totalPrice.toLocaleString("id-ID")}
        </p>
      </div>
    </div>
  );
}

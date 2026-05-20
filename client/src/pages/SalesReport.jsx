import { useContext, useEffect, useState } from "react";
import { AdminContext } from "./Admin";
import * as XLSX from "xlsx";

export default function SalesReport() {

  const { salesReport } = useContext(AdminContext);

  const reportData = Array.isArray(salesReport)
    ? salesReport
    : [];

  const [currentDate, setCurrentDate] = useState("");
  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formattedDate);
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("id-ID", options);
  };

  const calculateSubTotal = () =>
    reportData.reduce((acc, curr) => acc + parseInt(curr.sub_total), 0);

  const calculateTotalSale = () =>
    reportData.reduce((acc, curr) => acc + parseInt(curr.total_sale), 0);

  const calculateDiscount = () =>
    reportData.reduce((acc, curr) => acc + parseInt(curr.discount), 0);

  const generateExcel = () => {
    const header = [
      [
        "Tanggal",
        "Kode Konsumen",
        "Jenis Pembayaran",
        "Produk",
        "Sub Total",
        "Diskon",
        "Total Penjualan",
      ],
    ];

    const body = salesReport.map((s) => [
      formatDate(s.sale_date),
      s.customer_code,
      s.type_of_payment,
      s.product_name,
      s.sub_total,
      s.discount,
      s.total_sale,
    ]);

    const data = [
      ...header,
      ...body,
      ["Created " + new Date().toLocaleString()],
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(data);

    const wscols = [
      { wch: 20 },
      { wch: 15 },
      { wch: 15 },
      { wch: 10 },
      { wch: 15 },
      { wch: 20 },
    ];
    worksheet["!cols"] = wscols;

    const headerCellStyle = {
      font: { bold: true },
      alignment: { horizontal: "center", vertical: "center" },
    };
    const centerCellStyle = {
      alignment: { horizontal: "center", vertical: "center" },
    };
    const currencyCellStyle = {
      numFmt: '"Rp"#,##0.00',
      alignment: { horizontal: "center", vertical: "center" },
    };

    for (let col = 0; col < header[0].length; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
      worksheet[cellAddress].s = headerCellStyle;
    }

    for (let row = 1; row <= body.length; row++) {
      for (let col = 0; col < body[0].length; col++) {
        const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
        if (col == 3) {
          worksheet[cellAddress].s = currencyCellStyle;
        } else {
          worksheet[cellAddress].s = centerCellStyle;
        }
      }
    }

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Data");

    XLSX.writeFile(workbook, "laporan-penjualan.xlsx");
  };

  return (
    <div id="laporan-penjualan" className="py-5 px-5 bg-warm-gray text-teal">
      <div className="flex flex-col items-center">
        <p className="text-2xl font-bold tracking-wider">Laporan Penjualan</p>
        <p className="text-2xl font-bold tracking-wider">Kripik Bu Manis</p>
        <p className="text-2xl font-bold tracking-wider">Per {currentDate}</p>
      </div>
      <div>
        {
          <table className="w-full border-collapse border border-gray-300 my-5">
            <thead>
              <tr className="bg-gray-300 font-bold tracking-wider">
                <th className="border border-gray-300 px-4 py-2 text-center">
                  No
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Tanggal
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Kode Konsumen
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Tipe Pembayaran
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Produk
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Sub Total
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Diskon
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Total Penjualan
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Data rows */}
              {reportData.map((s, index) => (
                <tr key={s.id}>
                  <td className="border-[1px] border-teal px-4 py-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border-[1px] border-teal px-4 py-2 text-center">
                    {formatDate(s.sale_date)}
                  </td>
                  <td className="border-[1px] border-teal px-4 py-2 text-center">
                    {s.customer_code}
                  </td>
                  <td className="border-[1px] border-teal px-4 py-2 text-center">
                    {s.type_of_payment}
                  </td>
                  <td className="border-[1px] border-teal px-4 py-2 text-center">
                    {s.product_name}
                  </td>
                  <td className="border-[1px] border-teal px-4 py-2 text-center">
                    Rp{parseInt(s.sub_total).toLocaleString("id-ID")}
                  </td>
                  <td className="border-[1px] border-teal px-4 py-2 text-center">
                    Rp{parseInt(s.discount).toLocaleString("id-ID")}
                  </td>
                  <td className="border-[1px] border-teal px-4 py-2 text-center">
                    Rp{parseInt(s.total_sale).toLocaleString("id-ID")}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-300 font-bold tracking-wider">
                <td
                  colSpan={5}
                  className="border border-gray-300 px-4 py-2 text-center"
                >
                  TOTAL
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  Rp{parseInt(calculateSubTotal()).toLocaleString("id-ID")}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  Rp{parseInt(calculateDiscount()).toLocaleString("id-ID")}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  Rp{parseInt(calculateTotalSale()).toLocaleString("id-ID")}
                </td>
              </tr>
            </tfoot>
          </table>
        }
        <button
          onClick={generateExcel}
          className="py-2 px-10 rounded-md font-bold tracking-wide bg-teal text-white"
        >
          Download Excel
        </button>
      </div>
    </div>
  );
}

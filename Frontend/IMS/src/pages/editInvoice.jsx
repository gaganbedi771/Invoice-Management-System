import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditInvoice() {
  const { invoiceNumber } = useParams();

  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("PAID");

  useEffect(() => {
    fetchInvoice();
  }, []);

  async function fetchInvoice() {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:3001/invoices/${invoiceNumber}`,
        {
          headers: {
            authorization: token,
          },
        },
      );

      const invoice = response.data.data;

      setCustomerName(invoice.customerName);
      setAmount(invoice.amount);
      setDate(invoice.date.split("T")[0]);
      setStatus(invoice.status);
    } catch (error) {
      console.log(error);

      alert("Failed to load invoice");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:3001/invoices/${invoiceNumber}`,
        {
          customerName,
          amount: Number(amount),
          date,
          status,
        },
        {
          headers: {
            authorization: token,
          },
        },
      );

      alert("Invoice updated");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      alert("Update failed");
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h1 className="text-2xl mb-4">Edit Invoice</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="border w-full p-2 mb-3"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />

          <input
            type="number"
            className="border w-full p-2 mb-3"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <input
            type="date"
            className="border w-full p-2 mb-3"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <select
            className="border w-full p-2 mb-3"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="PAID">PAID</option>
            <option value="UNPAID">UNPAID</option>
          </select>

          <button type="submit" className="bg-blue-500 text-white w-full p-2">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditInvoice;

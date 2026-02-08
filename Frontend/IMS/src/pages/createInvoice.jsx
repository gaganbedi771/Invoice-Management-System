import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateInvoice() {
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("PAID");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:3001/invoices",
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

      alert("Invoice created");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      alert("Failed to create invoice");
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h1 className="text-2xl mb-4">Create Invoice</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Customer Name"
            className="border w-full p-2 mb-3"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Amount"
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
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateInvoice;

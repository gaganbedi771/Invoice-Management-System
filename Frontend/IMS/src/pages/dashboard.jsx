import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  async function fetchDashboard() {
    try {
      const token = localStorage.getItem("token");

      let url = "http://localhost:3001/invoices";

      const params = [];

      if (search) {
        params.push(`search=${search}`);
      }

      if (status) {
        params.push(`status=${status}`);
      }

      if (params.length > 0) {
        url += "?" + params.join("&");
      }

      const response = await axios.get(url, {
        headers: {
          authorization: token,
        },
      });

      setData({
        totalInvoices: response.data.data.length,
        totalAmount: response.data.data.reduce(
          (sum, inv) => sum + inv.amount,
          0,
        ),
        invoices: response.data.data,
      });
    } catch (error) {
      console.log(error);
      alert("Failed to load invoices");
    }
  }

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }
  function handleLogout() {
    localStorage.removeItem("token");

    navigate("/");
  }

  async function handleDelete(invoiceNumber) {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:3001/invoices/${invoiceNumber}`, {
        headers: {
          authorization: token,
        },
      });

      alert("Invoice deleted");

      fetchDashboard();
    } catch (error) {
      console.log(error);

      alert("Failed to delete invoice");
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl">Dashboard</h1>

        <button
          onClick={() => navigate("/create")}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Create Invoice
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2"
        >
          Logout
        </button>
      </div>

      <div className="mb-2">Total Invoices: {data.totalInvoices}</div>

      <div className="mb-6">Total Amount: ₹{data.totalAmount}</div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search invoice or customer"
          className="border p-2 mr-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 mr-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="PAID">PAID</option>
          <option value="UNPAID">UNPAID</option>
        </select>

        <button
          onClick={fetchDashboard}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Search
        </button>
      </div>

      <h2 className="text-xl mb-2">Invoices</h2>

      <table className="border w-full">
        <thead>
          <tr className="border">
            <th className="border p-2">Invoice Number</th>
            <th className="border p-2">Customer</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.invoices.map((invoice) => (
            <tr key={invoice.invoiceNumber}>
              <td className="border p-2">{invoice.invoiceNumber}</td>

              <td className="border p-2">{invoice.customerName}</td>

              <td className="border p-2">₹{invoice.amount}</td>

              <td className="border p-2">{invoice.status}</td>
              <td className="border p-2">
                <button
                  onClick={() => navigate(`/edit/${invoice.invoiceNumber}`)}
                  className="bg-yellow-500 text-white px-2 py-1 mr-2"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(invoice.invoiceNumber)}
                  className="bg-red-500 text-white px-2 py-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;

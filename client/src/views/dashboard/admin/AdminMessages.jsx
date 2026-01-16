import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { api } from "../../../api/apiClient.js";

export function AdminMessages() {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/contact");
      setMessages(res.data?.data || []);
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold">Contact Messages</h2>

      {loading ? (
        <div className="mt-6">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : (
        <div className="overflow-x-auto mt-4">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((m) => (
                <tr key={m._id}>
                  <td>{m.name}</td>
                  <td>{m.email}</td>
                  <td>{m.subject}</td>
                  <td className="max-w-[420px] whitespace-normal">{m.message}</td>
                  <td>{new Date(m.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {!messages.length ? (
            <div className="opacity-70 mt-3">No messages yet.</div>
          ) : null}
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AuthPage({ mode }) {
  const navigate = useNavigate();
  const isRegister = mode === "register";
  const [form, setForm] = useState({ name: "Ria", email: "ria@example.com", password: "password123" });

  async function submit(event) {
    event.preventDefault();
    const endpoint = isRegister ? "/auth/register" : "/auth/login";
    const { data } = await api.post(endpoint, form);
    localStorage.setItem("smart_feeder_token", data.token);
    navigate("/");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-main p-6 font-inter">
      <form onSubmit={submit} className="card w-full max-w-[420px] p-8">
        <h1 className="font-imprima text-[42px]">{isRegister ? "Create Account" : "Welcome Back"}</h1>
        {isRegister && (
          <input className="mt-6 h-12 w-full rounded-xl border border-line px-4" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" />
        )}
        <input className="mt-4 h-12 w-full rounded-xl border border-line px-4" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" />
        <input className="mt-4 h-12 w-full rounded-xl border border-line px-4" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Password" type="password" />
        <button className="feed-button mt-6 h-12 w-full rounded-[20px] font-bold text-white">{isRegister ? "Register" : "Login"}</button>
      </form>
    </main>
  );
}

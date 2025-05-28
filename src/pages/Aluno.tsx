import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000";
interface Aluno {
  nome_completo: string;
  usuario_acesso: string;
  senha_hash: string;
  email_aluno: string;
  observacao?: string;
  data_cadastro: string;
  createdAt: string;
  updatedAt: string;
}

export default function AlunoLogin() {
  const [form, setForm] = useState({ usuario_acesso: "", senha: "" });
  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/aluno/login`, form);
      setAluno(res.data.buscarAluno);
      setError(null);
    } catch (err) {
      setAluno(null);
      setError("Login falhou. Verifique as credenciais.");
      console.log(err)
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Login do Aluno</h2>
      <form onSubmit={handleLogin} className="mb-5">
        <div className="mb-3">
          <label className="form-label">Usuário</label>
          <input
            type="text"
            name="usuario_acesso"
            value={form.usuario_acesso}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Senha</label>
          <input
            type="password"
            name="senha"
            value={form.senha}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-success">Entrar</button>
      </form>

      {error && <div className="alert alert-danger">{error}</div>}

      {aluno && (
        <div className="card">
          <div className="card-header">Informações do Aluno</div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><strong>Nome:</strong> {aluno.nome_completo}</li>
            <li className="list-group-item"><strong>Usuário:</strong> {aluno.usuario_acesso}</li>
            <li className="list-group-item"><strong>Email:</strong> {aluno.email_aluno}</li>
            {aluno.observacao && <li className="list-group-item"><strong>Observação:</strong> {aluno.observacao}</li>}
            <li className="list-group-item"><strong>Cadastrado em:</strong> {new Date(aluno.data_cadastro).toLocaleString()}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
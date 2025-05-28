import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000";

interface Aluno {
    id: number;
    nome_completo: string;
    usuario_acesso: string;
    email_aluno: string;
    observacao?: string;
    data_cadastro: string;
}

export default function Professor() {
    const [form, setForm] = useState({
        nome_completo: "",
        usuario_acesso: "",
        senha: "",
        email_aluno: "",
        observacao: ""
    });
    const [alunos, setAlunos] = useState<Aluno[]>([]);

    const fetchAlunos = async () => {
        try {
            const res = await axios.get(`${API_URL}/aluno/all`);
            setAlunos(res.data);
        } catch (err) {
            console.error("Erro ao buscar alunos", err);
        }
    };

    useEffect(() => {
        fetchAlunos();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { nome_completo, usuario_acesso, senha, email_aluno } = form;
        if (!nome_completo || !usuario_acesso || !senha || !email_aluno) return alert("Todos os campos obrigatórios devem ser preenchidos.");
        try {
            await axios.post(`${API_URL}/aluno/add`, form);
            setForm({ nome_completo: "", usuario_acesso: "", senha: "", email_aluno: "", observacao: "" });
            fetchAlunos();
        } catch (err) {
            console.error("Erro ao adicionar aluno", err);
        }
    };

    return (
        <div className="container py-5">
            <h2 className="mb-4">Cadastro de Alunos</h2>
            <form onSubmit={handleSubmit} className="mb-5">
                <div className="mb-3">
                    <label className="form-label">Nome Completo</label>
                    <input type="text" name="nome_completo" value={form.nome_completo} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Usuário de Acesso</label>
                    <input type="text" name="usuario_acesso" value={form.usuario_acesso} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Senha</label>
                    <input type="password" name="senha" value={form.senha} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email do Aluno</label>
                    <input type="email" name="email_aluno" value={form.email_aluno} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Observação</label>
                    <textarea name="observacao" value={form.observacao} onChange={handleChange} className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Adicionar Aluno</button>
            </form>

            <h3>Lista de Alunos</h3>
            <ul className="list-group">
                {alunos.map((aluno) => (
                    <li key={aluno.id} className="list-group-item">
                        <p className="mb-1"><strong>Nome:</strong> {aluno.nome_completo} <strong>Usuário:</strong> {aluno.usuario_acesso} <strong>Email:</strong> {aluno.email_aluno}</p> <strong>Data de Cadastro:</strong> {new Date(aluno.data_cadastro).toLocaleString()}
                        {aluno.observacao && <p className="mb-0"><strong>Observação:</strong> {aluno.observacao}</p>}
                    </li>
                ))}
            </ul>
        </div>
    );
}
import axios from "axios";
import { Target, ToDo } from "./types";

const api = axios.create({
  baseURL: "https://todo-caio.azurewebsites.net/api",
});

export const obterTargets = async (): Promise<Target[]> => {
  const resposta = await api.get("/Targets");
  return resposta.data;
};

export const obterTargetPorId = async (id: number): Promise<Target> => {
  const resposta = await api.get(`/Targets/${id}`);
  return resposta.data;
};

export const adicionarTarget = async (
  novoTarget: Omit<Target, "id" | "todo" | "isComplete">
): Promise<Target> => {
  const resposta = await api.post("/Targets", {
    id: 0,
    todo: [],
    isComplete: false,
    ...novoTarget,
  });
  return resposta.data;
};

export const atualizarTarget = async (
  id: number,
  targetAtualizado: Partial<Target>
): Promise<Target> => {
  const resposta = await api.put(`/Targets/${id}`, targetAtualizado);
  return resposta.data;
};

export const excluirTarget = async (id: number): Promise<void> => {
  await api.delete(`/Targets/${id}`);
};

export const obterToDos = async (): Promise<ToDo[]> => {
  const resposta = await api.get("/Todo");
  return resposta.data;
};

export const obterToDoPorId = async (id: number): Promise<ToDo> => {
  const resposta = await api.get(`/Todo/${id}`);
  return resposta.data;
};

export const adicionarToDo = async (
  novoToDo: Omit<ToDo, "id" | "isComplete">
): Promise<ToDo> => {
  const resposta = await api.post("/Todo", novoToDo);
  return resposta.data;
};

export const atualizarToDo = async (
  id: number,
  todoAtualizado: Partial<ToDo>
): Promise<ToDo> => {
  const resposta = await api.put(`/Todo/${id}`, todoAtualizado);
  return resposta.data;
};

export const excluirToDo = async (id: number): Promise<void> => {
  await api.delete(`/Todo/${id}`);
};

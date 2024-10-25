import React, { useEffect, useState } from "react";
import {
  obterTargets,
  adicionarTarget,
  atualizarTarget,
  excluirTarget,
  obterToDos,
  adicionarToDo,
  atualizarToDo,
  excluirToDo,
} from "./apiConnection";
import { Target, ToDo } from "./types";
import { FaArrowDownWideShort, FaArrowUpShortWide } from "react-icons/fa6";
import { AiOutlineCloseCircle } from "react-icons/ai";

const App: React.FC = () => {
  const [targets, setTargets] = useState<Target[]>([]);
  const [mostrarTargets, setMostrarTargets] = useState(false);

  const [targetSelecionado, setTargetSelecionado] = useState<Target | null>(
    null
  );

  const [novoTarget, setNovoTarget] = useState<
    Omit<Target, "id" | "todo" | "isComplete">
  >({ title: "", description: "" });

  const [editarTarget, setEditarTarget] = useState<Target | null>(null);

  const [novoToDo, setNovoToDo] = useState({
    title: "",
    description: "",
    targetId: 0,
  });

  const [editarToDo, setEditarToDo] = useState<ToDo | null>(null);

  useEffect(() => {
    carregarTargets();
  }, []);

  const carregarTargets = async () => {
    const dadosTargets = await obterTargets();
    setTargets(dadosTargets);
  };

  const handleSelecionarTarget = async (target: Target) => {
    const targetComToDos = await obterToDos();
    setTargetSelecionado({
      ...target,
      todo: targetComToDos.filter((todo: ToDo) => todo.targetId === target.id),
    });
  };

  const handleCriarTarget = async () => {
    if (novoTarget) {
      await adicionarTarget(novoTarget);
    }
    carregarTargets();
    setNovoTarget({ title: "", description: "" });
  };

  const handleAtualizarTarget = async () => {
    if (editarTarget) {
      await atualizarTarget(editarTarget.id, editarTarget);
      carregarTargets();
      setEditarTarget(null);
    }
  };

  const handleExcluirTarget = async (id: number) => {
    await excluirTarget(id);
    carregarTargets();
  };

  const handleCriarTodo = async () => {
    if (targetSelecionado) {
      await adicionarToDo({ ...novoToDo, targetId: targetSelecionado.id });
      handleSelecionarTarget(targetSelecionado);
      setNovoToDo({ title: "", description: "", targetId: 0 });
    }
  };

  const handleAtualizarTodo = async () => {
    if (editarToDo) {
      await atualizarToDo(editarToDo.id, editarToDo);
      handleSelecionarTarget(targetSelecionado!);
      setEditarToDo(null);
    }
  };

  const handleExcluirTodo = async (id: number) => {
    await excluirToDo(id);
    handleSelecionarTarget(targetSelecionado!);
  };

  return (
    <div className="app-container">
      <h1>Gerenciador de Targets e ToDos</h1>

      <form
        className="formulario"
        onSubmit={(e) => {
          e.preventDefault();
          handleCriarTarget();
        }}
      >
        <h2>Adicionar Novo Target</h2>

        <input
          type="text"
          value={novoTarget!.title}
          onChange={(e) =>
            setNovoTarget({ ...novoTarget, title: e.target.value })
          }
          placeholder="Título do Target"
          required
          minLength={3}
        />
        <input
          type="text"
          value={novoTarget!.description}
          onChange={(e) =>
            setNovoTarget({ ...novoTarget!, description: e.target.value })
          }
          placeholder="Descrição do Target"
          required
          minLength={3}
        />
        <button type="submit">Criar Target</button>
      </form>

      {editarTarget && (
        <form
          className="formulario"
          onSubmit={(e) => {
            e.preventDefault();
            handleAtualizarTarget();
          }}
        >
          <div className="form-title">
            <h2>Editar Target</h2>
            <button onClick={() => setEditarTarget(null)}>
              <AiOutlineCloseCircle size={30} />
            </button>
          </div>
          <input
            type="text"
            value={editarTarget.title}
            onChange={(e) =>
              setEditarTarget({ ...editarTarget, title: e.target.value })
            }
            required
            minLength={3}
          />
          <input
            type="text"
            value={editarTarget.description}
            onChange={(e) =>
              setEditarTarget({ ...editarTarget, description: e.target.value })
            }
            required
            minLength={3}
          />
          <div className="checkbox-container">
            <input
              type="checkbox"
              onChange={(e) =>
                setEditarTarget({
                  ...editarTarget,
                  isComplete: e.target.checked,
                })
              }
              checked={editarTarget.isComplete}
            />
            <label> Marcar como concluído </label>
          </div>
          <button type="submit">Salvar Alterações</button>
        </form>
      )}

      <div className="targets-cabecalho">
        <h2>Targets</h2>
        <button onClick={() => setMostrarTargets(!mostrarTargets)}>
          {mostrarTargets ? (
            <FaArrowUpShortWide size={18} />
          ) : (
            <FaArrowDownWideShort size={18} />
          )}
        </button>
      </div>

      {mostrarTargets && (
        <div className="lista-targets">
          {targets.map((target) => (
            <div
              key={target.id}
              onClick={() => handleSelecionarTarget(target)}
              className="list-item"
            >
              <div className="content-container">
                <h3>{target.title}</h3>
                <p>{target.description}</p>
              </div>
              <div className="button-container">
                <button onClick={() => handleExcluirTarget(target.id)}>
                  Excluir
                </button>
                <button onClick={() => setEditarTarget(target)}>Editar</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {targetSelecionado && (
        <div className="detalhes-target">
          <h2>ToDos para o Target: {targetSelecionado.title}</h2>

          <form
            className="formulario"
            onSubmit={(e) => {
              e.preventDefault();
              handleCriarTodo();
            }}
          >
            <h2>Adicionar Novo ToDo</h2>
            <input
              type="text"
              value={novoToDo.title}
              onChange={(e) =>
                setNovoToDo({ ...novoToDo, title: e.target.value })
              }
              placeholder="Título do ToDo"
              required
              minLength={3}
            />
            <input
              type="text"
              value={novoToDo.description}
              onChange={(e) =>
                setNovoToDo({ ...novoToDo, description: e.target.value })
              }
              placeholder="Descrição do ToDo"
              required
              minLength={3}
            />
            <button type="submit">Adicionar ToDo</button>
          </form>

          {editarToDo && (
            <form
              className="formulario"
              onSubmit={(e) => {
                e.preventDefault();
                handleAtualizarTodo();
              }}
            >
              <div className="form-title">
                <h2>Editar ToDo</h2>

                <button onClick={() => setEditarToDo(null)}>
                  <AiOutlineCloseCircle size={30} />
                </button>
              </div>
              <input
                type="text"
                value={editarToDo.title}
                onChange={(e) =>
                  setEditarToDo({ ...editarToDo, title: e.target.value })
                }
                required
                minLength={3}
              />
              <input
                type="text"
                value={editarToDo.description}
                onChange={(e) =>
                  setEditarToDo({ ...editarToDo, description: e.target.value })
                }
                required
                minLength={3}
              />
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setEditarToDo({
                      ...editarToDo,
                      isComplete: e.target.checked,
                    })
                  }
                  checked={editarToDo.isComplete}
                />
                <label> Marcar como concluído </label>
              </div>
              <button type="submit">Salvar Alterações</button>
            </form>
          )}

          {targetSelecionado.todo.map((todo) => (
            <div key={todo.id} className="todo-item list-item">
              <div className="content-container">
                <h4>{todo.title}</h4>
                <p>{todo.description}</p>
              </div>
              <div className="button-container">
                <button onClick={() => handleExcluirTodo(todo.id)}>
                  Excluir
                </button>
                <button onClick={() => setEditarToDo(todo)}>Editar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;

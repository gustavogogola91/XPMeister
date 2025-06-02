"use client";

import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect, useRef, useState } from "react";

interface Post {
  id: number;
  titulo: string;
  conteudo: string;
  autor: Autor;
  dataCriacao: string;
  comentarios: Comentario[];
}

interface Autor {
  nome: string;
}

interface Comentario {
  id: number;
  conteudo: string;
  autor: Autor;
  dataCriacao: string;
}

const ModalNovo = ({ onClose, onUpdate }: { onClose: any; onUpdate: any }) => {
  const tituloRef = useRef<HTMLInputElement>(null);
  const conteudoRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmitPost = async () => {
    const titulo = tituloRef.current?.value;
    const conteudo = conteudoRef.current?.value;
    await fetch("http://localhost:5017/postagem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo: titulo,
        conteudo: conteudo,
        autorId: 1,
      }),
    }).then((res) => {
      if (res.status == 201) {
        onUpdate();
        onClose();
      }
    });
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: "rgba(0,0,0,0.3)" }}
    >
      <div className="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] p-6 rounded-lg shadow-lg flex flex-col">
        <h2 className="text-2xl font-bold mb-4 text-purple-700 uppercase">
          Nova Postagem
        </h2>
        <form
          className="flex flex-col items-center text-center gap-8 w-full h-full"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmitPost();
          }}
        >
          <input
            type="text"
            name="titulo"
            ref={tituloRef}
            placeholder="Título"
            required
            className="bg-gray-300 w-full mb-1 p-4 rounded-[5px]"
          />
          <textarea
            name="conteudo"
            ref={conteudoRef}
            placeholder="Descrição"
            required
            className="bg-gray-300 w-full h-full  p-4 rounded-[5px]"
          />
          <div className="flex flex-row w-full justify-center gap-8">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
            >
              Enviar
            </button>
            <button
              onClick={onClose}
              className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ModalPostagem = ({
  post,
  onClose,
  onAdd,
  onUpdate,
}: {
  post: Post | null;
  onClose: any;
  onAdd: any;
  onUpdate: any;
}) => {
  if (!post) return null;

  const comentInput = useRef<HTMLInputElement>(null);

  const handleSubmitComentario = async ({
    postagemId,
  }: {
    postagemId: number;
  }) => {
    const value = comentInput.current?.value;
    try {
      const res = await fetch("http://localhost:5017/comentario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conteudo: value,
          autorId: 1,
          postagemId: postagemId,
        }),
      });
      if (res.ok) {
        await onAdd();
        if (comentInput.current) {
          comentInput.current.value = "";
        }
        await onUpdate();
      }
    } catch (erro) {
      console.error("Erro ao adicionar comentario", erro);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: "rgba(0,0,0,0.3)" }}
    >
      <div className="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] p-6 rounded-lg shadow-lg flex flex-col">
        <h2 className="text-2xl font-bold mb-4 text-purple-700 uppercase">
          {post.titulo}
        </h2>
        <p>{post.conteudo}</p>
        <p className="text-gray-700 mb-2">
          <strong>Autor:</strong> {post.autor.nome}
        </p>
        <p className="text-gray-500 mb-4">
          <strong>Criado em:</strong> {post.dataCriacao}
        </p>
        <ul className="max-h-[380px] overflow-y-auto">
          {post.comentarios.length == 0 ? (
            <li>Nenhum comentario</li>
          ) : (
            post.comentarios.map((coment) => {
              return (
                <li
                  key={coment.id}
                  className="bg-gray-100 m-4 rounded-[6px] text-start"
                >
                  <div className="flex flex-row justify-between p-3">
                    <p>{coment.autor.nome}</p>
                    <p>{coment.dataCriacao}</p>
                  </div>
                  <h3 className="pl-8 pb-4">{coment.conteudo}</h3>
                </li>
              );
            })
          )}
        </ul>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmitComentario({ postagemId: post.id });
          }}
          className="bg-gray-300 w-full mt-auto ml-auto mr-auto mb-6 flex justify-between p-4 rounded-[5px]"
        >
          <input
            type="text"
            className="w-full h-full"
            name="comentario"
            required
            ref={comentInput}
            placeholder="Adicione seu comentário"
          />
          <button className="cursor-pointer ml-2">Enviar</button>
        </form>
        <button
          onClick={onClose}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

function Forum() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [modalPostagemOpen, setModalPostagemOpen] = useState(false);
  const [modalNovaOpen, setModalNovaOpen] = useState(false);
  const [postSelecionado, setPostSelecionado] = useState<Post | null>(null);
  const router = useRouter();

  const { "auth-token": AuthToken } = parseCookies();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!AuthToken) {
        router.push("/Pages/LoginPage");
      }
    }
  }, [router]);

  useEffect(() => {
    buscarPosts();
  }, []);

  const buscarPosts = async () => {
    await fetch("http://localhost:5017/postagem", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Erro ao buscar posts", error));
  };

  const atualizar = async (post: Post | null) => {
    if (post == null) return;
    const postAtual = await posts.find((p) => p.id === post.id);
    console.log(postAtual);
    setPostSelecionado(postAtual ?? null);
  };

  const abrirModalPostagem = (post: Post) => {
    setPostSelecionado(post);
    setModalPostagemOpen(true);
  };

  const fecharModalPostagem = () => {
    setModalPostagemOpen(false);
    setPostSelecionado(null);
  };

  const abrirModalNova = () => {
    setModalNovaOpen(true);
  };

  const fecharModalNova = () => {
    setModalNovaOpen(false);
  };

  return (
    <section className="w-full items-center text-center">
      <h1 className="text-purple-600 text-2xl font-bold mt-10 mb-5 text-center">
        Fórum
      </h1>
      <button
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
        onClick={abrirModalNova}
      >
        Nova Postagem
      </button>
      <ul className="w-[60vw] items-start m-auto text-start">
        {posts.map((post) => {
          return (
            <li key={post.id} className="bg-gray-100 rounded-[10px] p-4 m-6">
              <h2
                className="text-xl uppercase cursor-pointer mb-2 text-purple-600"
                onClick={() => abrirModalPostagem(post)}
              >
                {post.titulo}
              </h2>
              <p className="text-gray-400">
                Criado por {post.autor.nome} em {post.dataCriacao}
              </p>
            </li>
          );
        })}
      </ul>
      {modalPostagemOpen && (
        <ModalPostagem
          post={postSelecionado}
          onClose={fecharModalPostagem}
          onAdd={buscarPosts}
          onUpdate={() => atualizar(postSelecionado)}
        />
      )}
      {modalNovaOpen && (
        <ModalNovo onClose={fecharModalNova} onUpdate={buscarPosts} />
      )}
    </section>
  );
}
export default Forum;

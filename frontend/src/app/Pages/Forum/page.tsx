"use client";

import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

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

const Modal = ({ post, onClose }: { post: Post | null; onClose: any }) => {
  if (!post) return null;

  return (
    <div className="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">{post.titulo}</h2>
      <p className="text-gray-700 mb-2">
        <strong>Autor:</strong> {post.autor.nome}
      </p>
      <p className="text-gray-500 mb-4">
        <strong>Criado em:</strong> {post.dataCriacao}
      </p>
      <ul>
        {post.comentarios.map((coment) => {
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
        })}
      </ul>
      <button
        onClick={onClose}
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
      >
        Fechar
      </button>
    </div>
  );
};

function Forum() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
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
    const fetchPosts = async () => {
      const data = await buscarPosts();
      setPosts(data);
      console.log(data);
    };

    fetchPosts();
  }, []);

  const buscarPosts = async () => {
    try {
      const res = await fetch("http://localhost:5017/postagem", {
        method: "GET",
      });

      if (!res.ok) throw new Error("Erro ao buscar postagens");

      return await res.json();
    } catch (error) {
      console.error("Erro na requisição GET");
      throw error;
    }
  };

  const abrirModal = (post: Post) => {
    setPostSelecionado(post);
    setModalOpen(true);
  };

  const fecharModal = () => {
    setModalOpen(false);
    setPostSelecionado(null);
  };

  return (
    <section className="w-full items-center text-center">
      <h1 className="text-purple-600 text-2xl font-bold mt-10 mb-5 text-center">
        Fórum
      </h1>
      <ul className="w-[60vw] items-start m-auto text-start">
        {posts.map((post) => {
          return (
            <li key={post.id} className="bg-gray-100 rounded-[10px] p-4 m-6">
              <h2
                className="text-xl uppercase cursor-pointer mb-2 text-purple-600"
                onClick={() => abrirModal(post)}
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
      {modalOpen && <Modal post={postSelecionado} onClose={fecharModal} />}
    </section>
  );
}
export default Forum;

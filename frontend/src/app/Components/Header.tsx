"use client";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

import { AlignJustify, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const DefaultHeader = () => {
    return (
        <div className="w-full shadow flex flex-col gap-1 items-center justify-between px-18 pb-4 md:flex-row md:pb-0">
            <p className="logo text-purple">
                <span className="text-[60px] font-black">XP</span>Meister
            </p>
            <div className="flex flex-row text-[18px] gap-10">
                <a href="*" className="font-semibold">Sobre</a>
                <a href="*" className="font-semibold">Contato</a>
                <a href="/Pages/LoginPage" className="font-semibold">Entrar</a>
            </div>
        </div>
    );
};

const AuthenticatedHeader = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const { logoutUsuario } = useContext(AuthContext);

    const handleUserLogout = () => {
        logoutUsuario()
        router.push("LoginPage");
    }


    return (
        <div className="w-full shadow flex flex-col gap-3 items-center bg-purple justify-between px-18 pb-4 md:flex-row md:pb-0">
            <p className="logo text-white">
                <span className="text-[60px] font-black">XP</span>Meister
            </p>
            <div className="flex items-center text-white flex-row md:text-[18px] gap-4 md:gap-10">
                <a href="/Pages/HomePage" className="font-semibold">Sobre</a>
                <a href="*" className="font-semibold">Contato</a>

                <button className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={30} /> : <AlignJustify size={30} />}
                </button>
                {isOpen && (
                    <ul className="mt-4 flex flex-col justify-center font-semibold absolute right-24 top-32 md:right-36 md:top-12 bg-white gap-2 text-black rounded border-b-5 border-purple shadow-xl py-4 px-4 space-y-2 z-50 transition-all duration-1300 ease-out">
                        <li><Link href={"ModulosPage"}>Módulos</Link></li>
                        <li><Link href={"AulasPage"}>Aula</Link></li>
                        <li><Link href={"Forum"}>Fórum</Link></li>
                        <li><Link href={"AlunoConfigPage"}>Configurações</Link></li>
                        <button onClick={handleUserLogout} className="cursor-pointer m-auto bg-red-500 w-full m-2 text-white font-bold rounded">Logout</button>
                    </ul>
                )}

                <a href="*" className="font-semibold bg-white p-[2px] rounded-full">
                    <img
                        src="/UserIcon.png"
                        alt="UserIcon"
                        className="min-w-[30px] min-h-[30px] max-w-[40px] max-h-[40px]"
                    />
                </a>
            </div>
        </div>
    );
};

const Header = () => {
    const { IsAuthenticated } = useContext(AuthContext);
    return IsAuthenticated ? <AuthenticatedHeader /> : <DefaultHeader />;
};

export default Header;

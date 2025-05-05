"use client"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const DefaultHeader = () => {


    return (
        <>
            <div className="w-full shadow flex flex-col gap-1 items-center justify-between px-18 pb-4 md:flex-row md:pb-0">
                <p className="logo text-purple"><span className="text-[60px] font-black">XP</span>Meister</p>
                <div className="flex flex-row text-[18px] gap-10">
                    <a href="*" className="font-semibold">Sobre</a>
                    <a href="*" className="font-semibold">Contato</a>
                    <a href="/Pages/LoginPage" className="font-semibold">Entrar</a>
                </div>
            </div>
        </>
    )

}

const AuthenticatedHeader = () => {

    return (
        <>
            {
                <>
                    <div className="w-full shadow flex flex-col gap-3 items-center bg-purple justify-between px-18 pb-4  md:flex-row md:pb-0">

                        <p className="logo text-white"><span className="text-[60px] font-black">XP</span>Meister</p>
                        <div className="flex items-center text-white flex-row text-[18px] gap-10">
                            <a href="*" className="font-semibold">Sobre</a>
                            <a href="*" className="font-semibold">Contato</a>
                            <a href="/Pages/AlunoConfigPage" className="font-semibold bg-white p-[2px] rounded-full">
                                <img src="/UserIcon.png" alt="UserIcon"
                                    className="min-w-[30px] min-h[30px] max-w-[40px] max-h-[40px]" />
                            </a>

                        </div>

                    </div>
                </>
            }
        </>
    )
}

const Header = () => {
    const { IsAuthenticated } = useContext(AuthContext);

    return IsAuthenticated ? <AuthenticatedHeader /> : <DefaultHeader />;
};

export default Header;
"use client";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";

function clearOauthTokenCookie(router: any) {
    const cookieName = "auth-token";

    // Tenta apagar o cookie com várias combinações
    document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=`;
    document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;

    alert("Cookie auth-token limpo!");
    router.push("/Pages/LoginPage");
}

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

    return (
        <div className="w-full shadow flex flex-col gap-3 items-center bg-purple justify-between px-18 pb-4 md:flex-row md:pb-0">
            <p className="logo text-white">
                <span className="text-[60px] font-black">XP</span>Meister
            </p>
            <div className="flex items-center text-white flex-row md:text-[18px] gap-4 md:gap-10">
                <a href="/Pages/HomePage" className="font-semibold">Sobre</a>
                <a href="*" className="font-semibold">Contato</a>

                <button className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? (
                        <h2 className="w-8 font-bold">X</h2>
                    ) : (
                        <img src="/MenuIcon.png" className="w-8" alt="MenuIcon" />
                    )}
                </button>

                {isOpen && (
                    <ul className="mt-4 absolute right-24 top-32 md:right-36 md:top-12 bg-white text-black rounded-xl shadow-xl py-4 px-4 space-y-2 z-50 transition-all duration-1300 ease-out">
                        <li>
                            <button
                                onClick={() => clearOauthTokenCookie(router)}
                                className="text-red-600 hover:underline"
                            >
                                LogOut
                            </button>
                        </li>
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

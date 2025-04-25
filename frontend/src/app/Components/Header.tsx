
const DefaultHeader = () => {


    return (
        <>
            <div className="w-full shadow flex flex-col gap-1 items-center justify-between px-18 pb-4 md:flex-row md:pb-0">
                <p className="logo text-purple"><span className="text-[60px] font-black">XP</span>Meister</p>
                <div className="flex flex-row text-[18px] gap-10">
                    <a href="*" className="font-semibold">Sobre</a>
                    <a href="*" className="font-semibold">Contato</a>
                    <a href="*" className="font-semibold">Entrar</a>
                </div>
            </div>
        </>
    )

}

const AuthenticatedHeader = () => {

    return (
        <>
            {//TODO Implementar header logado
            }
        </>
    )
}

const Header = () => {
    //FIXME: implementar check de login
    // const isLoggedIn = !!localStorage.getItem('authToken'); // Verifica se há token

    // // Retorna um header totalmente diferente baseado no login
    // return isLoggedIn ? <AuthenticatedHeader /> : <DefaultHeader />;
    return <DefaultHeader />
};



export default Header;
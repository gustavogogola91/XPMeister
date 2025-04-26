export default function Login() {
    return (
      <div className="flex flex-col gap-10 items-center mb-20">
        <div className="flex flex-col items-center justify-center flex-1 p-6">
            <h2 className="text-4xl text-purple font-bold underline mb-4">BEM-VINDO</h2>
            <p className="text-center mb-8 text-base">Faça o login para continuar sua <span className="text-purple">jornada de aprendizado!!</span></p>
            <FormLogin/>
            <p className="mt-6 text-sm">Não tem conta? <a href="#" className="font-bold hover:underline">cadastre-se </a> </p>
        </div>
      </div>
    );
  }


  function FormLogin() {
    return (
        <>
        <form className="login-form flex flex-col w-full max-w-xs gap-4">
            <input type="email" placeholder="Email" className="" required/>
            <input type="password" placeholder="Senha" className="" required/>
            <button type="submit" className="btn-primary py-2 text-[16px] font-bold"> Entrar </button>
        </form>
        </>
    );
  }
  
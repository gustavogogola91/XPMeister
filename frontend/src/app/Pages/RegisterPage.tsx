export default function RegisterPage() {
    return (
      <div className="flex flex-col gap-10 items-center mb-20">
        <div className="flex flex-col items-center justify-center flex-1 p-6">
            <h2 className="text-4xl text-purple font-bold underline mb-4">CADASTRE-SE</h2>
            <p className="text-center mb-8 text-base">Crie sua conta e comece sua <span className="text-purple">jornada de aprendizado!!</span></p>
            <FormRegister/>
            <p className="mt-6 text-sm">Já tem uma conta? <a href="#" className="font-bold hover:underline">Faça Login</a></p>
        </div>
      </div>
    );
  }

  
  function FormRegister() {
    return (
        <>
        <form className="base-form flex flex-col w-full max-w-xs gap-4">
            <input type="text" placeholder="Nome Completo" className="" required/>
            <input type="email" placeholder="Email" className="" required/>
            <input type="password" placeholder="Senha" className="" required/>
            <input type="password" placeholder="Confirmar Senha" className="" required/>
            <button type="submit" className="btn-primary py-2 text-[16px] font-bold"> Criar Conta </button>
        </form>
        </>
    );
  }
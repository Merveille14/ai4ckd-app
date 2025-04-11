import React from 'react';
import { useNavigate } from 'react-router-dom';
import '@/App.css';

const MedicalLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/doctor/dashboard');
  };

  return (
<div className="bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center h-screen font-[Poppins] relative">
  {/* Image en fond */}
  <img
    src="/images/croix.png"
    alt="Croix"
    className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
  />

  <div className="flex w-[950px] overflow-hidden shadow-2xl rounded-3xl glass-effect border border-white/20 backdrop-blur-xl">
    {/* SECTION IMAGE GAUCHE */}
    <div
      className="w-1/2 relative bg-cover bg-center rounded-l-3xl"
      style={{ backgroundImage: "url('/images/outils.png')" }}
    >
      <div className="absolute inset-0 bg-black/50 rounded-l-3xl z-0"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white p-8">
        <h1 className="text-5xl font-extrabold tracking-wide">AI4CKD</h1>
        <p className="text-lg mt-3 text-center">Plateforme médicale intelligente</p>
      </div>
    </div>

    {/* SECTION FORMULAIRE */}
    <div className="w-1/2 p-10">
      <h2 className="text-3xl font-bold text-[#0c4687] text-center">Connexion</h2>
      <p className="text-gray-500 text-center mt-1">Accédez à votre espace professionnel</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label className="text-sm font-medium text-gray-700">Adresse email</label>
          <input
            type="email"
            placeholder="exemple@medecin.com"
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0c4687]"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Mot de passe</label>
          <input
            type="password"
            placeholder="••••••••"
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0c4687]"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#9ac441] text-white py-3 rounded-lg hover:bg-[#7fa637] transition hover:scale-[1.02] font-semibold"
        >
          Se connecter
        </button>
      </form>

      <p className="text-sm text-center text-gray-600 mt-6 hover:underline cursor-pointer">
        Mot de passe oublié ?
      </p>
    </div>
  </div>
</div>

  );
};

export default MedicalLogin;

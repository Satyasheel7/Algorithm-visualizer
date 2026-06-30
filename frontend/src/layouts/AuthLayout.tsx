import { Outlet, Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

const AuthLayout = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // Redirect to home if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(20,184,166,0.14),_transparent_35%),linear-gradient(135deg,_#f8fafc_0%,_#ecfeff_55%,_#fffbeb_100%)] dark:bg-[radial-gradient(circle_at_top,_rgba(20,184,166,0.18),_transparent_30%),linear-gradient(135deg,_#020617_0%,_#0f172a_100%)]">
      <div className="w-full max-w-md">
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/60 dark:border-slate-700/60 shadow-2xl rounded-2xl p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gradient">
              AlgoForge
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Build and explore algorithms with interactive visual stories
            </p>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { LogOut, Home } from 'lucide-react';
import { toast } from 'sonner';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    toast.success('Вы вышли из системы');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/admin/dashboard" className="text-2xl font-bold text-gray-800 hover:text-orange-600 transition-colors">
            Админ-панель
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/admin/dashboard">
              <Button variant="outline" className="flex items-center gap-2">
                <Home size={18} />
                Главная
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline">На сайт</Button>
            </Link>
            <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
              <LogOut size={18} />
              Выход
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
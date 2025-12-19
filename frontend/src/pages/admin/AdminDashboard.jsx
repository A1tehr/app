import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Newspaper, Briefcase, Package, FolderOpen, MessageSquare, Phone, Mail, LogOut } from 'lucide-react';
import { authAPI } from '../../utils/api';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    verifyAuth();
  }, []);

  const verifyAuth = async () => {
    try {
      const response = await authAPI.verify();
      setUsername(response.data.username);
    } catch (error) {
      toast.error('Сессия истекла. Войдите снова.');
      navigate('/admin');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    toast.success('Вы вышли из системы');
    navigate('/admin');
  };

  const menuItems = [
    { title: 'Новости и акции', icon: Newspaper, link: '/admin/news', color: 'blue' },
    { title: 'Услуги', icon: Briefcase, link: '/admin/services', color: 'green' },
    { title: 'Каталог продукции', icon: Package, link: '/admin/catalog', color: 'purple' },
    { title: 'Проекты', icon: FolderOpen, link: '/admin/projects', color: 'orange' },
    { title: 'Заявки на звонок', icon: Phone, link: '/admin/callbacks', color: 'red' },
    { title: 'Заказы', icon: Mail, link: '/admin/orders', color: 'indigo' },
    { title: 'Сообщения', icon: MessageSquare, link: '/admin/messages', color: 'pink' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Админ-панель</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Привет, {username}</span>
            <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
              <LogOut size={18} />
              Выход
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Панель управления</h2>
          <p className="text-gray-600">ИП Рогоянов А.А. - Электромонтажные работы</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.link} to={item.link}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-orange-500">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 bg-${item.color}-100 rounded-lg flex items-center justify-center`}>
                        <Icon className={`text-${item.color}-600`} size={24} />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
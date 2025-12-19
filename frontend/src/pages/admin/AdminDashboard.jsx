import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { 
  Newspaper, Briefcase, Package, FolderOpen, MessageSquare, Phone, Mail, LogOut,
  Sliders, Award, FileText, Settings, Image, ShoppingCart
} from 'lucide-react';
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
    // Контент
    { title: 'Новости и акции', icon: Newspaper, link: '/admin/news', color: 'blue', category: 'Контент' },
    { title: 'Услуги', icon: Briefcase, link: '/admin/services', color: 'green', category: 'Контент' },
    { title: 'Проекты (Портфолио)', icon: FolderOpen, link: '/admin/projects', color: 'orange', category: 'Контент' },
    { title: 'Карусель главной', icon: Image, link: '/admin/carousel', color: 'purple', category: 'Контент' },
    { title: 'Преимущества', icon: Award, link: '/admin/advantages', color: 'yellow', category: 'Контент' },
    { title: 'Страница "О компании"', icon: FileText, link: '/admin/about', color: 'cyan', category: 'Контент' },
    
    // Каталог
    { title: 'Категории каталога', icon: Package, link: '/admin/categories', color: 'indigo', category: 'Каталог' },
    { title: 'Товары каталога', icon: ShoppingCart, link: '/admin/products', color: 'violet', category: 'Каталог' },
    
    // Заявки
    { title: 'Заявки на звонок', icon: Phone, link: '/admin/callbacks', color: 'red', category: 'Заявки' },
    { title: 'Заказы', icon: Mail, link: '/admin/orders', color: 'rose', category: 'Заявки' },
    { title: 'Сообщения', icon: MessageSquare, link: '/admin/messages', color: 'pink', category: 'Заявки' },
    
    // Настройки
    { title: 'Настройки сайта', icon: Settings, link: '/admin/settings', color: 'gray', category: 'Настройки' }
  ];

  const groupedMenuItems = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

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
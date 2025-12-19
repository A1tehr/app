import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { toast } from 'sonner';
import api from '../../utils/api';
import AdminLayout from './AdminLayout';

const AdminSettings = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    company_name: '',
    phone: '',
    email: '',
    address: '',
    working_hours: '',
    admin_email: '',
    description: ''
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const data = await api.get('/admin/settings');
      setFormData(data);
    } catch (error) {
      toast.error('Ошибка загрузки настроек');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put('/admin/settings', formData);
      toast.success('Настройки обновлены');
      
      // Показываем сообщение о необходимости обновления страницы
      toast.info('Обновите страницу чтобы увидеть изменения', {
        duration: 5000
      });
    } catch (error) {
      toast.error('Ошибка сохранения настроек');
    }
  };

  if (loading) return <AdminLayout><div className="p-6">Загрузка...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Настройки сайта</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
          <div>
            <Label htmlFor="company_name">Название компании*</Label>
            <Input
              id="company_name"
              value={formData.company_name}
              onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Телефон*</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email*</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="address">Адрес*</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="working_hours">Часы работы*</Label>
            <Input
              id="working_hours"
              value={formData.working_hours}
              onChange={(e) => setFormData({ ...formData, working_hours: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="admin_email">Email администратора (для получения заявок)*</Label>
            <Input
              id="admin_email"
              type="email"
              value={formData.admin_email}
              onChange={(e) => setFormData({ ...formData, admin_email: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Описание компании</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
            />
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <strong>Важно:</strong> После сохранения настроек обновите публичные страницы сайта, чтобы увидеть изменения.
            </p>
          </div>

          <Button type="submit" size="lg">
            Сохранить настройки
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
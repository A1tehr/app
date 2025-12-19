import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { toast } from 'sonner';
import api from '../../utils/api';
import AdminLayout from './AdminLayout';

const AdminAbout = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    content: '',
    mission: '',
    vision: '',
    values: []
  });
  const [valueInput, setValueInput] = useState('');

  useEffect(() => {
    fetchAboutContent();
  }, []);

  const fetchAboutContent = async () => {
    try {
      const data = await api.get('/admin/about');
      setFormData(data);
    } catch (error) {
      toast.error('Ошибка загрузки контента');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put('/admin/about', formData);
      toast.success('Контент обновлен');
    } catch (error) {
      toast.error('Ошибка сохранения контента');
    }
  };

  const addValue = () => {
    if (valueInput.trim()) {
      setFormData({ ...formData, values: [...formData.values, valueInput.trim()] });
      setValueInput('');
    }
  };

  const removeValue = (index) => {
    const newValues = formData.values.filter((_, i) => i !== index);
    setFormData({ ...formData, values: newValues });
  };

  if (loading) return <AdminLayout><div className="p-6">Загрузка...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Управление страницей "О компании"</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
          <div>
            <Label htmlFor="content">Основной контент*</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={8}
              required
              placeholder="Основное описание компании..."
            />
          </div>

          <div>
            <Label htmlFor="mission">Миссия</Label>
            <Textarea
              id="mission"
              value={formData.mission}
              onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
              rows={4}
              placeholder="Миссия компании..."
            />
          </div>

          <div>
            <Label htmlFor="vision">Видение</Label>
            <Textarea
              id="vision"
              value={formData.vision}
              onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
              rows={4}
              placeholder="Видение компании..."
            />
          </div>

          <div>
            <Label>Ценности компании</Label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={valueInput}
                onChange={(e) => setValueInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addValue())}
                className="flex-1 border rounded-md p-2"
                placeholder="Добавьте ценность..."
              />
              <Button type="button" onClick={addValue}>Добавить</Button>
            </div>
            <ul className="space-y-2">
              {formData.values.map((value, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                  <span>{value}</span>
                  <Button type="button" variant="outline" size="sm" onClick={() => removeValue(index)}>
                    Удалить
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          <Button type="submit" size="lg">
            Сохранить изменения
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminAbout;
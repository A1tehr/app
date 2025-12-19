import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { toast } from 'sonner';
import api from '../../utils/api';
import AdminLayout from './AdminLayout';

const AdminAdvantages = () => {
  const [advantages, setAdvantages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingAdvantage, setEditingAdvantage] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    icon: '',
    title: '',
    description: '',
    order: 0
  });

  const icons = [
    'Shield', 'Clock', 'Award', 'FileCheck', 'Wrench', 'Headphones',
    'Zap', 'ThumbsUp', 'Star', 'CheckCircle', 'Heart', 'Target'
  ];

  useEffect(() => {
    fetchAdvantages();
  }, []);

  const fetchAdvantages = async () => {
    try {
      const data = await api.get('/admin/advantages');
      setAdvantages(data);
    } catch (error) {
      toast.error('Ошибка загрузки преимуществ');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingAdvantage) {
        await api.put(`/admin/advantages/${editingAdvantage.id}`, formData);
        toast.success('Преимущество обновлено');
      } else {
        await api.post('/admin/advantages', formData);
        toast.success('Преимущество добавлено');
      }
      setIsDialogOpen(false);
      resetForm();
      fetchAdvantages();
    } catch (error) {
      toast.error('Ошибка сохранения преимущества');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Удалить это преимущество?')) return;
    try {
      await api.delete(`/admin/advantages/${id}`);
      toast.success('Преимущество удалено');
      fetchAdvantages();
    } catch (error) {
      toast.error('Ошибка удаления преимущества');
    }
  };

  const handleEdit = (advantage) => {
    setEditingAdvantage(advantage);
    setFormData({
      icon: advantage.icon,
      title: advantage.title,
      description: advantage.description,
      order: advantage.order
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingAdvantage(null);
    setFormData({ icon: '', title: '', description: '', order: 0 });
  };

  if (loading) return <AdminLayout><div className="p-6">Загрузка...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Управление преимуществами</h1>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Добавить преимущество
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingAdvantage ? 'Редактировать преимущество' : 'Новое преимущество'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="icon">Иконка*</Label>
                  <select
                    id="icon"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full border rounded-md p-2"
                    required
                  >
                    <option value="">Выберите иконку</option>
                    {icons.map(icon => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="title">Заголовок*</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Описание*</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="order">Порядок отображения</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Отмена
                  </Button>
                  <Button type="submit">
                    {editingAdvantage ? 'Сохранить' : 'Добавить'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {advantages.map((advantage) => (
            <div key={advantage.id} className="bg-white p-6 rounded-lg shadow border">
              <div className="flex justify-between items-start mb-3">
                <div className="text-2xl">{advantage.icon}</div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(advantage)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(advantage.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2">{advantage.title}</h3>
              <p className="text-gray-600 text-sm">{advantage.description}</p>
              <p className="text-xs text-gray-500 mt-2">Порядок: {advantage.order}</p>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAdvantages;
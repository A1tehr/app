import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { toast } from 'sonner';
import { newsAPI } from '../../utils/api';
import { Trash2, Edit, Plus } from 'lucide-react';

const AdminNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    full_text: '',
    image: ''
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      const response = await newsAPI.getAll();
      setNews(response.data);
    } catch (error) {
      toast.error('Ошибка загрузки новостей');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await newsAPI.update(editingItem.id, formData);
        toast.success('Новость обновлена');
      } else {
        await newsAPI.create(formData);
        toast.success('Новость добавлена');
      }
      setDialogOpen(false);
      resetForm();
      loadNews();
    } catch (error) {
      toast.error('Ошибка сохранения');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Удалить новость?')) return;
    try {
      await newsAPI.delete(id);
      toast.success('Новость удалена');
      loadNews();
    } catch (error) {
      toast.error('Ошибка удаления');
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      full_text: item.full_text,
      image: item.image
    });
    setDialogOpen(true);
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({ title: '', description: '', full_text: '', image: '' });
  };

  if (loading) return <AdminLayout><div>Загрузка...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Новости и акции</h1>
          <Dialog open={dialogOpen} onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="bg-orange-600 hover:bg-orange-700">
                <Plus size={18} className="mr-2" />
                Добавить новость
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingItem ? 'Редактировать' : 'Добавить'} новость</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Заголовок *</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>Краткое описание *</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={2}
                    required
                  />
                </div>
                <div>
                  <Label>Полный текст *</Label>
                  <Textarea
                    value={formData.full_text}
                    onChange={(e) => setFormData({ ...formData, full_text: e.target.value })}
                    rows={6}
                    required
                  />
                </div>
                <div>
                  <Label>URL изображения *</Label>
                  <Input
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://..."
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                  {editingItem ? 'Обновить' : 'Создать'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {news.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <img src={item.image} alt={item.title} className="w-32 h-32 object-cover rounded" />
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-2">{item.description}</p>
                    <div className="text-sm text-gray-500">
                      {new Date(item.date).toLocaleDateString('ru-RU')}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                      <Edit size={16} />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(item.id)}>
                      <Trash2 size={16} className="text-red-600" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminNews;

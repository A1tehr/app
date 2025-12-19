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

const AdminCarousel = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSlide, setEditingSlide] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    link: '',
    order: 0
  });

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const data = await api.get('/admin/carousel');
      setSlides(data);
    } catch (error) {
      toast.error('Ошибка загрузки слайдов');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSlide) {
        await api.put(`/admin/carousel/${editingSlide.id}`, formData);
        toast.success('Слайд обновлен');
      } else {
        await api.post('/admin/carousel', formData);
        toast.success('Слайд добавлен');
      }
      setIsDialogOpen(false);
      resetForm();
      fetchSlides();
    } catch (error) {
      toast.error('Ошибка сохранения слайда');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Удалить этот слайд?')) return;
    try {
      await api.delete(`/admin/carousel/${id}`);
      toast.success('Слайд удален');
      fetchSlides();
    } catch (error) {
      toast.error('Ошибка удаления слайда');
    }
  };

  const handleEdit = (slide) => {
    setEditingSlide(slide);
    setFormData({
      title: slide.title,
      description: slide.description,
      image: slide.image,
      link: slide.link,
      order: slide.order
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingSlide(null);
    setFormData({ title: '', description: '', image: '', link: '', order: 0 });
  };

  if (loading) return <AdminLayout><div className="p-6">Загрузка...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Управление каруселью</h1>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Добавить слайд
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingSlide ? 'Редактировать слайд' : 'Новый слайд'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="image">URL изображения*</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://..."
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="link">Ссылка*</Label>
                  <Input
                    id="link"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    placeholder="/services"
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
                    {editingSlide ? 'Сохранить' : 'Добавить'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {slides.map((slide) => (
            <div key={slide.id} className="bg-white p-6 rounded-lg shadow border flex gap-4">
              <img src={slide.image} alt={slide.title} className="w-32 h-20 object-cover rounded" />
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1">{slide.title}</h3>
                <p className="text-gray-600 text-sm mb-1">{slide.description}</p>
                <p className="text-xs text-gray-500">Ссылка: {slide.link} | Порядок: {slide.order}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(slide)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(slide.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCarousel;
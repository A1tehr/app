import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import AdminLayout from './AdminLayout';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    product_count: 0,
    subcategories: []
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await api.get('/admin/categories');
      setCategories(data);
    } catch (error) {
      toast.error('Ошибка загрузки категорий');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await api.put(`/admin/categories/${editingCategory.id}`, formData);
        toast.success('Категория обновлена');
      } else {
        await api.post('/admin/categories', formData);
        toast.success('Категория добавлена');
      }
      setIsDialogOpen(false);
      resetForm();
      fetchCategories();
    } catch (error) {
      toast.error('Ошибка сохранения категории');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Удалить эту категорию?')) return;
    try {
      await api.delete(`/admin/categories/${id}`);
      toast.success('Категория удалена');
      fetchCategories();
    } catch (error) {
      toast.error('Ошибка удаления категории');
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      image: category.image,
      product_count: category.product_count || 0,
      subcategories: category.subcategories || []
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingCategory(null);
    setFormData({ name: '', image: '', product_count: 0, subcategories: [] });
  };

  if (loading) return <AdminLayout><div className="p-6">Загрузка...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Управление категориями</h1>
            <p className="text-gray-600 mt-1">
              Категории каталога продукции. <Link to="/admin/products" className="text-blue-600 hover:underline">Управление товарами →</Link>
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Добавить категорию
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingCategory ? 'Редактировать категорию' : 'Новая категория'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Название*</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  <Label htmlFor="product_count">Количество товаров</Label>
                  <Input
                    id="product_count"
                    type="number"
                    value={formData.product_count}
                    onChange={(e) => setFormData({ ...formData, product_count: parseInt(e.target.value) || 0 })}
                  />
                  <p className="text-sm text-gray-500 mt-1">Обновляется автоматически при добавлении товаров</p>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Отмена
                  </Button>
                  <Button type="submit">
                    {editingCategory ? 'Сохранить' : 'Добавить'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow border overflow-hidden">
              <img src={category.image} alt={category.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600 mb-3">Товаров: {category.product_count || 0}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(category)} className="flex-1">
                    <Pencil className="w-4 h-4 mr-1" />
                    Редактировать
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(category.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCategories;

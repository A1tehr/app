import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { toast } from 'sonner';

const CallbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    consent: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      toast.error('Пожалуйста, заполните все обязательные поля');
      return;
    }

    if (!formData.consent) {
      toast.error('Необходимо согласие на обработку персональных данных');
      return;
    }

    // Mock: save to localStorage
    const callbacks = JSON.parse(localStorage.getItem('callbacks') || '[]');
    callbacks.push({
      ...formData,
      date: new Date().toISOString(),
      type: 'callback'
    });
    localStorage.setItem('callbacks', JSON.stringify(callbacks));

    toast.success('Спасибо! Мы свяжемся с вами в ближайшее время.');
    setFormData({ name: '', phone: '', consent: false });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Ваше имя *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Введите ваше имя"
          required
        />
      </div>

      <div>
        <Label htmlFor="phone">Телефон *</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="+7 (___) ___-__-__"
          required
        />
      </div>

      <div className="flex items-start gap-2">
        <Checkbox
          id="consent"
          checked={formData.consent}
          onCheckedChange={(checked) => setFormData({ ...formData, consent: checked })}
        />
        <Label htmlFor="consent" className="text-sm leading-tight cursor-pointer">
          Я согласен на обработку персональных данных
        </Label>
      </div>

      <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
        Отправить заявку
      </Button>
    </form>
  );
};

export default CallbackForm;
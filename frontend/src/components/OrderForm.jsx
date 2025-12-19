import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { toast } from 'sonner';
import MathCaptcha from './MathCaptcha';
import { formsAPI } from '../utils/api';

const OrderForm = ({ productName, serviceName, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    comment: '',
    consent: false
  });
  const [captcha, setCaptcha] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCaptchaError('');
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Пожалуйста, заполните все обязательные поля');
      return;
    }

    if (!formData.consent) {
      toast.error('Необходимо согласие на обработку персональных данных');
      return;
    }

    if (!captcha) {
      setCaptchaError('Пожалуйста, решите пример');
      return;
    }

    setLoading(true);
    try {
      await formsAPI.submitOrder({
        ...formData,
        product: productName,
        service: serviceName
      });
      toast.success('Спасибо за заказ! Мы свяжемся с вами в ближайшее время.');
      setFormData({ name: '', email: '', phone: '', comment: '', consent: false });
      setCaptcha('');
      if (onClose) onClose();
    } catch (error) {
      console.error('Error submitting order:', error);
      toast.error('Произошла ошибка. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
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
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="example@mail.ru"
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

      <div>
        <Label htmlFor="comment">Комментарий</Label>
        <Textarea
          id="comment"
          value={formData.comment}
          onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
          placeholder="Дополнительная информация к заказу"
          rows={3}
        />
      </div>

      <MathCaptcha 
        value={captcha}
        onChange={setCaptcha}
        error={captchaError}
      />

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

      <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" disabled={loading}>
        {loading ? 'Отправка...' : 'Отправить заявку'}
      </Button>
    </form>
  );
};

export default OrderForm;
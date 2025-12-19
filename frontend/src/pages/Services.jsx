import React, { useState, useEffect } from 'react';
import { Home, Building2, Store, Factory, Settings, FileText, Lightbulb, Grid3x3, Shield, Smartphone } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import OrderForm from '../components/OrderForm';
import api from '../utils/api';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await api.get('/services');
      setServices(data);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setLoading(false);
    }
  };

  const iconMap = {
    Home,
    Building2,
    Store,
    Factory,
    Settings,
    FileText,
    Lightbulb,
    Grid3x3,
    Shield,
    Smartphone
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">Загрузка...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Наши услуги</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Предлагаем полный спектр электромонтажных работ для физических и юридических лиц.
            Качественно и в срок.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <Card key={service.id} className="hover:shadow-lg transition-shadow border-2 hover:border-orange-500">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-orange-500 rounded-lg flex items-center justify-center">
                        <Icon size={32} className="text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3 text-gray-800">{service.title}</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="bg-orange-600 hover:bg-orange-700">
                            Заказать услугу
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Заказ услуги: {service.title}</DialogTitle>
                          </DialogHeader>
                          <OrderForm serviceName={service.title} />
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to action */}
        <Card className="mt-12 bg-gradient-to-r from-orange-600 to-orange-500 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Нужна консультация?</h2>
            <p className="mb-6 text-orange-50">
              Свяжитесь с нами, и мы поможем подобрать оптимальное решение для вашего объекта
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-orange-50">
                  Заказать звонок
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Заказать консультацию</DialogTitle>
                </DialogHeader>
                <OrderForm serviceName="Консультация" />
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Services;
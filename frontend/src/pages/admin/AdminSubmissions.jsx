import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { toast } from 'sonner';
import { submissionsAPI } from '../../utils/api';

const AdminCallbacks = () => {
  const [callbacks, setCallbacks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [callbacksRes, ordersRes, messagesRes] = await Promise.all([
        submissionsAPI.getCallbacks(),
        submissionsAPI.getOrders(),
        submissionsAPI.getMessages()
      ]);
      setCallbacks(callbacksRes.data);
      setOrders(ordersRes.data);
      setMessages(messagesRes.data);
    } catch (error) {
      toast.error('Ошибка загрузки данных');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (type, id, status) => {
    try {
      if (type === 'callback') {
        await submissionsAPI.updateCallbackStatus(id, status);
      } else if (type === 'order') {
        await submissionsAPI.updateOrderStatus(id, status);
      } else {
        await submissionsAPI.updateMessageStatus(id, status);
      }
      toast.success('Статус обновлен');
      loadData();
    } catch (error) {
      toast.error('Ошибка обновления');
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      new: { label: 'Новая', className: 'bg-blue-100 text-blue-800' },
      processed: { label: 'В работе', className: 'bg-yellow-100 text-yellow-800' },
      completed: { label: 'Выполнено', className: 'bg-green-100 text-green-800' }
    };
    const variant = variants[status] || variants.new;
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  if (loading) return <AdminLayout><div>Загрузка...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Заявки от клиентов</h1>

        <Tabs defaultValue="callbacks">
          <TabsList>
            <TabsTrigger value="callbacks">
              Обратные звонки ({callbacks.length})
            </TabsTrigger>
            <TabsTrigger value="orders">
              Заказы ({orders.length})
            </TabsTrigger>
            <TabsTrigger value="messages">
              Сообщения ({messages.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="callbacks" className="space-y-4 mt-6">
            {callbacks.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold">{item.name}</h3>
                      <p className="text-gray-600">{item.phone}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(item.date).toLocaleString('ru-RU')}
                      </p>
                    </div>
                    {getStatusBadge(item.status)}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => updateStatus('callback', item.id, 'processed')}>
                      В работу
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => updateStatus('callback', item.id, 'completed')}>
                      Выполнено
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            {callbacks.length === 0 && (
              <div className="text-center text-gray-500 py-8">Заявок пока нет</div>
            )}
          </TabsContent>

          <TabsContent value="orders" className="space-y-4 mt-6">
            {orders.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold">{item.name}</h3>
                      <p className="text-gray-600">{item.phone} | {item.email}</p>
                      {item.product && <p className="text-sm mt-1"><strong>Продукт:</strong> {item.product}</p>}
                      {item.service && <p className="text-sm mt-1"><strong>Услуга:</strong> {item.service}</p>}
                      {item.comment && <p className="text-sm mt-1"><strong>Комментарий:</strong> {item.comment}</p>}
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(item.date).toLocaleString('ru-RU')}
                      </p>
                    </div>
                    {getStatusBadge(item.status)}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => updateStatus('order', item.id, 'processed')}>
                      В работу
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => updateStatus('order', item.id, 'completed')}>
                      Выполнено
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            {orders.length === 0 && (
              <div className="text-center text-gray-500 py-8">Заказов пока нет</div>
            )}
          </TabsContent>

          <TabsContent value="messages" className="space-y-4 mt-6">
            {messages.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-grow">
                      <h3 className="text-lg font-bold">{item.name}</h3>
                      <p className="text-gray-600">{item.phone} | {item.email}</p>
                      <div className="mt-3 p-3 bg-gray-50 rounded border-l-4 border-orange-600">
                        {item.message}
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        {new Date(item.date).toLocaleString('ru-RU')}
                      </p>
                    </div>
                    {getStatusBadge(item.status)}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => updateStatus('message', item.id, 'processed')}>
                      В работу
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => updateStatus('message', item.id, 'completed')}>
                      Выполнено
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            {messages.length === 0 && (
              <div className="text-center text-gray-500 py-8">Сообщений пока нет</div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminCallbacks;

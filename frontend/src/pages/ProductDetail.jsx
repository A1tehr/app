import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { products } from '../mockData';
import OrderForm from '../components/OrderForm';

const ProductDetail = () => {
  const { productId } = useParams();
  const product = products.find(p => p.id === parseInt(productId));

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Товар не найден</h1>
          <Link to="/catalog">
            <Button className="bg-orange-600 hover:bg-orange-700">Вернуться в каталог</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-orange-600">Главная</Link>
          <ChevronRight size={16} />
          <Link to="/catalog" className="hover:text-orange-600">Каталог</Link>
          <ChevronRight size={16} />
          <span className="text-gray-800 font-medium">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Product image */}
          <Card className="overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[500px] object-cover"
            />
          </Card>

          {/* Product info */}
          <div>
            <div className="text-sm text-gray-500 mb-2">Артикул: {product.article}</div>
            <h1 className="text-3xl font-bold mb-6 text-gray-800">{product.name}</h1>

            <div className="mb-6">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-orange-600 hover:bg-orange-700 w-full md:w-auto">
                    Заказать
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Заказ товара: {product.name}</DialogTitle>
                  </DialogHeader>
                  <OrderForm productName={product.name} />
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-3 text-gray-800">Основная информация</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs */}
        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="description">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="description">Описание</TabsTrigger>
                <TabsTrigger value="specifications">Характеристики</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-6">
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>
              </TabsContent>
              <TabsContent value="specifications" className="mt-6">
                {product.specifications && product.specifications.length > 0 ? (
                  <table className="w-full">
                    <tbody>
                      {product.specifications.map((spec, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3 font-medium text-gray-700 w-1/3">{spec.key}</td>
                          <td className="py-3 text-gray-600">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-gray-600">Технические характеристики уточняйте у менеджера</p>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetail;
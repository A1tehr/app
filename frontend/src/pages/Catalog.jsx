import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, Package } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { categories, products } from '../mockData';

const Catalog = () => {
  const { categoryId } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(categoryId ? parseInt(categoryId) : null);

  const currentCategory = categories.find(c => c.id === selectedCategory);
  const categoryProducts = selectedCategory
    ? products.filter(p => {
        const category = categories.find(c => c.id === selectedCategory);
        if (!category) return false;
        const subcategoryIds = category.subcategories?.map(s => s.id) || [];
        return [selectedCategory, ...subcategoryIds].includes(p.categoryId);
      })
    : [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-orange-600">Главная</Link>
          <ChevronRight size={16} />
          <span className="text-gray-800 font-medium">Каталог</span>
          {currentCategory && (
            <>
              <ChevronRight size={16} />
              <span className="text-gray-800 font-medium">{currentCategory.name}</span>
            </>
          )}
        </div>

        <h1 className="text-4xl font-bold mb-8 text-gray-800">
          {currentCategory ? currentCategory.name : 'Каталог продукции'}
        </h1>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar with categories */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-4 text-gray-800">Категории</h3>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedCategory === null
                        ? 'bg-orange-100 text-orange-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Все категории
                  </button>
                  {categories.map((category) => (
                    <div key={category.id}>
                      <button
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          selectedCategory === category.id
                            ? 'bg-orange-100 text-orange-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {category.name}
                        <span className="text-xs ml-2 text-gray-500">({category.productCount})</span>
                      </button>
                      {selectedCategory === category.id && category.subcategories && (
                        <div className="ml-4 mt-1 space-y-1">
                          {category.subcategories.map((sub) => (
                            <button
                              key={sub.id}
                              className="w-full text-left px-3 py-1.5 rounded-md text-xs text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                              {sub.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3">
            {!selectedCategory ? (
              // Show categories
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className="text-left group"
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-all border-2 hover:border-orange-500">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                          <div className="p-4 text-white">
                            <div className="text-sm font-semibold">
                              {category.productCount} товаров
                            </div>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="text-lg font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
                          {category.name}
                        </h3>
                      </CardContent>
                    </Card>
                  </button>
                ))}
              </div>
            ) : categoryProducts.length > 0 ? (
              // Show products
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <Link to={`/catalog/product/${product.id}`}>
                      <div className="relative h-48 overflow-hidden bg-gray-100">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="text-xs text-gray-500 mb-2">Артикул: {product.article}</div>
                        <h3 className="text-lg font-bold mb-2 text-gray-800 hover:text-orange-600 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                        <Button className="w-full bg-orange-600 hover:bg-orange-700">
                          Подробнее
                        </Button>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            ) : (
              // No products
              <Card className="p-12 text-center">
                <Package size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Товары в данной категории скоро появятся</h3>
                <p className="text-gray-600">Мы работаем над наполнением каталога</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
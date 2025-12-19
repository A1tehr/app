import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { news } from '../mockData';

const NewsList = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Новости и акции</h1>
        
        <div className="space-y-6">
          {news.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <CardContent className="md:w-2/3 p-6">
                  <div className="flex items-center gap-2 text-sm text-orange-600 mb-3">
                    <Calendar size={16} />
                    <span>
                      {new Date(item.date).toLocaleDateString('ru-RU', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">{item.title}</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">{item.description}</p>
                  <Link to={`/news/${item.id}`}>
                    <Button className="bg-orange-600 hover:bg-orange-700">
                      Читать полностью
                    </Button>
                  </Link>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

const NewsDetail = () => {
  const { newsId } = useParams();
  const article = news.find(n => n.id === parseInt(newsId));

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Новость не найдена</h1>
          <Link to="/news">
            <Button className="bg-orange-600 hover:bg-orange-700">Вернуться к новостям</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Link to="/news">
          <Button variant="ghost" className="mb-6 text-orange-600 hover:text-orange-700">
            <ArrowLeft className="mr-2" size={18} />
            Вернуться к новостям
          </Button>
        </Link>

        <Card className="overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-[400px] object-cover"
          />
          <CardContent className="p-8">
            <div className="flex items-center gap-2 text-sm text-orange-600 mb-4">
              <Calendar size={16} />
              <span>
                {new Date(article.date).toLocaleDateString('ru-RU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-6 text-gray-800">{article.title}</h1>
            <div className="prose max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                {article.fullText}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export { NewsList, NewsDetail };
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Clock, Award, FileCheck, Wrench, Headphones, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { carouselSlides, companyInfo, advantages, news, categories } from '../mockData';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  const iconMap = {
    Shield,
    Clock,
    Award,
    FileCheck,
    Wrench,
    Headphones
  };

  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <section className="relative h-[500px] overflow-hidden">
        {carouselSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="w-full h-full bg-gradient-to-r from-black/70 to-black/40 flex items-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-2xl text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h1>
                    <p className="text-xl mb-8">{slide.description}</p>
                    <Link to={slide.link}>
                      <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                        Подробнее <ArrowRight className="ml-2" size={20} />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-sm p-3 rounded-full transition-all"
        >
          <ChevronLeft size={24} className="text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-sm p-3 rounded-full transition-all"
        >
          <ChevronRight size={24} className="text-white" />
        </button>

        {/* Carousel indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {carouselSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-orange-600 w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* About company section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&h=400&fit=crop"
                alt="О компании"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">О компании</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {companyInfo.description}
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Мы специализируемся на выполнении электромонтажных работ любой сложности - от квартир и частных домов до крупных промышленных объектов. Наши специалисты имеют все необходимые допуски и сертификаты.
              </p>
              <Link to="/about">
                <Button variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50">
                  Подробнее <ArrowRight className="ml-2" size={18} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Наши преимущества</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage) => {
              const Icon = iconMap[advantage.icon];
              return (
                <Card key={advantage.id} className="border-2 border-gray-200 hover:border-orange-500 transition-all hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-600 to-orange-500 rounded-lg flex items-center justify-center mb-4">
                      <Icon size={28} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800">{advantage.title}</h3>
                    <p className="text-gray-600">{advantage.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* News section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Последние новости</h2>
            <Link to="/news">
              <Button variant="ghost" className="text-orange-600 hover:text-orange-700">
                Все новости <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {news.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                <CardContent className="p-6">
                  <div className="text-sm text-orange-600 mb-2">
                    {new Date(item.date).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <Link to={`/news/${item.id}`}>
                    <Button variant="link" className="text-orange-600 hover:text-orange-700 p-0">
                      Подробнее <ArrowRight className="ml-2" size={16} />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Catalog preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Каталог продукции</h2>
            <Link to="/catalog">
              <Button variant="ghost" className="text-orange-600 hover:text-orange-700">
                Весь каталог <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.slice(0, 10).map((category) => (
              <Link
                key={category.id}
                to={`/catalog/${category.id}`}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all border-2 hover:border-orange-500">
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                      <div className="p-3 text-white text-xs font-semibold">
                        {category.productCount} товаров
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <h3 className="text-sm font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
                      {category.name}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
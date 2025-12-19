import React from 'react';
import { Award, Users, Target, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { companyInfo } from '../mockData';

const About = () => {
  const stats = [
    { icon: Award, value: '10+', label: 'Лет на рынке' },
    { icon: Users, value: '500+', label: 'Довольных клиентов' },
    { icon: Target, value: '1000+', label: 'Реализованных проектов' },
    { icon: TrendingUp, value: '100%', label: 'Гарантия качества' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section */}
      <section className="relative h-[300px] bg-gradient-to-r from-orange-600 to-orange-500">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-4">О компании</h1>
            <p className="text-xl text-orange-50">{companyInfo.name}</p>
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section className="py-12 -mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-600 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon size={28} className="text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* About content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Кто мы?</h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    {companyInfo.name} - это команда профессионалов с многолетним опытом в сфере электромонтажных работ.
                    Мы работаем на рынке более 10 лет и за это время реализовали более 1000 проектов различной сложности.
                  </p>
                  <p>
                    Наша компания специализируется на предоставлении полного спектра электромонтажных услуг
                    для физических и юридических лиц, занимающихся строительством. Мы выполняем работы
                    любой сложности - от небольших квартир до крупных промышленных объектов.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Наши принципы</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-orange-600 mb-2">Качество</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Мы используем только сертифицированные материалы и оборудование от проверенных
                      поставщиков. Все работы выполняются в соответствии с действующими нормами и стандартами.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-orange-600 mb-2">Надежность</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Мы гарантируем соблюдение сроков и выполнение всех договорных обязательств.
                      Предоставляем гарантию на все виды выполненных работ.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-orange-600 mb-2">Профессионализм</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Все наши специалисты имеют соответствующую квалификацию, допуски и
                      сертификаты. Мы постоянно повышаем квалификацию наших сотрудников и следим
                      за новыми технологиями в отрасли.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Почему выбирают нас?</h2>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Более 10 лет успешной работы на рынке электромонтажных услуг</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Команда опытных специалистов с всеми необходимыми допусками</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Использование современного оборудования и сертифицированных материалов</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Гарантия качества на все виды работ</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Соблюдение сроков и договорных обязательств</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Гибкая ценовая политика</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Полный пакет документов по завершении работ</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
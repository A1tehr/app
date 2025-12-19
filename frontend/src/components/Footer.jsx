import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { companyInfo } from '../mockData';
import Logo from './Logo';

const Footer = () => {
  const menuItems = [
    { path: '/', label: 'Главная' },
    { path: '/catalog', label: 'Наша продукция' },
    { path: '/services', label: 'Услуги' },
    { path: '/news', label: 'Новости и акции' },
    { path: '/projects', label: 'Наши проекты' },
    { path: '/about', label: 'О компании' },
    { path: '/contacts', label: 'Контакты' }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <div className="mb-4">
              <Logo size="small" className="text-white [&_span]:text-white [&_.text-gray-600]:text-gray-400" />
            </div>
            <p className="text-sm leading-relaxed">
              {companyInfo.description}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-bold mb-4">Быстрые ссылки</h3>
            <ul className="space-y-2">
              {menuItems.slice(0, 4).map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-sm hover:text-orange-500 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4 opacity-0">Ссылки</h3>
            <ul className="space-y-2">
              {menuItems.slice(4).map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-sm hover:text-orange-500 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-white font-bold mb-4">Контактная информация</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin size={18} className="text-orange-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{companyInfo.address}</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={18} className="text-orange-500 flex-shrink-0 mt-0.5" />
                <a href={`tel:${companyInfo.phone}`} className="text-sm hover:text-orange-500 transition-colors">
                  {companyInfo.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={18} className="text-orange-500 flex-shrink-0 mt-0.5" />
                <a href={`mailto:${companyInfo.email}`} className="text-sm hover:text-orange-500 transition-colors">
                  {companyInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={18} className="text-orange-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{companyInfo.workingHours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2025 {companyInfo.name}. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
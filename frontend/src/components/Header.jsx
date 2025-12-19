import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { companyInfo } from '../mockData';
import CallbackForm from './CallbackForm';
import Logo from './Logo';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Главная' },
    { path: '/catalog', label: 'Наша продукция' },
    { path: '/services', label: 'Услуги' },
    { path: '/news', label: 'Новости и акции' },
    { path: '/projects', label: 'Наши проекты' },
    { path: '/about', label: 'О компании' },
    { path: '/contacts', label: 'Контакты' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-6">
              <a href={`tel:${companyInfo.phone}`} className="flex items-center gap-2 hover:text-orange-100 transition-colors">
                <Phone size={16} />
                <span>{companyInfo.phone}</span>
              </a>
              <a href={`mailto:${companyInfo.email}`} className="flex items-center gap-2 hover:text-orange-100 transition-colors">
                <Mail size={16} />
                <span>{companyInfo.email}</span>
              </a>
            </div>
            <div className="hidden md:block text-sm">
              {companyInfo.workingHours}
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-500 rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <div className="text-xl font-bold text-gray-800">{companyInfo.name}</div>
              <div className="text-xs text-gray-600">Электромонтажные работы</div>
            </div>
          </Link>

          {/* Desktop menu */}
          <nav className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-orange-100 text-orange-700'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-orange-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Call button */}
          <div className="hidden lg:block">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                  Заказать звонок
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Заказать звонок</DialogTitle>
                </DialogHeader>
                <CallbackForm />
              </DialogContent>
            </Dialog>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t pt-4">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-orange-100 text-orange-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 px-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                    Заказать звонок
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Заказать звонок</DialogTitle>
                  </DialogHeader>
                  <CallbackForm />
                </DialogContent>
              </Dialog>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
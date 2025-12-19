import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Services from './pages/Services';
import { NewsList, NewsDetail } from './pages/News';
import About from './pages/About';
import Projects from './pages/Projects';
import Contacts from './pages/Contacts';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminNews from './pages/admin/AdminNews';
import AdminSubmissions from './pages/admin/AdminSubmissions';
import AdminServices from './pages/admin/AdminServices';
import AdminCarousel from './pages/admin/AdminCarousel';
import AdminAdvantages from './pages/admin/AdminAdvantages';
import AdminProjects from './pages/admin/AdminProjects';
import AdminCategories from './pages/admin/AdminCategories';
import AdminProducts from './pages/admin/AdminProducts';
import AdminAbout from './pages/admin/AdminAbout';
import AdminSettings from './pages/admin/AdminSettings';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow"><Home /></main>
            <Footer />
          </div>
        } />
        <Route path="/catalog" element={
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow"><Catalog /></main>
            <Footer />
          </div>
        } />
        <Route path="/catalog/:categoryId" element={
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow"><Catalog /></main>
            <Footer />
          </div>
        } />
        <Route path="/catalog/product/:productId" element={
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow"><ProductDetail /></main>
            <Footer />
          </div>
        } />
        <Route path="/services" element={
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow"><Services /></main>
            <Footer />
          </div>
        } />
        <Route path="/news" element={
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow"><NewsList /></main>
            <Footer />
          </div>
        } />
        <Route path="/news/:newsId" element={
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow"><NewsDetail /></main>
            <Footer />
          </div>
        } />
        <Route path="/about" element={
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow"><About /></main>
            <Footer />
          </div>
        } />
        <Route path="/projects" element={
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow"><Projects /></main>
            <Footer />
          </div>
        } />
        <Route path="/contacts" element={
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow"><Contacts /></main>
            <Footer />
          </div>
        } />

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute><AdminDashboard /></ProtectedRoute>
        } />
        <Route path="/admin/news" element={
          <ProtectedRoute><AdminNews /></ProtectedRoute>
        } />
        <Route path="/admin/services" element={
          <ProtectedRoute><AdminServices /></ProtectedRoute>
        } />
        <Route path="/admin/carousel" element={
          <ProtectedRoute><AdminCarousel /></ProtectedRoute>
        } />
        <Route path="/admin/advantages" element={
          <ProtectedRoute><AdminAdvantages /></ProtectedRoute>
        } />
        <Route path="/admin/projects" element={
          <ProtectedRoute><AdminProjects /></ProtectedRoute>
        } />
        <Route path="/admin/categories" element={
          <ProtectedRoute><AdminCategories /></ProtectedRoute>
        } />
        <Route path="/admin/products" element={
          <ProtectedRoute><AdminProducts /></ProtectedRoute>
        } />
        <Route path="/admin/about" element={
          <ProtectedRoute><AdminAbout /></ProtectedRoute>
        } />
        <Route path="/admin/settings" element={
          <ProtectedRoute><AdminSettings /></ProtectedRoute>
        } />
        <Route path="/admin/callbacks" element={
          <ProtectedRoute><AdminSubmissions /></ProtectedRoute>
        } />
        <Route path="/admin/orders" element={
          <ProtectedRoute><AdminSubmissions /></ProtectedRoute>
        } />
        <Route path="/admin/messages" element={
          <ProtectedRoute><AdminSubmissions /></ProtectedRoute>
        } />
      </Routes>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;
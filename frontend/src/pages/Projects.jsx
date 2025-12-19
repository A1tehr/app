import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Card } from '../components/ui/card';
import { projects } from '../mockData';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openLightbox = (project, imageIndex) => {
    setSelectedProject(project);
    setSelectedImageIndex(imageIndex);
  };

  const closeLightbox = () => {
    setSelectedProject(null);
    setSelectedImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProject) {
      setSelectedImageIndex((prev) => (prev + 1) % selectedProject.images.length);
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setSelectedImageIndex((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Наши проекты</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Портфолио реализованных проектов. Мы гордимся каждой завершенной работой.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden group">
              <div className="relative">
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-64 object-cover cursor-pointer group-hover:scale-105 transition-transform duration-300"
                  onClick={() => openLightbox(project, 0)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <h3 className="text-white font-bold text-lg">{project.title}</h3>
                </div>
              </div>
              <div className="p-4 bg-white">
                <div className="flex gap-2">
                  {project.images.slice(1).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${project.title} ${index + 2}`}
                      className="w-16 h-16 object-cover rounded cursor-pointer hover:opacity-75 transition-opacity"
                      onClick={() => openLightbox(project, index + 1)}
                    />
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-orange-500 transition-colors"
          >
            <X size={32} />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-orange-500 transition-colors"
          >
            ‹
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-orange-500 transition-colors"
          >
            ›
          </button>

          <div className="max-w-5xl w-full">
            <img
              src={selectedProject.images[selectedImageIndex]}
              alt={selectedProject.title}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            <div className="text-center mt-4">
              <h3 className="text-white text-xl font-bold mb-2">{selectedProject.title}</h3>
              <p className="text-gray-300">
                {selectedImageIndex + 1} / {selectedProject.images.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
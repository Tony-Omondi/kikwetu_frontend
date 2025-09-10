import { useState, useEffect } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

function Gallery({ gallery }) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [inView, setInView] = useState(false);

  // Extract unique categories from gallery items
  const categories = ['all', ...new Set(gallery.map(item => item.category || 'uncategorized'))];

  // Filter gallery based on selected category
  const filteredGallery = activeCategory === 'all' 
    ? gallery 
    : gallery.filter(item => item.category === activeCategory);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('gallery');
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75) {
          setInView(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="gallery" className="py-5 py-md-7 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="text-brand-black fw-bold mb-3 display-5" style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease'
          }}>
            Our <span className="text-brand-red">Gallery</span>
          </h2>
          <p className="lead text-muted max-w-600 mx-auto" style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s'
          }}>
            A glimpse into our world of culinary artistry and memorable events we've catered.
          </p>
        </div>

        {/* Category Filters */}
        <div className="row justify-content-center mb-5" style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s'
        }}>
          <div className="col-12">
            <div className="d-flex flex-wrap justify-content-center gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  className={`btn rounded-pill px-4 py-2 ${activeCategory === category ? 'btn-brand-red text-white' : 'btn-outline-brand-red'}`}
                  onClick={() => setActiveCategory(category)}
                  style={{
                    transition: 'all 0.3s ease',
                    textTransform: 'capitalize'
                  }}
                >
                  {category.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="row g-3 gallery-grid" style={{
          opacity: inView ? 1 : 0,
          transition: 'opacity 0.8s ease 0.4s'
        }}>
          {filteredGallery.map((image, index) => (
            <div 
              key={image.id} 
              className="col-6 col-md-4 col-lg-3 gallery-item"
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: inView ? 'fadeInUp 0.6s ease forwards' : 'none'
              }}
            >
              <div className="gallery-card position-relative overflow-hidden rounded-4 shadow-sm">
                <img
                  src={`http://127.0.0.1:8000${image.image}`}
                  alt={image.caption}
                  className="w-100 h-auto object-fit-cover"
                  onClick={() => {
                    // Find the index in the original gallery array
                    const originalIndex = gallery.findIndex(img => img.id === image.id);
                    setPhotoIndex(originalIndex);
                    setIsOpen(true);
                  }}
                  style={{ 
                    cursor: 'pointer',
                    transition: 'transform 0.5s ease'
                  }}
                  onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                />
                
                {/* Overlay on hover */}
                <div className="gallery-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center opacity-0"
                  style={{
                    background: 'rgba(239, 68, 68, 0.8)',
                    transition: 'opacity 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    const originalIndex = gallery.findIndex(img => img.id === image.id);
                    setPhotoIndex(originalIndex);
                    setIsOpen(true);
                  }}
                >
                  <span className="material-symbols-outlined text-white" style={{ fontSize: '2.5rem' }}>
                    zoom_in
                  </span>
                </div>
                
                {/* Caption */}
                {image.caption && (
                  <div className="position-absolute bottom-0 start-0 w-100 p-3 text-white"
                    style={{
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                      opacity: 0,
                      transition: 'opacity 0.3s ease'
                    }}
                  >
                    <p className="mb-0 small">{image.caption}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredGallery.length === 0 && (
          <div className="text-center py-5" style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s'
          }}>
            <span className="material-symbols-outlined text-muted" style={{ fontSize: '4rem' }}>
              photo_library
            </span>
            <p className="mt-3 text-muted">No images found in this category.</p>
          </div>
        )}
      </div>

      {isOpen && (
        <Lightbox
          mainSrc={`http://127.0.0.1:8000${gallery[photoIndex].image}`}
          nextSrc={`http://127.0.0.1:8000${gallery[(photoIndex + 1) % gallery.length].image}`}
          prevSrc={`http://127.0.0.1:8000${gallery[(photoIndex + gallery.length - 1) % gallery.length].image}`}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() => setPhotoIndex((photoIndex + gallery.length - 1) % gallery.length)}
          onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % gallery.length)}
          imageCaption={
            <div>
              <h5 className="text-brand-red mb-2">{gallery[photoIndex].caption}</h5>
              {gallery[photoIndex].description && (
                <p className="text-muted mb-0">{gallery[photoIndex].description}</p>
              )}
            </div>
          }
          enableZoom={true}
          reactModalStyle={{
            overlay: {
              zIndex: 1050,
              backgroundColor: 'rgba(0, 0, 0, 0.9)'
            }
          }}
        />
      )}

      <style>{`
        .gallery-card:hover .gallery-overlay,
        .gallery-card:hover .position-absolute.bottom-0 {
          opacity: 1 !important;
        }
        
        .gallery-item {
          animation-fill-mode: both;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .max-w-600 {
          max-width: 600px;
        }
        
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1rem;
        }
        
        @media (max-width: 768px) {
          .gallery-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          }
        }
      `}</style>
    </section>
  );
}

export default Gallery;
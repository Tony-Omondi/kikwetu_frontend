import { useState, useEffect, useRef } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

function Gallery({ gallery }) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [inView, setInView] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});
  const sectionRef = useRef(null);

  // Extract unique categories, excluding undefined or 'uncategorized'
  const categories = ['all', ...new Set(
    gallery
      .map(item => item.category || 'General')
      .filter(category => category !== 'uncategorized')
  )];

  // Filter gallery based on selected category
  const filteredGallery = activeCategory === 'all' 
    ? gallery 
    : gallery.filter(item => (item.category || 'General') === activeCategory);

  // Detect scroll for animation with IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleImageLoad = (id) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };

  // Helper to get absolute image URL
  const getImageUrl = (image) => image.image_url || image.image || '/gallery-placeholder.jpg';

  return (
    <section id="gallery" className="gallery-section" ref={sectionRef}>
      <div className="container">
        {/* Section Header */}
        <div className={`section-header ${inView ? 'in-view' : ''}`}>
          <div className="section-badge">Visual Showcase</div>
          <h2>
            Our <span className="text-accent">Gallery</span>
          </h2>
          <p>
            A glimpse into our world of culinary artistry and memorable events we've catered.
          </p>
        </div>

        {/* Category Filters */}
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-button ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
              aria-label={`Filter gallery by ${category} category`}
            >
              {category.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {filteredGallery.length > 0 ? (
            filteredGallery.map((image, index) => {
              const imageLoaded = loadedImages[image.id];
              
              return (
                <div 
                  key={image.id} 
                  className={`gallery-item ${inView ? 'in-view' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="gallery-card">
                    <div className="image-container">
                      {!imageLoaded && (
                        <div className="image-placeholder">
                          <div className="loading-spinner"></div>
                        </div>
                      )}
                      <img
                        src={getImageUrl(image)}
                        alt={image.caption || 'Kwetu Kitchen catering event image'}
                        className={`gallery-image ${imageLoaded ? 'loaded' : ''}`}
                        onLoad={() => handleImageLoad(image.id)}
                      />
                      
                      {/* Hover Overlay */}
                      <div className="image-overlay">
                        <div className="zoom-indicator">
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.5 15.5L19 19M5 11C5 14.3137 7.68629 17 11 17C12.6597 17 14.1621 16.3261 15.2483 15.237C16.3308 14.1517 17 12.654 17 11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        
                        {image.caption && (
                          <div className="image-caption">
                            <p>{image.caption}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-images">
              <div className="gallery-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 16L8.586 11.414C8.961 11.039 9.47 10.834 10 10.834C10.53 10.834 11.039 11.039 11.414 11.414L16 16M14 14L15.586 12.414C15.961 12.039 16.47 11.834 17 11.834C17.53 11.834 18.039 12.039 18.414 12.414L20 14M14 8H14.01M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p>No images found in this category.</p>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {isOpen && (
        <Lightbox
          mainSrc={getImageUrl(gallery[photoIndex])}
          nextSrc={getImageUrl(gallery[(photoIndex + 1) % gallery.length])}
          prevSrc={getImageUrl(gallery[(photoIndex + gallery.length - 1) % gallery.length])}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() => setPhotoIndex((photoIndex + gallery.length - 1) % gallery.length)}
          onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % gallery.length)}
          imageCaption={
            gallery[photoIndex].caption && (
              <div className="lightbox-caption">
                <h5>{gallery[photoIndex].caption}</h5>
                {gallery[photoIndex].description && (
                  <p>{gallery[photoIndex].description}</p>
                )}
              </div>
            )
          }
          enableZoom={true}
          reactModalStyle={{
            overlay: { 
              zIndex: 1050, 
              backgroundColor: 'rgba(0, 0, 0, 0.95)',
              padding: '0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            },
            content: {
              position: 'static',
              maxWidth: '90vw',
              maxHeight: '90vh',
              width: 'auto',
              height: 'auto',
              margin: 'auto',
              padding: '0',
              border: 'none',
              background: 'transparent',
              overflow: 'visible'
            }
          }}
          imagePadding={20}
          animationDuration={300}
        />
      )}

      <style jsx>{`
        .gallery-section {
          padding: 5rem 0;
          background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
          position: relative;
          overflow: hidden;
        }
        
        .gallery-section::before {
          content: '';
          position: absolute;
          top: -100px;
          right: -100px;
          width: 300px;
          height: 300px;
          background: rgba(239, 68, 68, 0.03);
          border-radius: 50%;
          z-index: 0;
        }
        
        .container {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        
        /* Section Header */
        .section-header {
          text-align: center;
          margin-bottom: 3rem;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .section-header.in-view {
          opacity: 1;
          transform: translateY(0);
        }
        
        .section-badge {
          display: inline-block;
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          padding: 0.5rem 1.2rem;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.5px;
          margin-bottom: 1rem;
          text-transform: uppercase;
          font-family: 'Roboto', sans-serif;
        }
        
        .section-header h2 {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 1.2rem;
          font-family: 'Playfair Display', serif;
          line-height: 1.2;
        }
        
        .text-accent {
          color: #ef4444;
          position: relative;
          display: inline-block;
        }
        
        .text-accent::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, #ef4444, #f87171);
          border-radius: 3px;
        }
        
        .section-header p {
          font-size: clamp(1rem, 3vw, 1.25rem);
          color: #6b7280;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
          font-family: 'Roboto', sans-serif;
        }
        
        /* Category Filters */
        .category-filters {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.8rem;
          margin-bottom: 3rem;
        }
        
        .filter-button {
          padding: 0.7rem 1.8rem;
          border: 2px solid #ef4444;
          background: transparent;
          color: #ef4444;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Roboto', sans-serif;
          text-transform: capitalize;
        }
        
        .filter-button:hover {
          background: rgba(239, 68, 68, 0.1);
          transform: translateY(-2px);
        }
        
        .filter-button.active {
          background: linear-gradient(45deg, #ef4444, #f87171);
          color: white;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        }
        
        /* Gallery Grid */
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        
        .gallery-item {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .gallery-item.in-view {
          opacity: 1;
          transform: translateY(0);
        }
        
        .gallery-card {
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          transition: all 0.4s ease;
          height: 100%;
        }
        
        .gallery-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
        }
        
        .image-container {
          position: relative;
          padding-bottom: 75%; /* 4:3 aspect ratio */
          overflow: hidden;
        }
        
        .image-placeholder {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
        }
        
        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(239, 68, 68, 0.2);
          border-radius: 50%;
          border-top-color: #ef4444;
          animation: spin 1s ease-in-out infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .gallery-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.6s ease;
          opacity: 0;
        }
        
        .gallery-image.loaded {
          opacity: 1;
        }
        
        .gallery-card:hover .gallery-image {
          transform: scale(1.08);
        }
        
        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.7) 100%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          opacity: 0;
          transition: all 0.4s ease;
          padding: 1.5rem;
        }
        
        .gallery-card:hover .image-overlay {
          opacity: 1;
        }
        
        .zoom-indicator {
          margin-bottom: 1rem;
          transform: translateY(10px);
          transition: transform 0.4s ease;
        }
        
        .gallery-card:hover .zoom-indicator {
          transform: translateY(0);
        }
        
        .image-caption {
          text-align: center;
          transform: translateY(10px);
          transition: transform 0.4s ease;
        }
        
        .gallery-card:hover .image-caption {
          transform: translateY(0);
        }
        
        .image-caption p {
          color: white;
          margin: 0;
          font-size: 0.95rem;
          font-weight: 500;
          font-family: 'Roboto', sans-serif;
          line-height: 1.4;
        }
        
        /* No Images State */
        .no-images {
          grid-column: 1 / -1;
          text-align: center;
          padding: 4rem 2rem;
        }
        
        .gallery-icon {
          margin-bottom: 1.5rem;
          opacity: 0.5;
        }
        
        .no-images p {
          color: #9ca3af;
          font-size: 1.1rem;
          font-family: 'Roboto', sans-serif;
        }
        
        /* Lightbox Customization */
        :global(.ril-image-current) {
          max-width: 90vw !important;
          max-height: 90vh !important;
          width: auto !important;
          height: auto !important;
          object-fit: contain !important;
          margin: auto !important;
          border-radius: 0.5rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }
        
        :global(.ril-caption) {
          display: flex;
          justify-content: center;
          margin-top: 1rem;
        }
        
        :global(.ril-toolbar) {
          background: rgba(0, 0, 0, 0.8) !important;
          border-radius: 0.5rem;
          padding: 0.5rem;
        }
        
        :global(.ril-toolbar__item button) {
          color: #fff !important;
          opacity: 0.8;
          transition: opacity 0.3s ease;
        }
        
        :global(.ril-toolbar__item button:hover) {
          opacity: 1;
        }
        
        .lightbox-caption {
          padding: 1.5rem;
          background: rgba(0, 0, 0, 0.9);
          border-radius: 0.75rem;
          max-width: 80%;
          margin: 1rem auto;
          text-align: center;
        }
        
        .lightbox-caption h5 {
          color: #ef4444;
          margin-bottom: 0.75rem;
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.3rem, 3.5vw, 1.5rem);
        }
        
        .lightbox-caption p {
          color: #fff;
          margin-bottom: 0;
          font-family: 'Roboto', sans-serif;
          font-size: clamp(1rem, 2.5vw, 1.2rem);
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .gallery-section {
            padding: 3rem 0;
          }
          
          .gallery-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 1rem;
          }
          
          .category-filters {
            gap: 0.5rem;
          }
          
          .filter-button {
            padding: 0.5rem 1.2rem;
            font-size: 0.85rem;
          }
        }
        
        @media (max-width: 480px) {
          .container {
            padding: 0 1rem;
          }
          
          .gallery-grid {
            grid-template-columns: 1fr;
          }
          
          .category-filters {
            flex-wrap: nowrap;
            overflow-x: auto;
            justify-content: flex-start;
            padding-bottom: 0.5rem;
          }
        }
      `}</style>
    </section>
  );
}

export default Gallery;
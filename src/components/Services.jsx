import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function Services({ services }) {
  const [inView, setInView] = useState(false);
  const [activeService, setActiveService] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});
  const sectionRef = useRef(null);

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

  const handleLinkClick = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
      window.history.pushState(null, '', `#${sectionId}`);
    }
  };

  const getImageUrl = (service) => service.image_url || service.image || '/service-placeholder.jpg';

  return (
    <section id="services" className="services-section" ref={sectionRef}>
      <div className="container">
        {/* Section Header */}
        <div className={`section-header ${inView ? 'in-view' : ''}`}>
          <div className="section-badge">Culinary Excellence</div>
          <h2>
            Our <span className="text-accent">Services</span>
          </h2>
          <p>
            From intimate gatherings to grand celebrations, we create memorable culinary experiences 
            tailored to your special occasions.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {Array.isArray(services) && services.length > 0 ? (
            services.map((service, index) => {
              const imageLoaded = loadedImages[service.id];
              
              return (
                <div 
                  key={service.id} 
                  className={`service-card-container ${inView ? 'in-view' : ''}`}
                  style={{ transitionDelay: `${0.1 + index * 0.1}s` }}
                >
                  <div 
                    className="service-card"
                    onMouseEnter={() => setActiveService(service.id)}
                    onMouseLeave={() => setActiveService(null)}
                  >
                    <div className="card-image-container">
                      {!imageLoaded && (
                        <div className="image-placeholder">
                          <div className="loading-spinner"></div>
                        </div>
                      )}
                      <img 
                        src={getImageUrl(service)}
                        alt={`${service.title} catering service by Kwetu Kitchen`}
                        className={`card-image ${imageLoaded ? 'loaded' : ''}`}
                        onLoad={() => handleImageLoad(service.id)}
                      />
                      <div className="image-overlay"></div>
                      <div className="category-badge">
                        {service.category || 'Catering'}
                      </div>
                    </div>
                    
                    <div className="card-content">
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                      
                      <button 
                        className="cta-button"
                        aria-label={`Learn more about ${service.title} catering service`}
                      >
                        <span>Explore Service</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-services">
              <div className="culinary-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 10H21M3 14H21M5 18H19M5 6H19M7 22V2M17 22V2" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M8 6V10M16 6V10M8 14V18M16 14V18" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <p>No services available at the moment.</p>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className={`cta-section ${inView ? 'in-view' : ''}`}>
          <p>Ready to plan your event?</p>
          <Link 
            to="enquiry"
            onClick={(e) => handleLinkClick(e, 'enquiry')}
            className="cta-button primary"
            aria-label="Get a custom quote for your catering event"
          >
            Get a Custom Quote
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .services-section {
          padding: 5rem 0;
          background: linear-gradient(135deg, #faf7f5 0%, #ffffff 100%);
          position: relative;
          overflow: hidden;
        }
        
        .services-section::before {
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
        
        .services-section::after {
          content: '';
          position: absolute;
          bottom: -50px;
          left: -50px;
          width: 200px;
          height: 200px;
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
          margin-bottom: 4rem;
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
        
        /* Services Grid */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }
        
        .service-card-container {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .service-card-container.in-view {
          opacity: 1;
          transform: translateY(0);
        }
        
        .service-card {
          background: #ffffff;
          border-radius: 1.2rem;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          transition: all 0.4s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        .service-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
        }
        
        .card-image-container {
          position: relative;
          height: 260px;
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
        
        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.6s ease;
          opacity: 0;
        }
        
        .card-image.loaded {
          opacity: 1;
        }
        
        .service-card:hover .card-image {
          transform: scale(1.08);
        }
        
        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.4) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .service-card:hover .image-overlay {
          opacity: 1;
        }
        
        .category-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: #ef4444;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 600;
          font-family: 'Roboto', sans-serif;
          z-index: 2;
        }
        
        .card-content {
          padding: 1.8rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        
        .card-content h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 0.8rem;
          font-family: 'Playfair Display', serif;
        }
        
        .card-content p {
          color: #6b7280;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          flex-grow: 1;
          font-family: 'Roboto', sans-serif;
        }
        
        .cta-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: transparent;
          color: #ef4444;
          border: 2px solid #ef4444;
          padding: 0.7rem 1.5rem;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          cursor: pointer;
          font-family: 'Roboto', sans-serif;
          text-decoration: none;
        }
        
        .cta-button:hover {
          background: #ef4444;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(239, 68, 68, 0.3);
        }
        
        .cta-button.primary {
          background: linear-gradient(45deg, #ef4444, #f87171);
          color: white;
          border: none;
          padding: 1rem 2rem;
          font-size: 1.05rem;
          box-shadow: 0 6px 16px rgba(239, 68, 68, 0.3);
        }
        
        .cta-button.primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(239, 68, 68, 0.4);
        }
        
        /* No Services State */
        .no-services {
          grid-column: 1 / -1;
          text-align: center;
          padding: 4rem 2rem;
        }
        
        .culinary-icon {
          margin-bottom: 1.5rem;
          opacity: 0.5;
        }
        
        .no-services p {
          color: #9ca3af;
          font-size: 1.1rem;
          font-family: 'Roboto', sans-serif;
        }
        
        /* CTA Section */
        .cta-section {
          text-align: center;
          padding-top: 2rem;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s;
        }
        
        .cta-section.in-view {
          opacity: 1;
          transform: translateY(0);
        }
        
        .cta-section p {
          color: #6b7280;
          font-size: 1.2rem;
          margin-bottom: 1.5rem;
          font-family: 'Roboto', sans-serif;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .services-section {
            padding: 3rem 0;
          }
          
          .services-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .card-image-container {
            height: 220px;
          }
          
          .section-header {
            margin-bottom: 3rem;
          }
          
          .cta-button.primary {
            width: 100%;
          }
        }
        
        @media (max-width: 480px) {
          .container {
            padding: 0 1rem;
          }
          
          .card-content {
            padding: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}

export default Services;
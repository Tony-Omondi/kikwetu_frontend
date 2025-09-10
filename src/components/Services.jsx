
import { useState, useEffect } from 'react';

function Services({ services }) {
  const [inView, setInView] = useState(false);
  const [activeService, setActiveService] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('services');
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
    <section id="services" className="py-5 py-md-7 bg-white">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="text-brand-black fw-bold mb-3 display-5" style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease'
          }}>
            Our <span className="text-brand-red">Services</span>
          </h2>
          <p className="lead text-muted max-w-600 mx-auto" style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s'
          }}>
            From intimate gatherings to grand celebrations, we create memorable culinary experiences tailored to your special occasions.
          </p>
        </div>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-4">
          {Array.isArray(services) && services.length > 0 ? (
            services.map((service, index) => (
              <div 
                key={service.id} 
                className="col"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(30px)',
                  transition: `opacity 0.8s ease ${0.3 + index * 0.1}s, transform 0.8s ease ${0.3 + index * 0.1}s`
                }}
              >
                <div 
                  className="card h-100 border-0 shadow-sm service-card"
                  onMouseEnter={() => setActiveService(service.id)}
                  onMouseLeave={() => setActiveService(null)}
                  style={{
                    transform: activeService === service.id ? 'translateY(-8px)' : 'translateY(0)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div className="position-relative overflow-hidden">
                    <img 
                      src={service.image ? `http://127.0.0.1:8000${service.image}` : "/service-placeholder.jpg"} 
                      alt={`${service.title} catering`} 
                      className="card-img-top" 
                      style={{
                        height: '220px',
                        objectFit: 'cover',
                        filter: activeService === service.id ? 'brightness(1.1)' : 'brightness(1)',
                        transform: activeService === service.id ? 'scale(1.05)' : 'scale(1)',
                        transition: 'all 0.5s ease'
                      }}
                    />
                    <div className="position-absolute top-0 end-0 m-3">
                      <span className="badge bg-brand-red text-white px-3 py-2 rounded-pill">
                        {service.category || 'Catering'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="card-body text-center p-4">
                    <h3 className="card-title text-brand-black fw-semibold mb-3">{service.title}</h3>
                    <p className="card-text text-muted mb-4">{service.description}</p>
                    
                    <button 
                      className="btn btn-outline-brand-red rounded-pill px-4"
                      style={{
                        borderWidth: '2px',
                        transform: activeService === service.id ? 'scale(1.05)' : 'scale(1)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <span className="material-symbols-outlined text-muted" style={{ fontSize: '4rem' }}>
                restaurant
              </span>
              <p className="mt-3 text-muted">No services available at the moment.</p>
            </div>
          )}
        </div>

        {/* Call to action */}
        <div className="text-center mt-6 pt-5" style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s'
        }}>
          <p className="text-muted mb-4">Ready to plan your event?</p>
          <a 
            href="#enquiry" 
            className="btn btn-brand-red btn-lg text-white px-5 py-3 rounded-pill fw-semibold d-inline-flex align-items-center"
            style={{ 
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 14px rgba(239, 68, 68, 0.4)'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(239, 68, 68, 0.6)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 14px rgba(239, 68, 68, 0.4)';
            }}
          >
            Get a Custom Quote
            <span className="material-symbols-outlined ms-2" style={{ fontSize: '1.2rem' }}>
              arrow_forward
            </span>
          </a>
        </div>
      </div>

      <style>{`
        .service-card {
          border-radius: 1rem;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .service-card:hover {
          box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.1) !important;
        }
        
        .max-w-600 {
          max-width: 600px;
        }
        
        .mt-6 {
          margin-top: 4rem;
        }
      `}</style>
    </section>
  );
}

export default Services;

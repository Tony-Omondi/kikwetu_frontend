import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Hero() {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      className="d-flex align-items-center justify-content-center min-vh-100 position-relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url('public/hero-bg.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        paddingTop: '5rem',
        transition: 'all 0.8s ease'
      }}
    >
      {/* Animated overlay elements */}
      <div className="position-absolute top-0 start-0 w-100 h-100" style={{
        background: 'radial-gradient(circle at 20% 50%, rgba(239, 68, 68, 0.15) 0%, transparent 40%)',
        opacity: loaded ? 1 : 0,
        transition: 'opacity 1.5s ease'
      }}></div>
      
      <div className="position-absolute top-0 end-0 w-100 h-100" style={{
        background: 'radial-gradient(circle at 80% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 40%)',
        opacity: loaded ? 1 : 0,
        transition: 'opacity 1.5s ease 0.3s'
      }}></div>

      <div className="container position-relative z-1">
        <div className="text-center text-white">
          <div className="mb-4" style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1s ease, transform 1s ease'
          }}>
            <span className="material-symbols-outlined d-inline-block mb-3" style={{ 
              fontSize: '4rem', 
              color: '#ef4444',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'
            }}>
              outdoor_grill
            </span>
          </div>
          
          <h1 className="display-4 fw-bold mb-4 text-capitalize" style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1s ease 0.2s, transform 1s ease 0.2s',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
            lineHeight: '1.2'
          }}>
            Savor the Moment, <span className="d-block" style={{ color: '#ef4444' }}>We'll Handle the Flavor</span>
          </h1>
          
          <p className="lead mt-4 fs-5 max-w-600 mx-auto" style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1s ease 0.4s, transform 1s ease 0.4s',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.6)'
          }}>
            Crafting unforgettable culinary experiences for your special events with authentic flavors and exceptional service.
          </p>
          
          <div className="mt-5 d-flex flex-wrap justify-content-center gap-3" style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1s ease 0.6s, transform 1s ease 0.6s'
          }}>
            <Link 
              to="#enquiry" 
              className="btn btn-lg btn-brand-red text-white px-4 py-3 rounded-pill fw-semibold d-flex align-items-center"
              style={{ 
                backgroundColor: '#ef4444',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 14px rgba(239, 68, 68, 0.4)',
                minWidth: '200px',
                justifyContent: 'center'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#dc2626';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(239, 68, 68, 0.6)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#ef4444';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 14px rgba(239, 68, 68, 0.4)';
              }}
            >
              Make an Enquiry
              <span className="material-symbols-outlined ms-2" style={{ fontSize: '1.2rem' }}>
                arrow_forward
              </span>
            </Link>
            
            <Link 
              to="#services" 
              className="btn btn-lg btn-outline-light px-4 py-3 rounded-pill fw-semibold d-flex align-items-center"
              style={{ 
                borderWidth: '2px',
                borderColor: '#FFFFFF',
                transition: 'all 0.3s ease',
                minWidth: '200px',
                justifyContent: 'center'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 14px rgba(255, 255, 255, 0.2)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              View Our Services
              <span className="material-symbols-outlined ms-2" style={{ fontSize: '1.2rem' }}>
                restaurant
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4" style={{
        opacity: loaded ? 1 : 0,
        transition: 'opacity 1s ease 1s'
      }}>
        <div className="d-flex flex-column align-items-center text-white">
          <span className="small mb-1" style={{ opacity: 0.8 }}>Scroll to explore</span>
          <span className="material-symbols-outlined animate-bounce">
            keyboard_arrow_down
          </span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
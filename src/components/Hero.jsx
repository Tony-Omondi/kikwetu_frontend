import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Handle smooth scrolling with offset for navbar height
  const handleLinkClick = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
      window.history.pushState(null, '', `#${sectionId}`);
    }
  };

  return (
    <section
      id="hero"
      className="d-flex align-items-center justify-content-center min-vh-100 position-relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url('/hero-bg.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        paddingTop: '80px',
        paddingBottom: '2rem',
        transition: 'all 0.8s ease'
      }}
    >
      {/* Animated overlay elements */}
      <div className="position-absolute top-0 start-0 w-100 h-100" style={{
        background: 'radial-gradient(circle at 20% 50%, rgba(239, 68, 68, 0.25) 0%, transparent 40%)',
        opacity: loaded ? 1 : 0,
        transition: 'opacity 1.2s ease'
      }}></div>
      
      <div className="position-absolute top-0 end-0 w-100 h-100" style={{
        background: 'radial-gradient(circle at 80% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 40%)',
        opacity: loaded ? 1 : 0,
        transition: 'opacity 1.2s ease 0.3s'
      }}></div>

      <div className="container position-relative z-1">
        <div className="text-center text-white px-3">
          <div className="mb-4" style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1s ease, transform 1s ease'
          }}>
            <span className="material-symbols-outlined d-inline-block mb-3" style={{ 
              fontSize: '4rem', 
              color: '#ef4444',
              filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.6))'
            }}>
              outdoor_grill
            </span>
          </div>
          
          <h1 className="display-4 fw-bold mb-4" style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1s ease 0.2s, transform 1s ease 0.2s',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
            lineHeight: '1.2',
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.2rem, 6vw, 3.2rem)'
          }}>
            Savor the Moment, <span className="d-block mt-2" style={{ color: '#ef4444' }}>We'll Handle the Flavor</span>
          </h1>
          
          <p className="lead mt-4 fs-5 mx-auto" style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1s ease 0.4s, transform 1s ease 0.4s',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)',
            fontFamily: "'Roboto', sans-serif",
            maxWidth: '700px',
            fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)',
            lineHeight: '1.6'
          }}>
            Crafting unforgettable culinary experiences for your special events with authentic flavors and exceptional service.
          </p>
          
          <div className="mt-5 d-flex flex-column flex-md-row justify-content-center gap-3" style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1s ease 0.6s, transform 1s ease 0.6s'
          }}>
            <Link 
              to="enquiry" 
              onClick={(e) => handleLinkClick(e, 'enquiry')}
              className="btn btn-lg btn-brand-red text-white px-4 py-2 rounded-pill fw-semibold d-flex align-items-center justify-content-center w-100 w-md-auto"
              style={{ 
                background: 'linear-gradient(45deg, #ef4444, #f87171)',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)',
                minWidth: '200px',
                fontSize: '1rem'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px) scale(1.03)';
                e.target.style.boxShadow = '0 6px 16px rgba(239, 68, 68, 0.5)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.4)';
              }}
              aria-label="Make an enquiry about our catering services"
            >
              Make an Enquiry
              <span className="material-symbols-outlined ms-2" style={{ fontSize: '1.2rem' }}>
                arrow_forward
              </span>
            </Link>
            
            <Link 
              to="services" 
              onClick={(e) => handleLinkClick(e, 'services')}
              className="btn btn-lg btn-outline-light px-4 py-2 rounded-pill fw-semibold d-flex align-items-center justify-content-center w-100 w-md-auto"
              style={{ 
                borderWidth: '2px',
                borderColor: '#FFFFFF',
                transition: 'all 0.2s ease',
                minWidth: '200px',
                fontSize: '1rem'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.target.style.transform = 'translateY(-2px) scale(1.03)';
                e.target.style.boxShadow = '0 4px 12px rgba(255, 255, 255, 0.2)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = 'none';
              }}
              aria-label="View our catering services"
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
          <span className="small mb-1" style={{ 
            opacity: 0.8,
            fontFamily: "'Roboto', sans-serif",
            fontSize: '0.85rem'
          }}>
            Scroll to explore
          </span>
          <span className="material-symbols-outlined" style={{
            fontSize: '1.8rem',
            filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.5))',
            animation: 'bounce 2s infinite'
          }}>
            keyboard_arrow_down
          </span>
        </div>
      </div>

      {/* Add CSS animation for bounce effect */}
      <style>
        {`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-8px);
            }
            60% {
              transform: translateY(-4px);
            }
          }
        `}
      </style>
    </section>
  );
}

export default Hero;
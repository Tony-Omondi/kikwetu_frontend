import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && !e.target.closest('.navbar')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Handle smooth scrolling with offset for navbar height
  const handleLinkClick = (e, sectionId) => {
    e.preventDefault();
    setIsOpen(false);
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
    <nav 
      className={`navbar navbar-expand-lg fixed-top transition-all duration-300 ${isScrolled ? 'bg-white/90 shadow-sm py-1' : 'bg-transparent py-2'}`}
      style={{ 
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      <div className="container mx-auto px-3">
        <Link 
          className="navbar-brand d-flex align-items-center gap-2" 
          to="hero"
          onClick={(e) => handleLinkClick(e, 'hero')}
        >
          <span 
            className="material-symbols-outlined text-brand-red transition-transform duration-300" 
            style={{ 
              fontSize: isScrolled ? '2.2rem' : '2.4rem',
            }}
          >
            outdoor_grill
          </span>
          <h2 
            className="mb-0 text-brand-black fw-semibold transition-all duration-300"
            style={{
              fontSize: isScrolled ? '1.4rem' : '1.6rem',
              color: '#1f2937'
            }}
          >
            Kwetu Kitchen
          </h2>
        </Link>
        
        <button
          className="navbar-toggler p-0 border-0 focus:outline-none"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          style={{
            width: '42px',
            height: '42px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <span 
            className="material-symbols-outlined text-brand-red transition-all duration-300"
            style={{ 
              fontSize: '1.8rem',
              transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)'
            }}
          >
            {isOpen ? 'close' : 'menu'}
          </span>
        </button>
        
        <div 
          className={`navbar-collapse ${isOpen ? 'show' : ''}`}
          style={{
            maxHeight: isOpen ? '100vh' : '0',
            overflow: 'hidden',
            transition: 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out',
            opacity: isOpen ? '1' : '0',
            padding: isOpen ? '1rem 0' : '0'
          }}
        >
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center gap-1 flex-column flex-lg-row">
            {['About', 'Services', 'Gallery', 'Testimonials', 'FAQs', 'Contact'].map((item) => (
              <li key={item} className="nav-item w-100 w-lg-auto">
                <Link 
                  className="nav-link text-brand-black position-relative px-lg-3 py-2 text-center"
                  to={item.toLowerCase()}
                  onClick={(e) => handleLinkClick(e, item.toLowerCase())}
                  style={{
                    fontWeight: '500',
                    fontSize: '1rem',
                    color: isScrolled ? '#1f2937' : isOpen ? '#1f2937' : 'rgba(255,255,255,0.9)',
                    transition: 'color 0.2s ease, transform 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.color = '#ef4444';
                    e.target.style.transform = 'translateY(-1px)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.color = isScrolled ? '#1f2937' : isOpen ? '#1f2937' : 'rgba(255,255,255,0.9)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  {item}
                  <span 
                    className="position-absolute bottom-0 start-50 bg-brand-red"
                    style={{
                      height: '2px',
                      width: '0',
                      transition: 'width 0.3s ease, left 0.3s ease',
                      transform: 'translateX(-50%)'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.width = '70%';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.width = '0';
                    }}
                  />
                </Link>
              </li>
            ))}
            
            <li className="nav-item mt-2 mt-lg-0 w-100 w-lg-auto">
              <Link
                to="enquiry"
                onClick={(e) => handleLinkClick(e, 'enquiry')}
                className="btn text-white px-4 py-2 rounded-pill fw-semibold d-flex align-items-center justify-content-center gap-2 w-100 w-lg-auto"
                style={{ 
                  background: 'linear-gradient(45deg, #ef4444, #f87171)',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 8px rgba(239, 68, 68, 0.25)',
                  transform: 'translateY(0)',
                  fontSize: '1rem'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px) scale(1.03)';
                  e.target.style.boxShadow = '0 6px 12px rgba(239, 68, 68, 0.35)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.boxShadow = '0 4px 8px rgba(239, 68, 68, 0.25)';
                }}
              >
                Make Enquiry
                <span className="material-symbols-outlined" style={{ fontSize: '1.2rem' }}>
                  arrow_forward
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
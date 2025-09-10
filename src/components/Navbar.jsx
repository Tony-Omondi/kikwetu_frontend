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

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav 
      className={`navbar navbar-expand-lg fixed-top transition-all ${isScrolled ? 'bg-white shadow-sm py-2' : 'bg-transparent py-3'}`}
      style={{ 
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease'
      }}
    >
      <div className="container">
        <Link 
          className="navbar-brand d-flex align-items-center gap-2" 
          to="#hero"
          onClick={handleLinkClick}
        >
          <span 
            className="material-symbols-outlined text-brand-red transition-all" 
            style={{ 
              fontSize: '2.5rem',
              transform: isScrolled ? 'scale(0.9)' : 'scale(1)'
            }}
          >
            outdoor_grill
          </span>
          <h2 
            className="mb-0 text-brand-black fw-bold transition-all"
            style={{
              fontSize: isScrolled ? '1.5rem' : '1.75rem'
            }}
          >
            Kwetu Kitchen Caterers
          </h2>
        </Link>
        
        <button
          className="navbar-toggler p-0 border-0"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          style={{
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <span 
            className="material-symbols-outlined text-brand-red transition-all"
            style={{ 
              fontSize: '2rem',
              transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)'
            }}
          >
            {isOpen ? 'close' : 'menu'}
          </span>
        </button>
        
        <div 
          className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}
          style={{
            maxHeight: isOpen ? '100vh' : '0',
            overflow: 'hidden',
            transition: 'max-height 0.4s ease-out'
          }}
        >
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
            {['About Us', 'Services', 'Gallery', 'Testimonials', 'Enquiry', 'FAQs', 'Contact'].map((item) => (
              <li key={item} className="nav-item">
                <Link 
                  className="nav-link text-brand-black position-relative px-lg-3"
                  to={`#${item.toLowerCase().replace(' ', '-')}`}
                  onClick={handleLinkClick}
                  style={{
                    fontWeight: '500',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseOver={(e) => e.target.style.color = '#ef4444'}
                  onMouseOut={(e) => e.target.style.color = '#1f2937'}
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
                  />
                </Link>
              </li>
            ))}
            
            <li className="nav-item mt-3 mt-lg-0">
              <Link
                to="#enquiry"
                onClick={handleLinkClick}
                className="btn btn-brand-red text-white ms-lg-3 px-4 py-2 rounded-pill fw-semibold d-flex align-items-center justify-content-center"
                style={{ 
                  backgroundColor: '#ef4444',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 6px rgba(239, 68, 68, 0.2)',
                  gap: '8px'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#dc2626';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 8px rgba(239, 68, 68, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#ef4444';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 6px rgba(239, 68, 68, 0.2)';
                }}
              >
                Make an Enquiry
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
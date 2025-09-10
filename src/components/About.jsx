import { useState, useEffect } from 'react';

function About() {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // Simple intersection observer implementation
    const handleScroll = () => {
      const element = document.getElementById('about');
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75) {
          setInView(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="about" className="py-5 py-md-7 bg-light">
      <div className="container">
        <div className="row g-4 g-lg-5 align-items-center">
          <div className="col-12 col-lg-6 order-2 order-lg-1">
            <div className="pe-lg-4">
              <h2 className="text-brand-black fw-bold mb-4 display-5" style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateX(0)' : 'translateX(-20px)',
                transition: 'opacity 0.8s ease, transform 0.8s ease'
              }}>
                About <span className="text-brand-red">Kwetu Kitchen</span> Caterers
              </h2>
              
              <p className="lead text-muted mb-4" style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateX(0)' : 'translateX(-20px)',
                transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s'
              }}>
                Kwetu Kitchen Caterers is dedicated to providing exceptional catering services tailored to your unique needs.
                With a passion for culinary excellence and a commitment to impeccable service, we transform your events into
                memorable occasions.
              </p>
              
              <p className="text-muted mb-4" style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateX(0)' : 'translateX(-20px)',
                transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s'
              }}>
                Our team of experienced chefs and event specialists work closely with you to create bespoke
                menus and seamless experiences that exceed your expectations. We source the freshest ingredients
                and combine traditional techniques with innovative flavors.
              </p>
              
              <div className="row mt-5" style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateX(0)' : 'translateX(-20px)',
                transition: 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s'
              }}>
                <div className="col-6 col-md-3 mb-3">
                  <div className="text-center">
                    <div className="text-brand-red fw-bold display-6 mb-1">15+</div>
                    <div className="text-muted small">Years Experience</div>
                  </div>
                </div>
                <div className="col-6 col-md-3 mb-3">
                  <div className="text-center">
                    <div className="text-brand-red fw-bold display-6 mb-1">500+</div>
                    <div className="text-muted small">Events Catered</div>
                  </div>
                </div>
                <div className="col-6 col-md-3 mb-3">
                  <div className="text-center">
                    <div className="text-brand-red fw-bold display-6 mb-1">98%</div>
                    <div className="text-muted small">Client Satisfaction</div>
                  </div>
                </div>
                <div className="col-6 col-md-3 mb-3">
                  <div className="text-center">
                    <div className="text-brand-red fw-bold display-6 mb-1">50+</div>
                    <div className="text-muted small">Menu Options</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-12 col-lg-6 order-1 order-lg-2">
            <div className="position-relative" style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(20px)',
              transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s'
            }}>
              <div className="overflow-hidden rounded-4 shadow-lg">
                <img 
                  src="public/about-image.jpeg" 
                  alt="Deliciously prepared food platter" 
                  className="w-100 h-auto object-fit-cover" 
                  style={{
                    transition: 'transform 0.5s ease'
                  }}
                  onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                />
              </div>
              
              {/* Decorative elements */}
              <div className="position-absolute top-0 start-0 translate-middle bg-brand-red rounded-circle" 
                style={{ width: '40px', height: '40px', opacity: 0.2 }}></div>
              <div className="position-absolute bottom-0 end-0 translate-middle bg-brand-red rounded-circle" 
                style={{ width: '60px', height: '60px', opacity: 0.1 }}></div>
              
              {/* Experience badge */}
              <div className="position-absolute top-0 end-0 m-3 bg-white rounded-3 shadow-sm p-3 text-center"
                style={{
                  transform: 'rotate(5deg)',
                  animation: inView ? 'pulse 2s infinite' : 'none'
                }}>
                <div className="text-brand-red fw-bold fs-2">15+</div>
                <div className="text-dark small">Years</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes pulse {
          0% { transform: rotate(5deg) scale(1); }
          50% { transform: rotate(5deg) scale(1.05); }
          100% { transform: rotate(5deg) scale(1); }
        }
      `}</style>
    </section>
  );
}

export default About;
import { useState, useEffect, useRef } from 'react';

function About() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 } // Reduced threshold for earlier trigger
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-5 py-md-6 bg-light" ref={sectionRef}>
      <div className="container">
        <div className="row g-4 g-lg-5 align-items-center">
          <div className="col-12 col-lg-6 order-2 order-lg-1">
            <div className="pe-lg-4">
              <h2 className="fw-bold mb-4 display-6" style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateX(0)' : 'translateX(-20px)',
                transition: 'opacity 0.8s ease, transform 0.8s ease',
                fontFamily: "'Playfair Display', serif",
                color: '#1f2937',
                lineHeight: '1.2'
              }}>
                About <span style={{ color: '#ef4444' }}>Kwetu Kitchen</span> Caterers
              </h2>
              
              <p className="text-muted mb-4" style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateX(0)' : 'translateX(-20px)',
                transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
                lineHeight: '1.7'
              }}>
                Kwetu Kitchen Caterers is dedicated to providing exceptional catering services tailored to your unique needs.
                With a passion for culinary excellence and a commitment to impeccable service, we transform your events into
                memorable occasions.
              </p>
              
              <p className="text-muted mb-4" style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateX(0)' : 'translateX(-20px)',
                transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s',
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
                lineHeight: '1.7'
              }}>
                Our team of experienced chefs and event specialists work closely with you to create bespoke
                menus and seamless experiences that exceed your expectations. We source the freshest ingredients
                and combine traditional techniques with innovative flavors.
              </p>
              
              <div className="row mt-4 g-3" style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateX(0)' : 'translateX(-20px)',
                transition: 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s'
              }}>
                {[
                  { value: '15+', label: 'Years Experience' },
                  { value: '500+', label: 'Events Catered' },
                  { value: '98%', label: 'Client Satisfaction' },
                  { value: '50+', label: 'Menu Options' }
                ].map((stat, index) => (
                  <div key={index} className="col-6 col-md-3">
                    <div className="text-center p-3 rounded-3 bg-white shadow-sm h-100" 
                      style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                      }}
                    >
                      <div className="text-brand-red fw-bold mb-1" style={{ 
                        fontSize: 'clamp(1.5rem, 4vw, 1.8rem)',
                        fontFamily: "'Inter', sans-serif"
                      }}>
                        {stat.value}
                      </div>
                      <div className="text-muted" style={{ 
                        fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: '500'
                      }}>
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="col-12 col-lg-6 order-1 order-lg-2">
            <div className="position-relative" style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(20px)',
              transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s'
            }}>
              <div className="overflow-hidden rounded-4" style={{
                boxShadow: '0 15px 40px rgba(0,0,0,0.1)'
              }}>
                <img 
                  src="/about-image.jpeg" 
                  alt="Deliciously prepared food platter at Kwetu Kitchen Caterers" 
                  className="w-100 h-auto object-fit-cover" 
                  style={{
                    transition: 'transform 0.5s ease, filter 0.5s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'scale(1.03)';
                    e.target.style.filter = 'brightness(1.05)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.filter = 'brightness(1)';
                  }}
                />
              </div>
              
              {/* Decorative elements */}
              <div className="position-absolute top-0 start-0 translate-middle bg-brand-red rounded-circle" 
                style={{ 
                  width: '40px', 
                  height: '40px', 
                  opacity: 0.2,
                  transition: 'transform 0.3s ease',
                  transform: inView ? 'scale(1)' : 'scale(0.8)'
                }}
              ></div>
              <div className="position-absolute bottom-0 end-0 translate-middle bg-brand-red rounded-circle" 
                style={{ 
                  width: '60px', 
                  height: '60px', 
                  opacity: 0.15,
                  transition: 'transform 0.3s ease',
                  transform: inView ? 'scale(1)' : 'scale(0.8)'
                }}
              ></div>
              
              {/* Experience badge */}
              <div className="position-absolute top-0 end-0 m-3 bg-white rounded-3 shadow p-3 text-center"
                style={{
                  transform: inView ? 'rotate(5deg) translateY(0)' : 'rotate(0deg) translateY(20px)',
                  transition: 'transform 0.8s ease 0.5s, box-shadow 0.3s ease',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.12)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'rotate(5deg) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'rotate(5deg) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.12)';
                }}
              >
                <div className="text-brand-red fw-bold" style={{ 
                  fontSize: 'clamp(1.4rem, 3vw, 1.6rem)',
                  fontFamily: "'Inter', sans-serif"
                }}>
                  15+
                </div>
                <div className="text-dark small fw-medium" style={{ 
                  fontSize: 'clamp(0.7rem, 2vw, 0.75rem)',
                  fontFamily: "'Inter', sans-serif"
                }}>
                  Years Experience
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
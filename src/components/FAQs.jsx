import { useState, useEffect, useRef } from 'react';

function FAQs({ faqs }) {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    console.log('Link clicked:', href);
    // Optionally use navigate('/path') with react-router-dom for internal links
  };

  return (
    <section id="faqs" className="py-5 py-md-7 bg-light" ref={sectionRef}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-8">
            <div className="text-center mb-5">
              <h2
                className="fw-bold mb-3 display-5"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: '#1f2937',
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'opacity 1s ease, transform 1s ease'
                }}
              >
                Frequently Asked <span style={{ color: '#ef4444' }}>Questions</span>
              </h2>
              <p
                className="lead text-muted max-w-700 mx-auto"
                style={{
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: 'clamp(1rem, 3vw, 1.25rem)',
                  opacity: inView ? 1 : 0,
                  transition: 'opacity 1.2s ease'
                }}
              >
                Find answers to common questions about our services. Can’t find what you’re looking for?{' '}
                <a
                  href="#contact"
                  className="text-brand-red text-decoration-none"
                  onClick={(e) => handleLinkClick(e, '#contact')}
                  aria-label="Contact us for more information"
                >
                  Contact us
                </a>{' '}
                or submit an{' '}
                <a
                  href="#enquiry"
                  className="text-brand-red text-decoration-none"
                  onClick={(e) => handleLinkClick(e, '#enquiry')}
                  aria-label="Submit an enquiry"
                >
                  enquiry
                </a>.
              </p>
            </div>

            <div className="accordion mt-4" id="faqAccordion">
              {faqs && faqs.length > 0 ? (
                faqs.map((faq, index) => (
                  <div
                    key={faq.id || index}
                    className="accordion-item border-0 mb-3 shadow-lg rounded-4"
                    style={{
                      opacity: inView ? 1 : 0,
                      transform: inView ? 'translateY(0)' : 'translateY(30px)',
                      transition: `opacity 1s ease ${0.2 + index * 0.1}s, transform 1s ease ${0.2 + index * 0.1}s`
                    }}
                  >
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed fw-semibold py-4"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#faq${index}`}
                        aria-expanded="false"
                        aria-controls={`faq${index}`}
                        style={{
                          fontFamily: "'Roboto', sans-serif",
                          fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
                          color: '#1f2937',
                          backgroundColor: 'rgba(239, 68, 68, 0.05)',
                          borderLeft: '4px solid #ef4444',
                          transition: 'background-color 0.3s ease'
                        }}
                      >
                        <span className="me-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="#ef4444"
                            viewBox="0 0 16 16"
                            className="flex-shrink-0"
                            aria-hidden="true"
                          >
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                          </svg>
                        </span>
                        {faq.question || 'No question provided'}
                      </button>
                    </h2>
                    <div
                      id={`faq${index}`}
                      className="accordion-collapse collapse"
                      data-bs-parent="#faqAccordion"
                    >
                      <div
                        className="accordion-body text-muted py-4 ps-5"
                        style={{
                          fontFamily: "'Roboto', sans-serif",
                          fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                          borderLeft: '4px solid #ef4444'
                        }}
                      >
                        {faq.answer || 'No answer provided'}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-muted py-4">
                  <p style={{ fontFamily: "'Roboto', sans-serif", fontSize: 'clamp(1rem, 2.5vw, 1.1rem)' }}>
                    No FAQs available at the moment. Please{' '}
                    <a
                      href="#contact"
                      className="text-brand-red text-decoration-none"
                      onClick={(e) => handleLinkClick(e, '#contact')}
                      aria-label="Contact us for more information"
                    >
                      contact us
                    </a>{' '}
                    for assistance.
                  </p>
                </div>
              )}
            </div>

            <div className="text-center mt-5 pt-3">
              <p
                className="mb-3"
                style={{ fontFamily: "'Roboto', sans-serif", fontSize: 'clamp(0.9rem, 2.5vw, 1rem)' }}
              >
                Still have questions?
              </p>
              <a
                href="#contact"
                className="btn btn-lg fw-semibold rounded-pill"
                onClick={(e) => handleLinkClick(e, '#contact')}
                style={{
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
                  background: 'linear-gradient(45deg, #ef4444, #f87171)',
                  color: '#fff',
                  transition: 'background 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(45deg, #f87171, #ef4444)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(45deg, #ef4444, #f87171)';
                }}
                aria-label="Contact us for more information"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .accordion-item {
          transition: all 0.3s ease;
        }
        .accordion-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15) !important;
        }
        .accordion-button:not(.collapsed) {
          color: #ef4444;
          background-color: rgba(239, 68, 68, 0.1);
          box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.125);
        }
        .accordion-button:focus {
          border-color: rgba(239, 68, 68, 0.3);
          box-shadow: 0 0 0 0.25rem rgba(239, 68, 68, 0.25);
        }
        .text-brand-red {
          color: #ef4444;
        }
        .max-w-700 {
          max-width: 700px;
        }
        @media (max-width: 768px) {
          .accordion-body {
            padding-left: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}

export default FAQs;
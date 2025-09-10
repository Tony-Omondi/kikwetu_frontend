import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function Testimonials({ testimonials }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 5
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [inView, setInView] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef(null);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [testimonials.length, isPaused]);

  // Detect scroll for animation with IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // Stop observing once in view
        }
      },
      { threshold: 0.2 } // Trigger when 20% of section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/testimonials/', formData);
      setSubmitStatus('success');
      setFormData({ name: '', review: '', rating: 5 });
      setTimeout(() => {
        setShowForm(false);
        setSubmitStatus(null);
      }, 2000);
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      setSubmitStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="d-flex justify-content-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={star <= rating ? 'text-warning' : 'text-muted'}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={star <= rating ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 3000); // Resume auto-rotation after 3s
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 3000); // Resume auto-rotation after 3s
  };

  return (
    <section id="testimonials" className="py-5 py-md-7 bg-white position-relative" ref={sectionRef}>
      {/* Decorative Elements */}
      <div className="position-absolute top-0 start-0 w-100 h-100" style={{ zIndex: 0, overflow: 'hidden' }}>
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{
          background: 'radial-gradient(circle at 20% 50%, rgba(239, 68, 68, 0.03) 0%, transparent 50%)',
        }}></div>
        <div className="position-absolute bottom-0 end-0 w-100 h-100" style={{
          background: 'radial-gradient(circle at 80% 50%, rgba(239, 68, 68, 0.03) 0%, transparent 50%)',
        }}></div>
      </div>
      
      <div className="container position-relative" style={{ zIndex: 1 }}>
        {/* Section Header with Badge */}
        <div className="text-center mb-5" style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 1s ease, transform 1s ease',
        }}>
          <div className="d-inline-block px-3 py-1 rounded-pill bg-light mb-4" style={{
            background: 'linear-gradient(45deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05))',
            border: '1px solid rgba(239, 68, 68, 0.1)'
          }}>
            <span className="text-brand-red small fw-medium">TESTIMONIALS</span>
          </div>
          <h2 className="fw-bold mb-3 display-5" style={{ 
            color: '#1f2937',
            fontFamily: "'Playfair Display', serif",
            background: 'linear-gradient(45deg, #1f2937, #374151)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            What Our <span style={{ color: '#ef4444' }}>Clients Say</span>
          </h2>
          <div className="d-flex align-items-center justify-content-center mb-3">
            <div className="flex-grow-1" style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.3), transparent)' }}></div>
            <svg className="mx-3" width="20" height="20" viewBox="0 0 24 24" fill="#ef4444">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <div className="flex-grow-1" style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.3), transparent)' }}></div>
          </div>
          <p className="text-muted max-w-600 mx-auto" style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(1rem, 3vw, 1.1rem)',
            lineHeight: '1.6'
          }}>
            Hear from those who've experienced our culinary excellence and exceptional service.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="row justify-content-center" style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 1s ease 0.2s, transform 1s ease 0.2s'
        }}>
          <div className="col-12 col-lg-10 col-xl-8">
            <div
              className="testimonial-carousel position-relative"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="carousel-inner">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
                    style={{
                      transform: index === currentIndex ? 'translateX(0)' : index < currentIndex ? 'translateX(-100%)' : 'translateX(100%)',
                      opacity: index === currentIndex ? 1 : 0,
                      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease',
                      position: index === currentIndex ? 'relative' : 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      pointerEvents: index === currentIndex ? 'auto' : 'none'
                    }}
                  >
                    <div className="testimonial-card bg-light rounded-4 p-4 p-md-5 text-center position-relative overflow-hidden">
                      {/* Decorative corner elements */}
                      <div className="position-absolute top-0 start-0 w-100 h-100" style={{ zIndex: 0 }}>
                        <div className="position-absolute top-0 start-0 ms-3 mt-3">
                          <svg width="60" height="60" viewBox="0 0 24 24" fill="rgba(239, 68, 68, 0.05)">
                            <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                          </svg>
                        </div>
                        <div className="position-absolute bottom-0 end-0 me-3 mb-3">
                          <svg width="60" height="60" viewBox="0 0 24 24" fill="rgba(239, 68, 68, 0.05)" style={{ transform: 'rotate(180deg)' }}>
                            <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                          </svg>
                        </div>
                      </div>
                      
                      <div className="position-relative" style={{ zIndex: 2 }}>
                        <div className="mb-4">
                          {renderStars(testimonial.rating || 5)}
                        </div>
                        
                        <p className="fs-5 fst-italic text-dark mb-4 mx-auto" style={{
                          fontFamily: "'Inter', sans-serif",
                          maxWidth: '600px',
                          fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                          lineHeight: '1.7'
                        }}>
                          "{testimonial.review}"
                        </p>
                        
                        <div className="d-flex align-items-center justify-content-center">
                          <div className="bg-brand-red rounded-circle d-flex align-items-center justify-content-center me-3 shadow-sm"
                            style={{ 
                              width: '60px', 
                              height: '60px',
                              background: 'linear-gradient(45deg, #ef4444, #f87171)'
                            }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                            </svg>
                          </div>
                          <div>
                            <h5 className="mb-0 text-brand-black fw-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                              {testimonial.name}
                            </h5>
                            <small className="text-muted" style={{ fontFamily: "'Inter', sans-serif" }}>
                              Satisfied Client
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Buttons */}
              <button
                className="carousel-control-prev position-absolute top-50 start-0 translate-middle-y btn p-2 rounded-circle shadow-sm"
                onClick={handlePrev}
                aria-label="Previous testimonial"
                style={{
                  color: '#ef4444',
                  backgroundColor: 'white',
                  width: '50px',
                  height: '50px',
                  opacity: 0.9,
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  transform: 'translate(-60px, -50%)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.backgroundColor = '#fef2f2';
                  e.currentTarget.style.transform = 'translate(-60px, -50%) scale(1.05)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.opacity = '0.9';
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.transform = 'translate(-60px, -50%) scale(1)';
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
              </button>
              <button
                className="carousel-control-next position-absolute top-50 end-0 translate-middle-y btn p-2 rounded-circle shadow-sm"
                onClick={handleNext}
                aria-label="Next testimonial"
                style={{
                  color: '#ef4444',
                  backgroundColor: 'white',
                  width: '50px',
                  height: '50px',
                  opacity: 0.9,
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  transform: 'translate(60px, -50%)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.backgroundColor = '#fef2f2';
                  e.currentTarget.style.transform = 'translate(60px, -50%) scale(1.05)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.opacity = '0.9';
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.transform = 'translate(60px, -50%) scale(1)';
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                </svg>
              </button>

              {/* Navigation Dots */}
              <div className="d-flex justify-content-center mt-4 gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`btn p-0 ${index === currentIndex ? 'text-brand-red' : 'text-muted'}`}
                    onClick={() => {
                      setCurrentIndex(index);
                      setIsPaused(true);
                      setTimeout(() => setIsPaused(false), 3000);
                    }}
                    aria-label={`Go to testimonial ${index + 1}`}
                    style={{
                      transition: 'color 0.3s ease, transform 0.3s ease',
                      transform: index === currentIndex ? 'scale(1.2)' : 'scale(1)'
                    }}
                    onMouseOver={(e) => {
                      if (index !== currentIndex) e.currentTarget.style.color = '#f87171';
                      e.currentTarget.style.transform = 'scale(1.2)';
                    }}
                    onMouseOut={(e) => {
                      if (index !== currentIndex) e.currentTarget.style.color = '#6b7280';
                      if (index !== currentIndex) e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    {index === currentIndex ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="12" r="8" />
                      </svg>
                    ) : (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="12" r="5" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Add Testimonial Button */}
        <div className="text-center mt-5" style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 1s ease 0.3s, transform 1s ease 0.3s'
        }}>
          <button
            className="btn btn-outline-brand-red rounded-pill px-4 py-2 d-inline-flex align-items-center fw-medium"
            onClick={() => setShowForm(true)}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(0.95rem, 2.5vw, 1rem)',
              transition: 'all 0.3s ease',
              borderWidth: '2px',
              borderColor: '#ef4444',
              color: '#ef4444',
              background: 'transparent'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'linear-gradient(45deg, #ef4444, #f87171)';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.borderColor = 'transparent';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#ef4444';
              e.currentTarget.style.borderColor = '#ef4444';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <svg className="me-2" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
            </svg>
            Share Your Experience
          </button>
        </div>

        {/* Testimonial Form Modal */}
        {showForm && (
          <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content rounded-4 overflow-hidden border-0 shadow-lg">
                <div className="position-absolute top-0 end-0 m-3">
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => {
                      setShowForm(false);
                      setSubmitStatus(null);
                    }}
                    disabled={submitting}
                    aria-label="Close form"
                  ></button>
                </div>
                
                <div className="modal-header border-0 pt-5 px-4 pb-0">
                  <div className="w-100 text-center">
                    <div className="bg-brand-red rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                      style={{ width: '60px', height: '60px', background: 'linear-gradient(45deg, #ef4444, #f87171)' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4-6h-2v6h2v-6zm-4-4h-2v2h2V7zm4 0h-2v2h2V7z"/>
                      </svg>
                    </div>
                    <h5 className="modal-title text-brand-black fw-bold" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Share Your Experience
                    </h5>
                    <p className="text-muted small">We value your feedback</p>
                  </div>
                </div>
                
                <div className="modal-body px-4 pb-4">
                  {submitStatus === 'success' ? (
                    <div className="text-center py-4">
                      <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                        style={{ width: '80px', height: '80px' }}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="#22c55e">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                      <h5 className="text-success fw-bold mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Thank You!
                      </h5>
                      <p className="text-muted" style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem' }}>
                        Your testimonial has been submitted successfully.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label htmlFor="name" className="form-label fw-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                          Your Name
                        </label>
                        <input
                          type="text"
                          className="form-control rounded-3 py-2"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          disabled={submitting}
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="form-label fw-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                          Your Rating
                        </label>
                        <div className="d-flex justify-content-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              className="btn p-1"
                              onClick={() => handleRatingChange(star)}
                              disabled={submitting}
                              aria-label={`Rate ${star} stars`}
                            >
                              <svg
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                fill={star <= formData.rating ? 'currentColor' : 'none'}
                                stroke="currentColor"
                                strokeWidth="1.5"
                                className={star <= formData.rating ? 'text-warning' : 'text-muted'}
                                style={{ transition: 'all 0.2s ease' }}
                              >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                              </svg>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="mb-4">
                        <label htmlFor="review" className="form-label fw-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                          Your Review
                        </label>
                        <textarea
                          className="form-control rounded-3 py-2"
                          id="review"
                          name="review"
                          rows="4"
                          value={formData.review}
                          onChange={handleInputChange}
                          required
                          disabled={submitting}
                          placeholder="Share your experience with our catering service..."
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        ></textarea>
                      </div>
                      {submitStatus === 'error' && (
                        <div className="alert alert-danger rounded-3 d-flex align-items-center" role="alert" style={{ fontFamily: "'Inter', sans-serif" }}>
                          <svg className="me-2" width="20" height="20" viewBox="0 0 24 24" fill="#dc3545">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                          </svg>
                          There was an error submitting your testimonial. Please try again.
                        </div>
                      )}
                      <div className="d-flex gap-3">
                        <button
                          type="button"
                          className="btn btn-outline-secondary rounded-pill flex-fill py-2"
                          onClick={() => {
                            setShowForm(false);
                            setSubmitStatus(null);
                          }}
                          disabled={submitting}
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn btn-brand-red text-white rounded-pill flex-fill py-2 fw-medium"
                          disabled={submitting}
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            background: 'linear-gradient(45deg, #ef4444, #f87171)',
                            border: 'none',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseOver={(e) => {
                            if (!submitting) {
                              e.currentTarget.style.background = 'linear-gradient(45deg, #dc2626, #ef4444)';
                              e.currentTarget.style.transform = 'translateY(-1px)';
                            }
                          }}
                          onMouseOut={(e) => {
                            if (!submitting) {
                              e.currentTarget.style.background = 'linear-gradient(45deg, #ef4444, #f87171)';
                              e.currentTarget.style.transform = 'translateY(0)';
                            }
                          }}
                        >
                          {submitting ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                              Submitting...
                            </>
                          ) : (
                            'Submit Review'
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .testimonial-carousel {
          position: relative;
          overflow: hidden;
          padding: 1rem;
        }
        .carousel-inner {
          position: relative;
          width: 100%;
          overflow: hidden;
        }
        .carousel-item {
          display: block;
          width: 100%;
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .testimonial-card {
          min-height: 320px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          transition: all 0.4s ease;
          border-radius: 1rem !important;
          background: #fff !important;
          box-shadow: 0 10px 25px rgba(0,0,0,0.08) !important;
          border: 1px solid rgba(0,0,0,0.05);
        }
        .testimonial-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.12) !important;
        }
        .max-w-600 {
          max-width: 600px;
        }
        .max-w-700 {
          max-width: 700px;
        }
        .modal-content {
          box-shadow: 0 25px 50px rgba(0,0,0,0.25);
          border: none;
          border-radius: 1rem !important;
        }
        .form-control:focus {
          border-color: #ef4444;
          box-shadow: 0 0 0 0.2rem rgba(239, 68, 68, 0.15);
        }
        .btn-brand-red:hover {
          background: linear-gradient(45deg, #dc2626, #ef4444) !important;
        }
        @media (max-width: 992px) {
          .carousel-control-prev,
          .carousel-control-next {
            position: relative !important;
            top: auto !important;
            transform: none !important;
            display: inline-block;
            margin: 0 0.5rem;
          }
          .carousel-control-prev {
            left: auto;
            transform: none !important;
          }
          .carousel-control-next {
            right: auto;
            transform: none !important;
          }
          .testimonial-card {
            padding: 2rem !important;
            min-height: 280px;
          }
        }
        @media (max-width: 768px) {
          .testimonial-card {
            padding: 1.5rem !important;
          }
          .modal-dialog {
            margin: 1rem;
          }
        }
      `}</style>
    </section>
  );
}

export default Testimonials;
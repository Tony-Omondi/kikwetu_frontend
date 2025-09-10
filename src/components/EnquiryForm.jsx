import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';

function EnquiryForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [submitStatus, setSubmitStatus] = useState(null);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  // Detect scroll for animation with IntersectionObserver
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

  const onSubmit = async (data) => {
    try {
      setSubmitStatus('submitting');
      await axios.post('http://127.0.0.1:8000/api/enquiries/', data);
      setSubmitStatus('success');
      reset();
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const handleLinkClick = (e) => {
    e.preventDefault();
    console.log('Link clicked:', e.target.getAttribute('href'));
    // Replace with actual navigation or modal logic if needed
  };

  return (
    <section id="enquiry" className="py-5 py-md-7 bg-light" ref={sectionRef}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-8">
            <div className="card shadow-lg border-0 overflow-hidden rounded-4" style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 1s ease, transform 1s ease'
            }}>
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-5">
                  <h2 className="fw-bold mb-3 display-5" style={{ 
                    fontFamily: "'Playfair Display', serif",
                    color: '#1f2937'
                  }}>
                    Book Us for Your Next <span style={{ color: '#ef4444' }}>Event</span>
                  </h2>
                  <p className="lead text-muted max-w-700 mx-auto" style={{
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: 'clamp(1rem, 3vw, 1.25rem)'
                  }}>
                    Let's plan your next unforgettable event together. Fill out the form below and we'll get back to you shortly.
                  </p>
                </div>
                
                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="alert alert-success alert-dismissible fade show rounded-3 mb-5" role="alert" style={{
                    fontFamily: "'Roboto', sans-serif",
                    animation: 'fadeIn 0.5s ease'
                  }}>
                    <span className="material-symbols-outlined me-2" style={{ fontSize: '1.5rem', verticalAlign: 'middle' }}>
                      check_circle
                    </span>
                    <strong>Success!</strong> Your enquiry has been submitted. We'll contact you soon.
                    <button 
                      type="button" 
                      className="btn-close" 
                      onClick={() => setSubmitStatus(null)}
                      aria-label="Close success message"
                    ></button>
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="alert alert-danger alert-dismissible fade show rounded-3 mb-5" role="alert" style={{
                    fontFamily: "'Roboto', sans-serif",
                    animation: 'fadeIn 0.5s ease'
                  }}>
                    <span className="material-symbols-outlined me-2" style={{ fontSize: '1.5rem', verticalAlign: 'middle' }}>
                      error
                    </span>
                    <strong>Error!</strong> There was a server issue submitting your enquiry. It has been saved, but please try again later or contact us directly.
                    <button 
                      type="button" 
                      className="btn-close" 
                      onClick={() => setSubmitStatus(null)}
                      aria-label="Close error message"
                    ></button>
                  </div>
                )}
                
                <form onSubmit={handleSubmit(onSubmit)} className="row g-4">
                  <div className="col-12 col-md-6">
                    <label htmlFor="name" className="form-label fw-semibold" style={{ 
                      fontFamily: "'Roboto', sans-serif",
                      color: '#1f2937'
                    }}>
                      Full Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register('name', { required: 'Name is required' })}
                      className={`form-control rounded-3 ${errors.name ? 'is-invalid' : ''}`}
                      placeholder="Your full name"
                      style={{ fontFamily: "'Roboto', sans-serif", fontSize: 'clamp(0.9rem, 2.5vw, 1rem)' }}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                  </div>
                  
                  <div className="col-12 col-md-6">
                    <label htmlFor="email" className="form-label fw-semibold" style={{ 
                      fontFamily: "'Roboto', sans-serif",
                      color: '#1f2937'
                    }}>
                      Email Address <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register('email', { 
                        required: 'Email is required', 
                        pattern: { 
                          value: /\S+@\S+\.\S+/, 
                          message: 'Please enter a valid email address' 
                        } 
                      })}
                      className={`form-control rounded-3 ${errors.email ? 'is-invalid' : ''}`}
                      placeholder="your.email@example.com"
                      style={{ fontFamily: "'Roboto', sans-serif", fontSize: 'clamp(0.9rem, 2.5vw, 1rem)' }}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                  </div>
                  
                  <div className="col-12 col-md-6">
                    <label htmlFor="phone" className="form-label fw-semibold" style={{ 
                      fontFamily: "'Roboto', sans-serif",
                      color: '#1f2937'
                    }}>
                      Phone Number <span className="text-danger">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      {...register('phone', { 
                        required: 'Phone number is required',
                        pattern: {
                          value: /^[+]?[\d\s\-()]+$/,
                          message: 'Please enter a valid phone number'
                        }
                      })}
                      className={`form-control rounded-3 ${errors.phone ? 'is-invalid' : ''}`}
                      placeholder="+1 (555) 123-4567"
                      style={{ fontFamily: "'Roboto', sans-serif", fontSize: 'clamp(0.9rem, 2.5vw, 1rem)' }}
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
                  </div>
                  
                  <div className="col-12 col-md-6">
                    <label htmlFor="event_type" className="form-label fw-semibold" style={{ 
                      fontFamily: "'Roboto', sans-serif",
                      color: '#1f2937'
                    }}>
                      Event Type <span className="text-danger">*</span>
                    </label>
                    <select
                      id="event_type"
                      {...register('event_type', { required: 'Please select an event type' })}
                      className={`form-select rounded-3 ${errors.event_type ? 'is-invalid' : ''}`}
                      style={{ fontFamily: "'Roboto', sans-serif", fontSize: 'clamp(0.9rem, 2.5vw, 1rem)' }}
                    >
                      <option value="">Select Event Type</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="wedding">Wedding</option>
                      <option value="birthday">Birthday</option>
                      <option value="burial">Burial</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.event_type && <div className="invalid-feedback">{errors.event_type.message}</div>}
                  </div>
                  
                  <div className="col-12 col-md-6">
                    <label htmlFor="date" className="form-label fw-semibold" style={{ 
                      fontFamily: "'Roboto', sans-serif",
                      color: '#1f2937'
                    }}>
                      Event Date <span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      id="date"
                      {...register('date', { 
                        required: 'Please select an event date',
                        validate: {
                          futureDate: (value) => {
                            const selectedDate = new Date(value);
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            return selectedDate >= today || "Please select a future date";
                          }
                        }
                      })}
                      className={`form-control rounded-3 ${errors.date ? 'is-invalid' : ''}`}
                      min={new Date().toISOString().split('T')[0]}
                      style={{ fontFamily: "'Roboto', sans-serif", fontSize: 'clamp(0.9rem, 2.5vw, 1rem)' }}
                    />
                    {errors.date && <div className="invalid-feedback">{errors.date.message}</div>}
                  </div>
                  
                  <div className="col-12 col-md-6">
                    <label htmlFor="location" className="form-label fw-semibold" style={{ 
                      fontFamily: "'Roboto', sans-serif",
                      color: '#1f2937'
                    }}>
                      Event Location <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="location"
                      {...register('location', { required: 'Please provide an event location' })}
                      className={`form-control rounded-3 ${errors.location ? 'is-invalid' : ''}`}
                      placeholder="Venue name and address"
                      style={{ fontFamily: "'Roboto', sans-serif", fontSize: 'clamp(0.9rem, 2.5vw, 1rem)' }}
                    />
                    {errors.location && <div className="invalid-feedback">{errors.location.message}</div>}
                  </div>
                  
                  <div className="col-12">
                    <label htmlFor="guest_range" className="form-label fw-semibold" style={{ 
                      fontFamily: "'Roboto', sans-serif",
                      color: '#1f2937'
                    }}>
                      Number of Guests <span className="text-danger">*</span>
                    </label>
                    <select
                      id="guest_range"
                      {...register('guest_range', { required: 'Please select a guest range' })}
                      className={`form-select rounded-3 ${errors.guest_range ? 'is-invalid' : ''}`}
                      style={{ fontFamily: "'Roboto', sans-serif", fontSize: 'clamp(0.9rem, 2.5vw, 1rem)' }}
                    >
                      <option value="">Select Guest Range</option>
                      <option value="0-100">0 - 100 Guests</option>
                      <option value="100-200">100 - 200 Guests</option>
                      <option value="200-500">200 - 500 Guests</option>
                      <option value="500-1000">500 - 1000 Guests</option>
                      <option value="1000+">1000+ Guests</option>
                    </select>
                    {errors.guest_range && <div className="invalid-feedback">{errors.guest_range.message}</div>}
                  </div>
                  
                  <div className="col-12">
                    <label htmlFor="message" className="form-label fw-semibold" style={{ 
                      fontFamily: "'Roboto', sans-serif",
                      color: '#1f2937'
                    }}>
                      Additional Details
                    </label>
                    <textarea
                      id="message"
                      {...register('message')}
                      className="form-control rounded-3"
                      placeholder="Tell us about your event, special requirements, or any other details we should know..."
                      rows="5"
                      style={{ fontFamily: "'Roboto', sans-serif", fontSize: 'clamp(0.9rem, 2.5vw, 1rem)' }}
                    />
                  </div>
                  
                  <div className="col-12 mt-4">
                    <button 
                      type="submit" 
                      className="btn btn-lg w-100 py-3 fw-semibold rounded-pill"
                      disabled={isSubmitting}
                      style={{
                        fontFamily: "'Roboto', sans-serif",
                        fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
                        background: isSubmitting ? '#6b7280' : 'linear-gradient(45deg, #ef4444, #f87171)',
                        color: '#fff',
                        transition: 'background 0.3s ease'
                      }}
                      onMouseOver={(e) => {
                        if (!isSubmitting) e.currentTarget.style.background = 'linear-gradient(45deg, #f87171, #ef4444)';
                      }}
                      onMouseOut={(e) => {
                        if (!isSubmitting) e.currentTarget.style.background = 'linear-gradient(45deg, #ef4444, #f87171)';
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Submitting...
                        </>
                      ) : (
                        'Submit Enquiry'
                      )}
                    </button>
                  </div>
                  
                  <div className="col-12 text-center">
                    <p className="small text-muted mt-3" style={{ fontFamily: "'Roboto', sans-serif" }}>
                      By submitting this form, you agree to our{' '}
                      <a 
                        href="#privacy" 
                        className="text-decoration-none text-brand-red" 
                        onClick={handleLinkClick}
                      >
                        privacy policy
                      </a>{' '}
                      and{' '}
                      <a 
                        href="#terms" 
                        className="text-decoration-none text-brand-red" 
                        onClick={handleLinkClick}
                      >
                        terms of service
                      </a>.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .card {
          transition: all 0.3s ease;
        }
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.15) !important;
        }
        .form-control, .form-select {
          transition: all 0.3s ease;
          border-color: #d1d5db;
        }
        .form-control:focus, .form-select:focus {
          border-color: #ef4444;
          box-shadow: 0 0 0 0.2rem rgba(239, 68, 68, 0.25);
        }
        .is-invalid {
          border-color: #dc3545 !important;
        }
        .max-w-700 {
          max-width: 700px;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @media (max-width: 768px) {
          .card-body {
            padding: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}

export default EnquiryForm;
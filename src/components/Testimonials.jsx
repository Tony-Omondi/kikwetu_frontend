import { useState, useEffect } from 'react';
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

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('testimonials');
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
      <div className="d-flex justify-content-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`material-symbols-outlined ${star <= rating ? 'text-warning' : 'text-muted'}`}
            style={{ fontSize: '1.2rem' }}
          >
            {star <= rating ? 'star' : 'star_outline'}
          </span>
        ))}
      </div>
    );
  };

  return (
    <section id="testimonials" className="py-5 py-md-7 bg-white">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="text-brand-black fw-bold mb-3 display-5" style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease'
          }}>
            What Our <span className="text-brand-red">Clients Say</span>
          </h2>
          <p className="lead text-muted max-w-600 mx-auto" style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s'
          }}>
            Hear from those who've experienced our culinary excellence and exceptional service.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="row justify-content-center" style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s'
        }}>
          <div className="col-12 col-lg-10">
            <div className="testimonial-carousel position-relative p-4">
              <div className="testimonial-card bg-light rounded-4 p-5 text-center position-relative">
                <span className="material-symbols-outlined text-brand-red position-absolute top-0 start-0 m-4" 
                  style={{ fontSize: '3rem', opacity: 0.1 }}>
                  format_quote
                </span>
                <span className="material-symbols-outlined text-brand-red position-absolute bottom-0 end-0 m-4" 
                  style={{ fontSize: '3rem', opacity: 0.1, transform: 'rotate(180deg)' }}>
                  format_quote
                </span>
                
                <div className="mb-4">
                  {renderStars(testimonials[currentIndex]?.rating || 5)}
                </div>
                
                <p className="fs-5 fst-italic text-dark mb-4 mx-auto" style={{ maxWidth: '600px' }}>
                  "{testimonials[currentIndex]?.review}"
                </p>
                
                <div className="d-flex align-items-center justify-content-center">
                  <div className="bg-brand-red rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{ width: '50px', height: '50px' }}>
                    <span className="material-symbols-outlined text-white">
                      person
                    </span>
                  </div>
                  <div>
                    <h5 className="mb-0 text-brand-black">{testimonials[currentIndex]?.name}</h5>
                    <small className="text-muted">Satisfied Client</small>
                  </div>
                </div>
              </div>

              {/* Navigation dots */}
              <div className="d-flex justify-content-center mt-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`btn p-0 mx-1 ${index === currentIndex ? 'text-brand-red' : 'text-muted'}`}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Go to testimonial ${index + 1}`}
                  >
                    <span className="material-symbols-outlined">
                      {index === currentIndex ? 'radio_button_checked' : 'radio_button_unchecked'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Add Testimonial Button */}
        <div className="text-center mt-5" style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s'
        }}>
          <button
            className="btn btn-outline-brand-red rounded-pill px-4 py-2 d-inline-flex align-items-center"
            onClick={() => setShowForm(true)}
          >
            <span className="material-symbols-outlined me-2">add_circle</span>
            Share Your Experience
          </button>
        </div>

        {/* Testimonial Form Modal */}
        {showForm && (
          <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content rounded-4">
                <div className="modal-header border-0">
                  <h5 className="modal-title text-brand-black">Share Your Experience</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => {
                      setShowForm(false);
                      setSubmitStatus(null);
                    }}
                    disabled={submitting}
                  ></button>
                </div>
                <div className="modal-body">
                  {submitStatus === 'success' ? (
                    <div className="text-center py-4">
                      <span className="material-symbols-outlined text-success mb-3" style={{ fontSize: '4rem' }}>
                        check_circle
                      </span>
                      <h5 className="text-success">Thank You!</h5>
                      <p>Your testimonial has been submitted successfully.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">Your Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          disabled={submitting}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Your Rating</label>
                        <div className="d-flex justify-content-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              className="btn p-1"
                              onClick={() => handleRatingChange(star)}
                              disabled={submitting}
                            >
                              <span
                                className={`material-symbols-outlined ${star <= formData.rating ? 'text-warning' : 'text-muted'}`}
                                style={{ fontSize: '2rem' }}
                              >
                                {star <= formData.rating ? 'star' : 'star_outline'}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="review" className="form-label">Your Review</label>
                        <textarea
                          className="form-control"
                          id="review"
                          name="review"
                          rows="4"
                          value={formData.review}
                          onChange={handleInputChange}
                          required
                          disabled={submitting}
                          placeholder="Share your experience with our catering service..."
                        ></textarea>
                      </div>
                      {submitStatus === 'error' && (
                        <div className="alert alert-danger" role="alert">
                          There was an error submitting your testimonial. Please try again.
                        </div>
                      )}
                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          className="btn btn-outline-secondary rounded-pill flex-fill"
                          onClick={() => {
                            setShowForm(false);
                            setSubmitStatus(null);
                          }}
                          disabled={submitting}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn btn-brand-red text-white rounded-pill flex-fill"
                          disabled={submitting}
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
          transition: all 0.5s ease;
        }
        
        .testimonial-card {
          min-height: 300px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          transition: all 0.3s ease;
        }
        
        .testimonial-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        
        .max-w-600 {
          max-width: 600px;
        }
        
        .modal-content {
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }
      `}</style>
    </section>
  );
}

export default Testimonials;
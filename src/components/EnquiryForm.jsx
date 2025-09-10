import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';

function EnquiryForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [submitStatus, setSubmitStatus] = useState(null);

  const onSubmit = async (data) => {
    try {
      setSubmitStatus('submitting');
      await axios.post('http://127.0.0.1:8000/api/enquiries/', data);
      setSubmitStatus('success');
      reset();
      // Auto-hide success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      setSubmitStatus('error');
      // Auto-hide error message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <section id="enquiry" className="py-5 py-sm-7 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-9">
            <div className="card shadow-sm border-0 overflow-hidden">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-5">
                  <h2 className="text-brand-primary fw-bold mb-3">Book Us for Your Next Event</h2>
                  <p className="lead text-muted">Let's plan your next unforgettable event together. Fill out the form below and we'll get back to you shortly.</p>
                </div>
                
                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Success!</strong> Your enquiry has been submitted. We'll contact you soon.
                    <button type="button" className="btn-close" onClick={() => setSubmitStatus(null)}></button>
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Error!</strong> There was a problem submitting your enquiry. Please try again.
                    <button type="button" className="btn-close" onClick={() => setSubmitStatus(null)}></button>
                  </div>
                )}
                
                <form onSubmit={handleSubmit(onSubmit)} className="row g-4">
                  <div className="col-12 col-md-6">
                    <label htmlFor="name" className="form-label fw-semibold">Full Name <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      id="name"
                      {...register('name', { required: 'Name is required' })}
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      placeholder="Your full name"
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                  </div>
                  
                  <div className="col-12 col-md-6">
                    <label htmlFor="email" className="form-label fw-semibold">Email Address <span className="text-danger">*</span></label>
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
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                  </div>
                  
                  <div className="col-12 col-md-6">
                    <label htmlFor="phone" className="form-label fw-semibold">Phone Number <span className="text-danger">*</span></label>
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
                      className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                      placeholder="+1 (555) 123-4567"
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
                  </div>
                  
                  <div className="col-12 col-md-6">
                    <label htmlFor="event_type" className="form-label fw-semibold">Event Type <span className="text-danger">*</span></label>
                    <select
                      id="event_type"
                      {...register('event_type', { required: 'Please select an event type' })}
                      className={`form-select ${errors.event_type ? 'is-invalid' : ''}`}
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
                    <label htmlFor="date" className="form-label fw-semibold">Event Date <span className="text-danger">*</span></label>
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
                      className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                      min={new Date().toISOString().split('T')[0]}
                    />
                    {errors.date && <div className="invalid-feedback">{errors.date.message}</div>}
                  </div>
                  
                  <div className="col-12 col-md-6">
                    <label htmlFor="location" className="form-label fw-semibold">Event Location <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      id="location"
                      {...register('location', { required: 'Please provide an event location' })}
                      className={`form-control ${errors.location ? 'is-invalid' : ''}`}
                      placeholder="Venue name and address"
                    />
                    {errors.location && <div className="invalid-feedback">{errors.location.message}</div>}
                  </div>
                  
                  <div className="col-12">
                    <label htmlFor="guest_range" className="form-label fw-semibold">Number of Guests <span className="text-danger">*</span></label>
                    <select
                      id="guest_range"
                      {...register('guest_range', { required: 'Please select a guest range' })}
                      className={`form-select ${errors.guest_range ? 'is-invalid' : ''}`}
                    >
                      <option value="">Select Guest Range</option>
                      <option value="0-50">0 - 50 Guests</option>
                      <option value="50-100">50 - 100 Guests</option>
                      <option value="100-200">100 - 200 Guests</option>
                      <option value="200-500">200 - 500 Guests</option>
                      <option value="500+">500+ Guests</option>
                    </select>
                    {errors.guest_range && <div className="invalid-feedback">{errors.guest_range.message}</div>}
                  </div>
                  
                  <div className="col-12">
                    <label htmlFor="message" className="form-label fw-semibold">Additional Details</label>
                    <textarea
                      id="message"
                      {...register('message')}
                      className="form-control"
                      placeholder="Tell us about your event, special requirements, or any other details we should know..."
                      rows="5"
                    />
                  </div>
                  
                  <div className="col-12 mt-4">
                    <button 
                      type="submit" 
                      className="btn btn-primary btn-lg w-100 py-3 fw-semibold"
                      disabled={isSubmitting}
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
                    <p className="small text-muted mt-3">
                      By submitting this form, you agree to our <a href="#privacy" className="text-decoration-none">privacy policy</a> and <a href="#terms" className="text-decoration-none">terms of service</a>.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EnquiryForm;
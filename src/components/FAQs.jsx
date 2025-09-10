function FAQs({ faqs }) {
  return (
    <section id="faqs" className="py-5 py-sm-7 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-8">
            <div className="text-center mb-5">
              <h2 className="text-brand-primary fw-bold mb-3">Frequently Asked Questions</h2>
              <p className="lead text-muted">Find answers to common questions about our services. Can't find what you're looking for? <a href="#contact" className="text-brand-primary text-decoration-none">Contact us</a> directly.</p>
            </div>
            
            <div className="accordion mt-4" id="faqAccordion">
              {faqs.map((faq, index) => (
                <div key={faq.id} className="accordion-item border-0 mb-3 shadow-sm">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed text-brand-primary fw-semibold py-4"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#faq${index}`}
                      aria-expanded="false"
                      aria-controls={`faq${index}`}
                      style={{
                        backgroundColor: 'rgba(239, 68, 68, 0.05)',
                        borderLeft: '4px solid #ef4444'
                      }}
                    >
                      <span className="me-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ef4444" viewBox="0 0 16 16" className="flex-shrink-0">
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                          <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                        </svg>
                      </span>
                      {faq.question}
                    </button>
                  </h2>
                  <div
                    id={`faq${index}`}
                    className="accordion-collapse collapse"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body text-muted py-4 ps-5" style={{borderLeft: '4px solid #ef4444'}}>
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-5 pt-3">
              <p className="mb-3">Still have questions?</p>
              <a href="#contact" className="btn btn-primary px-4 py-2 fw-semibold">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .accordion-button:not(.collapsed) {
          color: #ef4444;
          background-color: rgba(239, 68, 68, 0.1);
          box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.125);
        }
        .accordion-button:focus {
          border-color: rgba(239, 68, 68, 0.3);
          box-shadow: 0 0 0 0.25rem rgba(239, 68, 68, 0.25);
        }
        .btn-primary {
          background-color: #ef4444;
          border-color: #ef4444;
        }
        .btn-primary:hover {
          background-color: #dc2626;
          border-color: #dc2626;
        }
        .text-brand-primary {
          color: #ef4444;
        }
      `}</style>
    </section>
  );
}

export default FAQs;
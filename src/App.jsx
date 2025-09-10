
import { useEffect, useState } from 'react';
import { HashRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import EnquiryForm from './components/EnquiryForm';
import FAQs from './components/FAQs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [services, setServices] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = 'https://kikwetu-backend-gw66.onrender.com/api/';
    setLoading(true);
    setError(null);
    Promise.all([
      fetch(`${apiUrl}services/`),
      fetch(`${apiUrl}gallery/`),
      fetch(`${apiUrl}testimonials/`),
      fetch(`${apiUrl}faqs/`),
    ])
      .then(responses => Promise.all(responses.map(res => res.json())))
      .then(([servicesData, galleryData, testimonialsData, faqsData]) => {
        setServices(servicesData.results || servicesData);
        setGallery(galleryData.results || galleryData);
        setTestimonials(testimonialsData.results || testimonialsData);
        setFaqs(faqsData.results || faqsData);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (error) return <div className="text-center py-5 text-danger">{error}</div>;

  return (
    <HashRouter>
      <div className="d-flex flex-column min-vh-100" style={{ overflowX: 'hidden', backgroundColor: '#FFFFFF' }}>
        <Navbar />
        <main className="flex-grow pt-5">
          <Hero />
          <div className="container px-4">
            <About />
            <Services services={services} />
            <Gallery gallery={gallery} />
            <Testimonials testimonials={testimonials} />
            <EnquiryForm />
            <FAQs faqs={faqs} />
            <Contact />
          </div>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;

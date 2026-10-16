import React, { useEffect } from 'react';
import BlogSection from '../HomePage/BlogSection/BlogSection';
import Footer from '../Footer/Footer';

const BlogPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="blog-page" style={{ paddingTop: '40px' }}>
      <div className="container" style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '36px', color: '#C10000', textTransform: 'uppercase' }}>Наш Блог</h1>
        <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '16px', color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '10px auto 0' }}>
          Цікаві статті про виноробство, поради сомельє, культуру споживання та поєднання вина з їжею.
        </p>
      </div>
      <BlogSection />
      <Footer />
    </div>
  );
};

export default BlogPage;

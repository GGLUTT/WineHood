import React, { useRef, useState } from "react";
import degustationVideo from "../../../video/degustation.mp4";
import traditionsVideo from "../../../video/tradition.mp4";
import pairingsVideo from "../../../video/poidanie.mp4";
import "./BlogSection.css";

const BlogSection = () => {
  return (
    <section className="blog-section">
      <div className="blog-container">
        <div className="blog-header">
          <h2 className="blog-heading">БЛОГ</h2>
          <a href="/blog" className="read-more">ЧИТАТИ БІЛЬШЕ</a>
        </div>
        
        <p className="blog-description">
          Ласкаво просимо до нашого блогу – простір для натхнення, знань та нових смакових відкриттів. Незалежно від того, знавець ви чи тільки починаєте свій шлях у світ вина, тут ви знайдете щось цікаве для себе.
        </p>
        
        <div className="blog-grid">
          <div className="left-section">
            <BlogCard
              className="left-card"
              videoSrc={degustationVideo}
              title="СЕКРЕТИ ДЕГУСТАЦІЇ"
              link="/secrets"
            />
          </div>
          
          <div className="right-section">
            <div className="top-right">
              <BlogCard
                className="right-card-top"
                videoSrc={traditionsVideo}
                title="ВИННІ ТРАДИЦІЇ"
                link="/traditions"
              />
            </div>
            
            <div className="bottom-right">
              <BlogCard
                className="right-card-bottom"
                videoSrc={pairingsVideo}
                title="ПОЄДНАННЯ ЗІ СТРАВАМИ"
                link="/pairings"
              />
              
              <div className="stats-section">
                <div className="blog-stats">
                  <span>1 000+</span>
                  <p>Експертних Статей</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const BlogCard = ({ className, videoSrc, title, link }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleVideo = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      if (isPlaying) {
        videoElement.pause();
        videoElement.currentTime = 0;
      } else {
        videoElement.play().catch(error => {
          console.error("Помилка відтворення відео:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div 
      className={`blog-card ${className} ${isPlaying ? 'video-active' : ''}`}
      onClick={toggleVideo}
    >
      <video
        ref={videoRef}
        className="blog-video"
        src={videoSrc}
        preload="metadata"
        muted
        playsInline
      />
      <div className="blog-content">
        <h3 className="blog-title">{title}</h3>
        <a href={link} className="blog-btn">ЧИТАТИ</a>
      </div>
    </div>
  );
};

export default BlogSection;
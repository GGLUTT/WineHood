import React, { useRef } from "react";
import { Link } from "react-router-dom";
import degustationVideo from "../../../video/degustation.mp4";
import degustationPoster from "../../../video/degustation_poster.jpg";
import traditionsVideo from "../../../video/tradition.mp4";
import traditionsPoster from "../../../video/tradition_poster.jpg";
import pairingsVideo from "../../../video/poidanie.mp4";
import pairingsPoster from "../../../video/poidanie_poster.jpg";
import useInViewVideo from "../useInViewVideo";
import "./BlogSection.css";

// На пристроях з мишкою відео грає при наведенні, на тач-пристроях — коли картка в екрані.
const canHover = typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

const BlogSection = () => (
  <section className="blog-section">
    <div className="wh-container">
      <div className="blog-header" data-reveal>
        <h2 className="wh-section-title wh-section-title--light">БЛОГ</h2>
        <Link to="/blog" className="wh-btn wh-btn--outline-light">ЧИТАТИ БІЛЬШЕ</Link>
      </div>

      <p className="blog-description" data-reveal>
        Ласкаво просимо до нашого блогу – простір для натхнення, знань та нових смакових відкриттів.
        Незалежно від того, знавець ви чи тільки починаєте свій шлях у світ вина, тут ви знайдете щось цікаве для себе.
      </p>

      <div className="blog-grid">
        <BlogCard
          className="blog-card--main"
          videoSrc={degustationVideo}
          poster={degustationPoster}
          title="СЕКРЕТИ ДЕГУСТАЦІЇ"
          to="/blog"
        />
        <BlogCard
          className="blog-card--top"
          videoSrc={traditionsVideo}
          poster={traditionsPoster}
          title="ВИННІ ТРАДИЦІЇ"
          to="/blog"
        />
        <BlogCard
          className="blog-card--bottom"
          videoSrc={pairingsVideo}
          poster={pairingsPoster}
          title="ПОЄДНАННЯ ЗІ СТРАВАМИ"
          to="/blog"
        />
        <div className="blog-stats" data-reveal>
          <span>1 000+</span>
          <p>Експертних статей</p>
        </div>
      </div>
    </div>
  </section>
);

const BlogCard = ({ className, videoSrc, poster, title, to }) => {
  const videoRef = useRef(null);
  useInViewVideo(videoRef, { enabled: !canHover, threshold: 0.6 });

  const play = () => {
    if (canHover) videoRef.current?.play().catch(() => {});
  };

  const pause = () => {
    if (canHover) videoRef.current?.pause();
  };

  return (
    <Link
      to={to}
      className={`blog-card ${className}`}
      onMouseEnter={play}
      onMouseLeave={pause}
      data-reveal
    >
      <video
        ref={videoRef}
        className="blog-video"
        src={videoSrc}
        poster={poster}
        preload="none"
        loop
        muted
        playsInline
      />
      <div className="blog-content">
        <h3 className="blog-title">{title}</h3>
        <span className="blog-btn">ЧИТАТИ</span>
      </div>
    </Link>
  );
};

export default BlogSection;

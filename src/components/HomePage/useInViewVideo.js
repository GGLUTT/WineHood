import { useEffect } from 'react';

// Грає muted-відео лише коли воно у в'юпорті, і ставить на паузу, коли ні.
// Файл не завантажується, доки елемент не наблизиться до екрана (preload="none").
const useInViewVideo = (videoRef, { enabled = true, threshold = 0.35 } = {}) => {
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !enabled) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else if (!video.paused) {
          video.pause();
        }
      },
      { threshold }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [videoRef, enabled, threshold]);
};

export default useInViewVideo;

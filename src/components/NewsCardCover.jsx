import React, { useState } from 'react';

/**
 * Резистентний компонент обкладинки картки новини.
 * Якщо зображення відсутнє (наприклад, на Render, де /uploads у .gitignore)
 * або дало 404 помилку, показує стильний фірмовий бекдроп з гербом коледжу,
 * а не сліпучий білий квадрат чи зламану іконку.
 */
export default function NewsCardCover({ src, alt, category }) {
  const [hasError, setHasError] = useState(false);

  const showFallback = !src || hasError;

  return (
    <div className="news-cover-wrap">
      {showFallback ? (
        <div className="news-cover-fallback">
          <div className="fallback-emblem-wrap">
            <img 
              src="/college-emblem.png" 
              alt="БФКПЕП" 
              className="fallback-emblem-img"
            />
            <span className="fallback-brand-badge">БФКПЕП</span>
          </div>
        </div>
      ) : (
        <img
          src={src}
          alt={alt || 'Новина коледжу'}
          loading="lazy"
          className="news-cover-img"
          onError={() => setHasError(true)}
        />
      )}

      {category && (
        <span className="news-cover-cat-badge">{category}</span>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';

/**
 * Адаптивна Masonry-сітка для новин у стилі оригінального Divi/WordPress.
 * Розподіляє картки новин round-robin по колонках зліва направо,
 * зберігаючи хронологічний порядок та дозволяючи кожному зображенню
 * (як горизонтальному, так і вертикальним сертифікатам/грамотам)
 * відображатися на 100% без обрізання.
 */
export default function NewsMasonryGrid({ items, renderItem, className = '' }) {
  const [columnsCount, setColumnsCount] = useState(() => {
    if (typeof window === 'undefined') return 3;
    const w = window.innerWidth;
    if (w < 768) return 1;
    if (w < 1100) return 2;
    return 3;
  });

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 768) setColumnsCount(1);
      else if (w < 1100) setColumnsCount(2);
      else setColumnsCount(3);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!items || items.length === 0) return null;

  // Розподіл елементів по колонках (col 0, col 1, col 2...)
  const columns = Array.from({ length: columnsCount }, () => []);
  items.forEach((item, idx) => {
    columns[idx % columnsCount].push(item);
  });

  return (
    <div className={`news-masonry-grid ${className}`}>
      {columns.map((colItems, colIdx) => (
        <div key={colIdx} className="news-masonry-col">
          {colItems.map((item, itemIdx) => renderItem(item, itemIdx))}
        </div>
      ))}
    </div>
  );
}

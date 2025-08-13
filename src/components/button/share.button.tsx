'use client';

import React from 'react';

export const FacebookShareButton = () => {
  const handleShare = () => {
    const currentUrl = encodeURIComponent(window.location.href);
    const facebookShareLink = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
    window.open(facebookShareLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleShare}
      className="px-2 py-2 bg-blue-600 text-white hover:bg-blue-700 transition"
    >
      Share Facebook
    </button>
  );
};

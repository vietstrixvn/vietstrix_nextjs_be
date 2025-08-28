export const copyToClipboard = async (url?: string) => {
  try {
    await navigator.clipboard.writeText(url || window.location.href);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
};

export const shareFacebook = (url?: string) => {
  const currentUrl = encodeURIComponent(url || window.location.href);
  const facebookShareLink = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
  window.open(facebookShareLink, '_blank', 'noopener,noreferrer');
};

export const shareTwitter = (title?: string, url?: string) => {
  const currentUrl = encodeURIComponent(url || window.location.href);
  const text = encodeURIComponent(title ?? 'Vietstrix Project');
  const twitterShareLink = `https://x.com/intent/tweet?url=${currentUrl}&text=${text}`;
  window.open(twitterShareLink, '_blank', 'noopener,noreferrer');
};

export const shareLinkedIn = (url?: string) => {
  const currentUrl = encodeURIComponent(url || window.location.href);
  const linkedinShareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`;
  window.open(linkedinShareLink, '_blank', 'noopener,noreferrer');
};

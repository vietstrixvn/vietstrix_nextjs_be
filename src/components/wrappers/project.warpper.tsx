import { Button } from '@/components/ui/button';
import { Facebook, Link, Linkedin, Twitter } from 'lucide-react';
import { Container } from '../container/container';

export default function ProjectSection({
  title,
  content,
  file,
  brand,
  url,
}: {
  title?: string;
  content?: string;
  file?: string;
  brand?: string;
  url?: string;
}) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url || window.location.href);
      setTimeout(() => {}, 2000);
    } catch {}
  };

  const handleShare = () => {
    const currentUrl = encodeURIComponent(window.location.href);
    const facebookShareLink = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
    window.open(facebookShareLink, '_blank', 'noopener,noreferrer');
  };

  const handleShareTwitter = () => {
    const currentUrl = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(title ?? 'Vietstrix Project');
    const twitterShareLink = `https://x.com/intent/tweet?url=${currentUrl}&text=${text}`;
    window.open(twitterShareLink, '_blank', 'noopener,noreferrer');
  };

  const handleShareLinkedIn = () => {
    const currentUrl = encodeURIComponent(window.location.href);
    const linkedinShareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`;
    window.open(linkedinShareLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative h-[600px]  w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${file}')`,
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <Container className="relative z-10 flex  items-center h-full">
        {/* Main Content */}
        <div className="flex flex-1 items-center justify-center">
          <div className="container mx-auto px-6 md:px-8">
            <div className="flex items-center gap-8 md:gap-16">
              {/* Social Icons */}
              <div className="hidden md:flex flex-col gap-6">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10 hover:text-main-50 h-10 w-10"
                  onClick={handleShare}
                >
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10 hover:text-main-50 h-10 w-10"
                  onClick={handleShareLinkedIn}
                >
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10 hover:text-main-50 h-10 w-10"
                  onClick={handleShareTwitter}
                >
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10 hover:text-main-50 h-10 w-10"
                  onClick={handleCopy}
                >
                  <Link className="h-5 w-5" />
                </Button>
              </div>

              {/* Content */}
              <div className="max-w-3xl">
                {/* Logo */}
                <div className="mb-8">
                  <div className="text-white text-2xl font-bold">{brand}</div>
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  {title}
                </h1>

                {/* Description */}
                <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl">
                  {content}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

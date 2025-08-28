import { Button } from '@/components/ui/button';
import {
  copyToClipboard,
  shareFacebook,
  shareLinkedIn,
  shareTwitter,
} from '@/utils';
import { Facebook, Link, Linkedin, Twitter } from 'lucide-react';
import { Container } from '../container/container';
import { Skeleton } from '../ui/skeleton';

export function ProjectSection({
  title,
  content,
  file,
  brand,
  url,
  loading,
}: {
  title?: string;
  content?: string;
  file?: string;
  brand?: string;
  url?: string;
  loading?: boolean;
}) {
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
                  onClick={() => shareFacebook(url)}
                >
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10 hover:text-main-50 h-10 w-10"
                  onClick={() => shareLinkedIn(url)}
                >
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10 hover:text-main-50 h-10 w-10"
                  onClick={() => shareTwitter(url)}
                >
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10 hover:text-main-50 h-10 w-10"
                  onClick={() => copyToClipboard(url)}
                >
                  <Link className="h-5 w-5" />
                </Button>
              </div>

              {/* Content */}
              <div className="max-w-3xl">
                {/* Logo */}
                {loading ? (
                  <>
                    <Skeleton className="h-6 w-32 mb-6 bg-white/30" />
                    <Skeleton className="h-12 w-[70%] mb-6 bg-white/30" />
                    <Skeleton className="h-12 w-[50%] mb-6 bg-white/30" />
                    <Skeleton className="h-24 w-[80%] bg-white/20" />
                  </>
                ) : (
                  <>
                    {/* Logo */}
                    <div className="mb-8">
                      <div className="text-white text-2xl font-bold">
                        {brand}
                      </div>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                      {title}
                    </h1>

                    {/* Description */}
                    <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl">
                      {content}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

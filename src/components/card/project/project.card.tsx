import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ProjectService } from '@/types';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { CustomImage } from '../../design/image.component';
import RevealOnView from '../../design/reveal-on-view';

type Props = {
  title?: string;
  content?: string;
  imageSrc?: string;
  tags?: ProjectService[];
  href?: string;
  priority?: boolean;
  gradientFrom?: string;
  gradientTo?: string;
  imageContainerClassName?: string;
  containerClassName?: string;
  revealDelay?: number;
};

// Server Component (no client hooks)
export default function ProjectCard({
  title = 'Project title',
  content = 'Project subtitle',
  imageSrc = '/placeholder.svg?height=720&width=1280',
  tags = [],
  href = '#',
  priority = false,
  gradientFrom = '#0f172a',
  gradientTo = '#6d28d9',
  imageContainerClassName,
  containerClassName,
  revealDelay = 0,
}: Props) {
  const ref = useRef(null);
  const router = useRouter();

  return (
    <section className="img-container">
      <article className={cn('group relative', containerClassName)} ref={ref}>
        <RevealOnView
          delay={revealDelay}
          className="rounded-3xl border border-white/10 p-1 justify-center items-center   lg:h-[800px]"
          style={{
            backgroundImage: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
          }}
        >
          <Link
            href={`/projects/${href}`}
            className="relative overflow-hidden rounded-[1.35rem] bg-black lg:h-full"
          >
            {/* Image */}
            <div
              className={cn(
                'relative w-full aspect-image-main  sm:aspect-auto sm:h-[60vh] lg:h-[80vh]',
                imageContainerClassName
              )}
            >
              <CustomImage
                src={imageSrc || '/placeholder.svg'}
                alt={title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 66vw"
                priority={priority}
                className="object-cover"
              />
            </div>

            {/* Top-left tags */}
            <div className="pointer-events-none absolute left-4 top-4 flex flex-wrap gap-2">
              {tags.map((t) => (
                <Badge
                  key={t.id}
                  variant="secondary"
                  className="pointer-events-auto bg-black/50 text-white border-white/20 backdrop-blur-sm"
                >
                  {t.name}
                </Badge>
              ))}
            </div>

            {/* Bottom content */}
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h3 className="text-lg text-white font-semibold sm:text-xl">
                    {title}
                  </h3>
                  <p className="text-sm text-white/70">{content}</p>
                </div>
                <div
                  onClick={() => router.push(`/projects/${href}`)}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-medium backdrop-blur transition-colors hover:bg-white/60 self-start sm:self-auto"
                  aria-label={`Open case study: ${title}`}
                >
                  Case study
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </Link>
        </RevealOnView>
      </article>
    </section>
  );
}

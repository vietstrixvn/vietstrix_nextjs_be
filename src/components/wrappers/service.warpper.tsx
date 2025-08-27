import Link from 'next/link';
import { Container } from '../container/container';
import { CustomImage } from '../design/image.component';
import { Button } from '../ui/button';

export const ServiceWrapper = ({
  title,
  content,
  file,
}: {
  title?: string;
  content?: string;
  file?: string;
}) => {
  console.log(file);
  return (
    <div className="w-full bg-gradient-to-br from-stone-100 to-blue-50 overflow-hidden flex items-center">
      <Container className="z-10 mx-auto px-6 py-16 w-full ">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full sm:mt-12 lg:mt-2">
          <div className="space-y-8 mt-16 lg:mt-2">
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              {title}
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
              {content}
            </p>

            <Link href="/contact-us">
              <Button
                size="lg"
                className="bg-amber-400 hover:bg-amber-500 text-black font-semibold px-8 py-6 text-base rounded-sm"
              >
                Describe your project
              </Button>
            </Link>
          </div>

          <div className="relative h-[400px] lg:aspect-image-main w-full overflow-hidden">
            <CustomImage
              src={file || '/placeholder.svg'}
              alt={`Featured image for ${title}`}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

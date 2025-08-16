import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ROUTES } from '@/lib';
import DefaultLayout from '@/components/layouts/default-layout/default.layout';
import { Container } from '@/components';

export default function NotFound() {
  return (
    <DefaultLayout>
      <Container className="mt-16 min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <div className="max-w-md space-y-6">
          <h1
            className="text-[220px] font-bold leading-none tracking-tighter animate-fade-in-down"
            style={{ animationDelay: '0.2s', animationDuration: '0.8s' }}
          >
            404
          </h1>
          <h2
            className="text-4xl font-bold animate-fade-in-up"
            style={{ animationDelay: '0.4s', animationDuration: '0.8s' }}
          >
            Oh no! This page doesn't exist.
          </h2>
          <p
            className="text-muted-foreground animate-fade-in-up"
            style={{ animationDelay: '0.6s', animationDuration: '0.8s' }}
          >
            The link you are visiting may be incorrect or the page may have been
            removed.
            <br />
            But don't worry, there are still many great things waiting for you
            to discover!
          </p>
          <div
            className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in-up"
            style={{ animationDelay: '0.8s', animationDuration: '0.8s' }}
          >
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2  bg-main px-6 py-3 font-medium text-white transition-colors hover:bg-main/80 hover:scale-105 transform  md:transition-transform duration-300 animate-pulse-subtle"
            >
              Back to Home Page
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={ROUTES.SERVICE.ROOT}
              className="inline-flex items-center justify-center gap-2 border border-gray-300 px-6 py-3 font-medium transition-colors hover:bg-gray-100 hover:scale-105 transform md:transition-transform duration-300"
            >
              View Services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Container>
    </DefaultLayout>
  );
}

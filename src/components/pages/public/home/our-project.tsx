'use client';

import SectionHeader from '@/components/design/SectionHeader';
import { ProjectList } from '@/lib/responses/projectLib';
import { Loader2 } from 'lucide-react';
import { MoreButton } from '@/components/button';
import { NoResultsFound } from '@/components/design/NoResultsFound';
import { ErrorLoading } from '@/components/loading/error';
import { CaseStudyCard } from '@/components/card/case_study.card';
import { Container } from '@/components/container/container';
// import ContactCTA from './ContactCta';

export function SuccessStories() {
  const params = {
    page_size: 10,
  };

  const { projects, isLoading, isError } = ProjectList(1, params, 0);
  return (
    <Container className="py-4 px-4 md:px-4 lg:px-8 bg-white">
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <SectionHeader title="Our Projects" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Showcasing Our Success Stories
            </h2>
          </div>
          <MoreButton href="/project" />
        </div>
      </div>

      <div className="relative">
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
            <span className="ml-2 text-gray-500">Loading projects...</span>
          </div>
        )}

        {isError && <ErrorLoading />}

        {!isLoading && !isError && (
          <>
            {projects.length === 0 ? (
              <NoResultsFound />
            ) : (
              <>
                {/* Left column */}
                <div className="md:w-1/2 md:absolute md:left-0 md:top-0 md:pr-6 space-y-16">
                  {projects
                    .filter((_, i) => i % 2 === 0)
                    .map((study, index) => (
                      <CaseStudyCard
                        key={study.id}
                        study={study}
                        index={index * 2}
                      />
                    ))}
                </div>

                {/* Right column */}
                <div className="md:w-1/2 md:absolute md:right-0 md:top-[10%] md:pl-6 space-y-16">
                  {projects
                    .filter((_, i) => i % 2 === 1)
                    .map((study, index) => (
                      <CaseStudyCard
                        key={study.id}
                        study={study}
                        index={index * 2 + 1}
                      />
                    ))}
                </div>

                {/* Spacer div */}
                <div className="md:h-[1650px]"></div>
              </>
            )}
          </>
        )}
      </div>
    </Container>
  );
}

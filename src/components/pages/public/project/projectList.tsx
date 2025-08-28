'use client';

import { ProjectCard } from '@/components/card';
import { NoResultsFound } from '@/components/design/NoResultsFound';
import { ErrorLoading } from '@/components/loading/error';
import { LoadingSpin } from '@/components/loading/loading';
import { ProjectList } from '@/lib';

function StyleSheet() {
  return (
    <style>{`
        .img-container {
          scroll-snap-align: start;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        @media (min-width: 1024px) {
          .img-container {
            height: 100vh;
          }
        }

        .progress {
            position: fixed;
            left: 0;
            right: 0;
            height: 5px;
            background: var(--hue-6);
            bottom: 50px;
            transform: scaleX(0);
        }

        /* Hide scrollbar cross-browser */
        .project-scroll {
            -ms-overflow-style: none;  /* IE & Edge */
            scrollbar-width: none;
        }
        .project-scroll::-webkit-scrollbar {
            display: none;
        }
    `}</style>
  );
}

export const ProjectListData = () => {
  const params = {
    page_size: 10,
    status: 'show',
  };

  const { projects, isLoading, isError } = ProjectList(1, params, 0);

  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll project-scroll mt-22">
      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <LoadingSpin />
        </div>
      )}

      {isError && (
        <div className="flex justify-center items-center py-20">
          <ErrorLoading />
        </div>
      )}

      {!isLoading && !isError && projects.length === 0 && (
        <div className="flex justify-center items-center py-20">
          <NoResultsFound />
        </div>
      )}

      {!isLoading &&
        !isError &&
        projects.length > 0 &&
        projects.map((p, idx) => (
          <ProjectCard
            key={p.title}
            title={p.title}
            content={p.content}
            imageSrc={p.file}
            tags={p.services}
            href={p.slug}
            imageContainerClassName="lg:h-full"
            containerClassName="mb-6 lg:h-[calc(100svh-2rem)]"
            revealDelay={idx * 0.06}
          />
        ))}
      <StyleSheet />
    </div>
  );
};

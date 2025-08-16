import React from 'react';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';

export function CtaGithub() {
  return (
    <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
      <a
        href="https://github.com/vietstrixvn"
        rel="noopener noreferrer"
        target="_blank"
        className="text-gray-300 hover:text-black"
      >
        <Github />
      </a>
    </Button>
  );
}

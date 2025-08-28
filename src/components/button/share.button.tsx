// components/ShareButtons.tsx
'use client';

import {
  copyToClipboard,
  shareFacebook,
  shareLinkedIn,
  shareTwitter,
} from '@/utils';
import { Copy } from 'lucide-react';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';

interface ShareButtonsProps {
  url: string;
  title?: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  return (
    <div className="flex flex-col items-center space-y-2">
      <p className="text-gray-700 font-medium">
        Share the article with your friends:
      </p>
      <div className="flex space-x-6">
        <button onClick={() => shareFacebook(url)} className="p-2   ">
          <FaFacebook
            size={28}
            className="text-gray-700 hover:text-blue-600 transition"
          />
        </button>

        <button onClick={() => shareTwitter(url)} className="p-2 ">
          <FaSquareXTwitter
            size={28}
            className="text-gray-700 hover:text-blue-600 transition"
          />
        </button>

        <button onClick={() => shareLinkedIn(url)} className="p-2 ">
          <FaLinkedin
            size={28}
            className="text-gray-700 hover:text-blue-600 transition"
          />
        </button>

        <div className="relative flex flex-col items-center">
          <button
            onClick={() => copyToClipboard(url)}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <Copy size={28} className="text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
}

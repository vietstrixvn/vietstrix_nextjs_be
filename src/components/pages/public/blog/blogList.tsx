// @ts-nocheck
// All TypeScript e

'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

// Sample blog post data
const initialPosts = [
  {
    id: 1,
    title: 'The Role of Prototyping in Product Design',
    excerpt:
      'This iterative process is crucial for addressing potential issues, validating design choices, and',
    date: 'JUN 25, 2024',
    image: '/imgs/banner4.jpg?height=400&width=400',

    slug: '/blogs/blog1',
  },
  {
    id: 2,
    title: 'Designing for User Experience: Key Considerations',
    excerpt:
      'Methods such as user interviews, surveys, and persona development help in gaining insights into user',
    date: 'JUN 24, 2024',
    image: '/imgs/banner4.jpg?height=400&width=400',
    slug: '/blogs/blog1',
  },
  {
    id: 3,
    title: 'The Future of Product Design: Trends to Watch in 2024',
    excerpt:
      'Designers are increasingly focusing on creating products with minimal environmental impact by using',
    date: 'JUN 23, 2024',
    image: '/imgs/banner4.jpg?height=400&width=400',
    slug: '/blogs/blog1',
  },
  {
    id: 4,
    title: '10 Essential Web Design Principles for 2024',
    excerpt:
      'Start by conducting thorough user research to understand what your audience values and how they',
    date: 'JUN 22, 2024',
    image: '/imgs/banner4.jpg?height=400&width=400',
    slug: '/blogs/blog1',
  },
  {
    id: 5,
    title: 'Responsive Web Design: Best Practices and Tips',
    excerpt:
      'With the proliferation of smartphones, tablets, and other mobile devices, responsive design ensures',
    date: 'JUN 21, 2024',
    image: '/imgs/banner4.jpg?height=400&width=400',
    slug: '/blogs/blog1',
  },
];

// Additional posts to load when clicking "Load More"
const additionalPosts = [
  {
    id: 6,
    title: 'Color Theory in Modern Web Design',
    excerpt:
      'Understanding how colors interact and influence user perception can dramatically improve engagement',
    date: 'JUN 20, 2024',
    image: '/imgs/banner4.jpg?height=400&width=400',
    slug: '/blog/color-theory-web-design',
  },
  {
    id: 7,
    title: 'Accessibility in Digital Products: A Complete Guide',
    excerpt:
      'Creating inclusive designs that work for everyone is not just ethical but also expands your market reach',
    date: 'JUN 19, 2024',
    image: '/imgs/banner4.jpg?height=400&width=400',
    slug: '/blog/accessibility-digital-products',
  },
  {
    id: 8,
    title: 'The Psychology Behind Effective UI Design',
    excerpt:
      'Understanding cognitive patterns and user behavior helps create interfaces that feel intuitive and natural',
    date: 'JUN 18, 2024',
    image: '/imgs/banner4.jpg?height=400&width=400',
    slug: '/blog/psychology-ui-design',
  },
];

export default function BlogGrid() {
  const [posts, setPosts] = useState(initialPosts);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const handleLoadMore = () => {
    setLoading(true);

    // Simulate API call with setTimeout
    setTimeout(() => {
      setPosts([...posts, ...additionalPosts]);
      setLoading(false);
      setAllLoaded(true); // In a real app, you'd check if there are more posts to load
    }, 1500);
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    postId: number
  ) => {
    // Get coordinates relative to the current target element
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Scroll to section smoothly
  useEffect(() => {
    const scrollToSection = () => {
      if (sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };

    // Scroll after a short delay to ensure component is mounted
    const timer = setTimeout(scrollToSection, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <Link href={post.slug} className="block">
              <div
                className="relative overflow-hidden group"
                ref={(el) => {
                  if (el) imageRefs.current.set(post.id, el);
                }}
                onMouseMove={(e) => handleMouseMove(e, post.id)}
                onMouseEnter={() => setHoveredPost(post.id)}
                onMouseLeave={() => setHoveredPost(null)}
              >
                <Image
                  src={post.image || '/placeholder.svg'}
                  alt={post.title}
                  width={400}
                  height={400}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay with gradient - always visible but darker on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent ${
                    hoveredPost === post.id ? 'opacity-80' : 'opacity-60'
                  } transition-opacity duration-300`}
                />

                {/* Mouse following "Read" button - only visible when hovering this specific post */}
                {hoveredPost === post.id && (
                  <motion.div
                    className="absolute flex items-center gap-2 text-white font-medium bg-main px-3 py-1.5 rounded-sm pointer-events-none"
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.1 }}
                    style={{
                      transform: `translate(-50%, -50%)`,
                      left: mousePosition.x,
                      top: mousePosition.y,
                    }}
                  >
                    Read
                    <ArrowUpRight className="h-4 w-4" />
                  </motion.div>
                )}
              </div>
            </Link>

            <div className="p-5">
              <span className="text-sm text-gray-500">{post.date}</span>
              <h3 className="text-xl font-bold mt-2 mb-3">{post.title}</h3>
              <p className="text-gray-600 text-sm">{post.excerpt}</p>
            </div>
          </article>
        ))}
      </div>

      {/* Load More Button */}
      {!allLoaded && (
        <div className="flex justify-center mt-12">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="px-8 py-3  bg-gray-900 text-white font-medium transition-all duration-300
                     hover:bg-main hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-main focus:ring-opacity-50
                     disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-gray-900 disabled:hover:scale-100"
          >
            {loading ? (
              <span className="flex items-center">
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
                LOADING...
              </span>
            ) : (
              'LOAD MORE'
            )}
          </button>
        </div>
      )}
    </div>
  );
}

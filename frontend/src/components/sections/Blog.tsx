import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';

interface BlogPost {
  title: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
  link: string;
}

const blogPosts: BlogPost[] = [
  {
    title: 'Building Secure Applications: A Developer\'s Guide',
    description:
      'Exploring best practices for implementing security measures in modern web applications, from input validation to secure authentication.',
    category: 'Security',
    date: '2024-03-15',
    readTime: '8 min',
    link: '#',
  },
  {
    title: 'Understanding Blockchain Data Structures',
    description:
      'A deep dive into the fundamental data structures that power blockchain technology, with practical examples in C#.',
    category: 'Blockchain',
    date: '2024-02-20',
    readTime: '12 min',
    link: '#',
  },
  {
    title: 'Inter-Process Communication in .NET',
    description:
      'Techniques and patterns for building robust IPC solutions in .NET applications, featuring named pipes, memory-mapped files, and more.',
    category: 'Development',
    date: '2024-01-10',
    readTime: '10 min',
    link: '#',
  },
  {
    title: 'React Performance Optimization Techniques',
    description:
      'Practical strategies for improving React application performance, including memoization, code splitting, and lazy loading.',
    category: 'Frontend',
    date: '2023-12-05',
    readTime: '7 min',
    link: '#',
  },
];

const categoryColors: Record<string, string> = {
  Security: 'bg-chart-5/20 text-chart-5 border-chart-5/30',
  Blockchain: 'bg-chart-1/20 text-chart-1 border-chart-1/30',
  Development: 'bg-chart-2/20 text-chart-2 border-chart-2/30',
  Frontend: 'bg-chart-4/20 text-chart-4 border-chart-4/30',
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function Blog() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <section id="blog" className="py-20 sm:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Blog</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Thoughts, tutorials, and insights on software development, security, and
              technology.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {blogPosts.map((post) => (
              <motion.div
                key={post.title}
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full flex flex-col bg-card/50 backdrop-blur border-border/50 hover:border-primary/30 transition-all duration-300 group">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge
                        variant="outline"
                        className={categoryColors[post.category] || 'bg-muted'}
                      >
                        {post.category}
                      </Badge>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(post.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {post.description}
                    </p>
                  </CardContent>
                  <CardFooter className="pt-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="group/btn p-0 h-auto font-normal text-muted-foreground hover:text-primary"
                    >
                      <a href={post.link}>
                        Read article
                        <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <a href="https://github.com/DeadmanLabs" target="_blank" rel="noopener noreferrer">
                <BookOpen className="w-5 h-5 mr-2" />
                View All Posts
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

type ExperienceLevel = 'Expert' | 'Advanced' | 'Intermediate' | 'Learning';

interface TechItem {
  title: string;
  subcategories: string[];
  level: ExperienceLevel;
  category: string;
}

const techStack: TechItem[] = [
  {
    title: 'C# / .NET',
    subcategories: ['ASP.NET Core', 'WPF', 'Entity Framework', 'LINQ'],
    level: 'Expert',
    category: 'Backend',
  },
  {
    title: 'Python',
    subcategories: ['FastAPI', 'Django', 'NumPy', 'Automation'],
    level: 'Expert',
    category: 'Backend',
  },
  {
    title: 'TypeScript',
    subcategories: ['Node.js', 'Express', 'Type Safety'],
    level: 'Advanced',
    category: 'Backend',
  },
  {
    title: 'React',
    subcategories: ['Hooks', 'Redux', 'Next.js', 'React Query'],
    level: 'Advanced',
    category: 'Frontend',
  },
  {
    title: 'JavaScript',
    subcategories: ['ES6+', 'DOM', 'Web APIs', 'Node.js'],
    level: 'Expert',
    category: 'Frontend',
  },
  {
    title: 'C++',
    subcategories: ['STL', 'Memory Management', 'Performance'],
    level: 'Intermediate',
    category: 'Systems',
  },
  {
    title: 'Delphi',
    subcategories: ['VCL', 'FireMonkey', 'RAD'],
    level: 'Advanced',
    category: 'Systems',
  },
  {
    title: 'SQL',
    subcategories: ['PostgreSQL', 'SQL Server', 'MySQL', 'Query Optimization'],
    level: 'Advanced',
    category: 'Database',
  },
  {
    title: 'Git',
    subcategories: ['GitHub', 'GitLab', 'CI/CD', 'Version Control'],
    level: 'Expert',
    category: 'DevOps',
  },
  {
    title: 'Docker',
    subcategories: ['Containers', 'Compose', 'Deployment'],
    level: 'Intermediate',
    category: 'DevOps',
  },
  {
    title: 'Security',
    subcategories: ['OWASP', 'Penetration Testing', 'Secure Coding'],
    level: 'Advanced',
    category: 'Security',
  },
  {
    title: 'Blockchain',
    subcategories: ['Smart Contracts', 'Web3', 'DeFi'],
    level: 'Intermediate',
    category: 'Web3',
  },
];

const categories = ['All', ...Array.from(new Set(techStack.map((t) => t.category)))];

const levelColors: Record<ExperienceLevel, string> = {
  Expert: 'bg-chart-2/20 text-chart-2 border-chart-2/30',
  Advanced: 'bg-chart-1/20 text-chart-1 border-chart-1/30',
  Intermediate: 'bg-chart-4/20 text-chart-4 border-chart-4/30',
  Learning: 'bg-muted text-muted-foreground border-border',
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
};

export function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTech = useMemo(() => {
    return techStack.filter((tech) => {
      const matchesSearch =
        searchQuery === '' ||
        tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.subcategories.some((sub) =>
          sub.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchesCategory =
        selectedCategory === 'All' || tech.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <section id="tech" className="py-20 sm:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Tech Stack</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Technologies and tools I work with to build robust, secure applications.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <div className="relative flex-1 max-w-md mx-auto sm:mx-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="text-xs"
                >
                  {category}
                </Button>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {filteredTech.map((tech) => (
              <motion.div
                key={tech.title}
                variants={itemVariants}
                layout
                whileHover={{ scale: 1.02 }}
              >
                <Card className="h-full bg-card/50 backdrop-blur border-border/50 hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold">{tech.title}</h3>
                      <Badge
                        variant="outline"
                        className={`text-xs ${levelColors[tech.level]}`}
                      >
                        {tech.level}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {tech.subcategories.map((sub) => (
                        <span
                          key={sub}
                          className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {filteredTech.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground">
                No technologies found matching your search.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

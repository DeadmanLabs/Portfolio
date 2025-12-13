import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Blocks, TrendingUp, Gamepad2, Wrench, Code2 } from 'lucide-react';

const projects = [
  {
    title: 'SimpleBlockchain',
    description:
      'A lightweight blockchain implementation in C# demonstrating core blockchain data structures and concepts. Built for educational purposes and as a foundation for distributed systems.',
    tags: ['C#', '.NET', 'Blockchain', 'Data Structures'],
    icon: Blocks,
    color: 'text-chart-1',
    bgColor: 'bg-chart-1/10',
    github: 'https://github.com/DeadmanLabs/SimpleBlockchain',
    demo: null,
  },
  {
    title: 'Chess.sol',
    description:
      'A complete chess game implementation in JavaScript with full game logic, move validation, and interactive UI. Features support for all standard chess rules and gameplay.',
    tags: ['JavaScript', 'Game Dev', 'Algorithm'],
    icon: Gamepad2,
    color: 'text-chart-2',
    bgColor: 'bg-chart-2/10',
    github: 'https://github.com/DeadmanLabs/Chess.sol',
    demo: null,
  },
  {
    title: 'MetaTraderIPC',
    description:
      'Inter-process communication library for MetaTrader integration. Enables seamless data exchange between trading platforms and external applications for automated trading strategies.',
    tags: ['C#', 'Trading', 'IPC', 'Finance'],
    icon: TrendingUp,
    color: 'text-chart-3',
    bgColor: 'bg-chart-3/10',
    github: 'https://github.com/DeadmanLabs/MetaTraderIPC',
    demo: null,
  },
  {
    title: 'Objectify',
    description:
      'A powerful .NET library enabling cross-program interactions without requiring type definitions. Simplifies inter-application communication and dynamic object handling.',
    tags: ['C#', '.NET', 'Library', 'IPC'],
    icon: Wrench,
    color: 'text-chart-4',
    bgColor: 'bg-chart-4/10',
    github: 'https://github.com/DeadmanLabs/Objectify',
    demo: null,
  },
  {
    title: 'PowerOfWords',
    description:
      'A TypeScript-based project exploring natural language processing and text analysis. Built with modern web technologies for interactive text manipulation.',
    tags: ['TypeScript', 'NLP', 'Web'],
    icon: Code2,
    color: 'text-chart-5',
    bgColor: 'bg-chart-5/10',
    github: 'https://github.com/DeadmanLabs/PowerOfWords',
    demo: null,
  },
  {
    title: 'OpenViewAdvanced',
    description:
      'An open-source alternative to TradingView\'s advanced charting widget. Provides comprehensive financial charting capabilities for web applications.',
    tags: ['JavaScript', 'Finance', 'Charts', 'Open Source'],
    icon: TrendingUp,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    github: 'https://github.com/DeadmanLabs/OpenViewAdvanced',
    demo: null,
  },
];

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

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="py-20 sm:py-32 relative bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A selection of projects showcasing my work across different domains—from
              blockchain and trading systems to developer tools and games.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <motion.div
                key={project.title}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="h-full"
              >
                <Card className="h-full flex flex-col bg-card/50 backdrop-blur border-border/50 hover:border-primary/30 transition-all duration-300 group">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className={`p-3 rounded-lg ${project.bgColor}`}>
                        <project.icon className={`w-6 h-6 ${project.color}`} />
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mt-4 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs font-normal"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-4 gap-2">
                    <Button variant="outline" size="sm" asChild className="flex-1">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      asChild={!!project.demo}
                      className="flex-1"
                      disabled={!project.demo}
                    >
                      {project.demo ? (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Demo
                        </a>
                      ) : (
                        <span className="flex items-center">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Demo
                        </span>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <a
                href="https://github.com/DeadmanLabs?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-5 h-5 mr-2" />
                View All Projects on GitHub
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

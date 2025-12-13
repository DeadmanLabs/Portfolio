import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, Calendar } from 'lucide-react';

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  timeframe: string;
  description: string;
  skills: string[];
  current?: boolean;
}

const experiences: ExperienceItem[] = [
  {
    title: 'Senior Software Developer',
    company: 'Independent / Freelance',
    location: 'Remote',
    timeframe: '2020 - Present',
    description:
      'Developing custom software solutions across multiple domains including trading systems, blockchain applications, and developer tools. Specializing in C#, Python, and TypeScript with a focus on security-conscious development practices.',
    skills: ['C#', 'Python', 'TypeScript', 'React', 'Security'],
    current: true,
  },
  {
    title: 'Full-Stack Developer',
    company: 'Various Projects',
    location: 'Remote',
    timeframe: '2018 - 2020',
    description:
      'Built and maintained web applications and backend services. Developed APIs, integrated third-party services, and implemented automated testing pipelines. Contributed to open-source projects and gaming modifications.',
    skills: ['Node.js', 'React', '.NET', 'SQL', 'Docker'],
  },
  {
    title: 'Software Developer',
    company: 'Self-Employed',
    location: 'Toronto, Canada',
    timeframe: '2016 - 2018',
    description:
      'Started professional development journey building desktop applications, automation tools, and game modifications. Gained expertise in multiple programming languages and development methodologies.',
    skills: ['C#', 'Delphi', 'Python', 'Java', 'Game Modding'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="py-20 sm:py-32 relative bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Experience</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              My professional journey in software development and the skills I've
              acquired along the way.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.title + exp.company}
                  variants={itemVariants}
                  className={`relative flex flex-col md:flex-row gap-8 ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary -translate-x-1/2 mt-6 md:mt-8">
                    {exp.current && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-primary/50"
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className={`flex-1 pl-8 md:pl-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-primary/30 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                          <div>
                            <h3 className="font-semibold text-lg">{exp.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                              <Building2 className="w-4 h-4" />
                              <span>{exp.company}</span>
                            </div>
                          </div>
                          {exp.current && (
                            <Badge className="bg-chart-2/20 text-chart-2 border-chart-2/30">
                              Current
                            </Badge>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            <span>{exp.location}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            <span>{exp.timeframe}</span>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                          {exp.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill) => (
                            <Badge
                              key={skill}
                              variant="secondary"
                              className="text-xs font-normal"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

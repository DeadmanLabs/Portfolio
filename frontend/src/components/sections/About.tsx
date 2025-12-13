import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Briefcase, Target, Clock, GraduationCap, Award } from 'lucide-react';

const quickFacts = [
  {
    icon: MapPin,
    label: 'Location',
    value: 'Toronto, Canada',
  },
  {
    icon: Briefcase,
    label: 'Experience',
    value: '5+ Years',
  },
  {
    icon: Target,
    label: 'Focus',
    value: 'Full-Stack & Security',
  },
  {
    icon: Clock,
    label: 'Availability',
    value: 'Open to Opportunities',
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-20 sm:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">About Me</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A passionate software developer with a keen interest in building secure,
              scalable applications.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div variants={itemVariants} className="space-y-6">
              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-rose-600/10">
                      <GraduationCap className="w-6 h-6 text-rose-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Education</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Self-taught developer with a strong foundation in computer science
                        fundamentals. Continuously expanding knowledge through hands-on
                        projects, online courses, and staying current with industry
                        developments in software development and cyber security.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-red-700/10">
                      <Award className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Experience</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Full-stack developer experienced in building diverse applications—from
                        blockchain solutions and trading platforms to AI-powered tools and
                        game modifications. Proficient across multiple languages including
                        C#, Python, TypeScript, C++, and Delphi with a focus on clean,
                        maintainable code.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed">
                    Known in the developer community as{' '}
                    <span className="text-rose-500 font-mono font-medium">DeadmanLabs</span>,
                    I bring a unique perspective combining software development expertise
                    with cyber security awareness. My work spans from creating developer
                    tools and open-source libraries to building trading integrations and
                    exploring blockchain technology.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="font-semibold text-lg mb-6">Quick Facts</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {quickFacts.map((fact) => (
                  <motion.div
                    key={fact.label}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    className="group"
                  >
                    <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-rose-500/50 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-rose-600/10 group-hover:bg-rose-600/20 transition-colors">
                            <fact.icon className="w-5 h-5 text-rose-500" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wide">
                              {fact.label}
                            </p>
                            <p className="font-medium">{fact.value}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-rose-600/10 to-red-700/10 border border-rose-900/20">
                <h4 className="font-semibold mb-3">What I Bring</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    Security-conscious development practices
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    Cross-platform application development
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    API design and system integration
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    Open source contribution mindset
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

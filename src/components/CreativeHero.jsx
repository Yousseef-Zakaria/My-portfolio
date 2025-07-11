import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { 
  Code, 
  Database, 
  Globe, 
  Zap, 
  Cpu, 
  Terminal, 
  GitBranch,
  Layers,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  ChevronDown,
  Sparkles,
  Rocket,
  Brain,
  Target
} from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import profilePhoto from '../assets/profile-photo.jpg'

// Floating particles component
const FloatingParticles = () => {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 10
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-primary rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

// Floating code snippet component
const FloatingCodeSnippet = ({ code, className, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateX: -15 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        rotateY: [0, 5, 0],
        z: [0, 10, 0]
      }}
      transition={{ 
        duration: 0.8, 
        delay,
        rotateY: { duration: 4, repeat: Infinity, ease: "easeInOut" }
      }}
      whileHover={{ 
        scale: 1.05, 
        rotateY: 10, 
        z: 20,
        transition: { duration: 0.3 }
      }}
      className={`absolute bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="flex items-center space-x-2 mb-2">
        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      </div>
      <code className="text-xs text-muted-foreground font-mono">
        {code}
      </code>
    </motion.div>
  )
}

// Floating tech icon component
const FloatingTechIcon = ({ Icon, name, className, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        y: [0, -10, 0],
        rotate: [0, 5, 0]
      }}
      transition={{ 
        duration: 0.8, 
        delay,
        y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
      }}
      whileHover={{ 
        scale: 1.2, 
        rotate: 15,
        transition: { duration: 0.3 }
      }}
      className={`absolute bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-xl p-3 shadow-lg cursor-pointer ${className}`}
    >
      <Icon className="h-6 w-6 text-primary" />
      <div className="text-xs text-center mt-1 text-muted-foreground font-medium">
        {name}
      </div>
    </motion.div>
  )
}

// Bento grid card component
const BentoCard = ({ children, className, delay = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, rotateX: -10 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        rotateX: 0 
      } : {}}
      transition={{ duration: 0.8, delay }}
      whileHover={{ 
        y: -5, 
        rotateX: 5,
        transition: { duration: 0.3 }
      }}
      className={`bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  )
}

const CreativeHero = ({ scrollToSection }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        })
      }
    }

    const heroElement = heroRef.current
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove)
      return () => heroElement.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <section 
      ref={heroRef}
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/30"
      style={{
        background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(var(--primary), 0.1) 0%, transparent 90%)`
      }}
    >
      {/* Animated background particles */}
      <FloatingParticles />

      {/* Floating code snippets */}
      <FloatingCodeSnippet 
        code="const developer = 'Youssef';"
        className="top-20 left-10 hidden lg:block"
        delay={0.5}
      />
      <FloatingCodeSnippet 
        code="skills.push('React', 'Node.js');"
        className="top-32 right-20 hidden lg:block"
        delay={1}
      />
      <FloatingCodeSnippet 
        code="experience.level = 'Junior';"
        className="bottom-40 left-150 hidden lg:block"
        delay={1.5}
      />

      {/* Floating tech icons */}
      <FloatingTechIcon 
        Icon={Code} 
        name="Frontend"
        className="top-40 left-1/4 hidden xl:block"
        delay={0.8}
      />
      <FloatingTechIcon 
        Icon={Database} 
        name="Database"
        className="top-60 right-1/4 hidden xl:block"
        delay={1.2}
      />
      <FloatingTechIcon 
        Icon={Zap} 
        name="Fast"
        className="bottom-60 left-1/3 hidden xl:block"
        delay={1.6}
      />
      <FloatingTechIcon 
        Icon={Brain} 
        name="AI"
        className="bottom-40 right-1/3 hidden xl:block"
        delay={2}
      />

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 items-center min-h-screen">
          {/* Left side - Main content */}
          <div className="lg:col-span-7 space-y-8">

            {/* Main heading with gradient text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-4"
            >
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <span className="block text-foreground">Hi, I'm</span>
                <span className="block bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent">
                  Youssef Zakaria
                </span>
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex items-center space-x-3"
              >
                <div className="flex items-center space-x-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-3 h-3 bg-green-500 rounded-full"
                  />
                  <span className="text-xl md:text-2xl text-muted-foreground">
                    Full-Stack Developer
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  <Rocket className="h-6 w-6 text-primary" />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
            >
              Crafting digital experiences with{' '}
              <span className="text-primary font-semibold">modern technologies</span> and{' '}
              <span className="text-gray-800 font-semibold">creative solutions</span>. 
              Passionate about building scalable applications that make a difference.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                size="lg" 
                onClick={() => scrollToSection('projects')}
                className="group relative overflow-hidden"
              >
                <span className="relative z-10 cursor-pointer flex items-center">
                  View My Work
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </motion.div>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary to-accent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => scrollToSection('contact')}
                className="group cursor-pointer"
              >
                <motion.div
                  animate={{ rotate: [0, 15, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="mr-2"
                >
                  <Target className="h-4 w-4" />
                </motion.div>
                Let's Connect
              </Button>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="flex space-x-4"
            >
              {[
                { Icon: Github, href: "https://github.com/Yousseef-Zakaria", label: "GitHub" },
                { Icon: Linkedin, href: "https://www.linkedin.com/in/youssef-zakaria-3ab759326/", label: "LinkedIn" },
                { Icon: Mail, href: "mailto:Youssef.Zakaria@svnu.edu.eg", label: "Email" }
              ].map(({ Icon, href, label }, index) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                  className="w-12 h-12 bg-card/50 backdrop-blur-sm border border-border rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right side - Bento grid */}
          <div className="lg:col-span-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Quick stats */}
              <BentoCard delay={0.5} className="col-span-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-primary">3+</div>
                    <div className="text-sm text-muted-foreground">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-700">8+</div>
                    <div className="text-sm text-muted-foreground">Projects Built</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-500">1st</div>
                    <div className="text-sm text-muted-foreground">TIEC Back-End track Rank</div>
                  </div>
                </div>
              </BentoCard>

              {/* Current status */}
              <BentoCard delay={0.7}>
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2"
                  >
                    <Code className="h-4 w-4 text-primary" />
                  </motion.div>
                  <div className="text-sm font-medium">Currently</div>
                  <div className="text-xs text-muted-foreground">Building</div>
                </div>
              </BentoCard>

              {/* Location */}
              <BentoCard delay={0.9}>
                <div className="text-center">
                  <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Globe className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-sm font-medium">Based in</div>
                  <div className="text-xs text-muted-foreground">Cairo, Egypt</div>
                </div>
              </BentoCard>

              {/* Tech stack preview */}
              <BentoCard delay={1.1} className="col-span-2">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Tech Stack</div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { name: 'React', color: 'bg-blue-500/20 text-blue-500' },
                      { name: 'Node.js', color: 'bg-green-500/20 text-green-500' },
                      { name: 'Angular', color: 'bg-red-500/20 text-red-500' },
                      { name: 'MongoDB', color: 'bg-green-600/20 text-green-600' },
                      { name: 'SQL', color: 'bg-red-500/20 text-red-500' }
                    ].map((tech, index) => (
                      <motion.div
                        key={tech.name}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 1.3 + index * 0.1 }}
                        className={`px-2 py-1 rounded-md text-xs font-medium ${tech.color}`}
                      >
                        {tech.name}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </BentoCard>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center space-y-2 cursor-pointer"
            onClick={() => scrollToSection('about')}
          >
            <div className="text-sm text-muted-foreground">Scroll to explore</div>
            <ChevronDown className="h-6 w-6 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default CreativeHero


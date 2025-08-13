"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "next-themes";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Database,
  Server,
  Smartphone,
  Download,
  Send,
  User,
  Sun,
  Moon,
} from "lucide-react";
import { MobileMenu } from "@/components/mobile-menu";
import { HamburgerButton } from "@/components/hamburger-button";
import ContactForm from "@/components/ContactForm";
import Link from "next/link";

// Typing effect hook
const useTypingEffect = (text: string, speed = 100) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return displayText;
};

// Particles component - Only visible in dark mode
const Particles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || theme !== "dark") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.6 + 0.3,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);

        // Blue particles for dark mode
        const particleColor = "129, 140, 248";
        ctx.fillStyle = `rgba(${particleColor}, ${particle.opacity})`;
        ctx.fill();
      });

      // Draw connections
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);

            const connectionColor = "148, 163, 184";
            ctx.strokeStyle = `rgba(${connectionColor}, ${
              0.1 * (1 - distance / 150)
            })`;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [theme, mounted]);

  // Only render canvas in dark mode
  if (!mounted || theme !== "dark") return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "transparent" }}
    />
  );
};

// Theme toggle component
const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="w-9 h-9 rounded-full">
        <div className="h-4 w-4" />
      </Button>
    );
  }

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="w-9 h-9 rounded-full"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 transition-all" />
      ) : (
        <Moon className="h-4 w-4 transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const typedName = useTypingEffect("Alejandro Enrique Rivera Vasquez", 80);
  const typedRole = useTypingEffect("Full Stack Developer", 100);

  useEffect(() => {
    setMounted(true);
  }, []);

  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with React, Node.js, and MongoDB",
      image: "/placeholder.svg?height=300&width=400",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      link: "#",
    },
    {
      title: "Task Management App",
      description:
        "Real-time collaborative task management with Vue.js and Firebase",
      image: "/placeholder.svg?height=300&width=400",
      tech: ["Vue.js", "Firebase", "Tailwind CSS"],
      link: "#",
    },
    {
      title: "AI Chat Bot",
      description: "Intelligent chatbot using OpenAI API and Python backend",
      image: "/placeholder.svg?height=300&width=400",
      tech: ["Python", "OpenAI", "FastAPI", "React"],
      link: "#",
    },
  ];

  const experiences = [
    {
      year: "2022 - Actualidad",
      title: "Analista Programador",
      company: "Secretaria de Innovación, El Salvador",
      description:
        "Lideró el desarrollo de aplicaciones web escalables utilizando tecnologías modernas.",
    },
    {
      year: "2021 - 2022",
      title: "Desarrollador Full Stack",
      company: "Publisoft, El Salvador",
      description:
        "Desarrollé y mantuve múltiples proyectos de clientes utilizando React y Node.js",
    },
    {
      year: "2019 - 2021",
      title: "Front-end Developer & Team Leader Developer ",
      company: "Shift & Control, El Salvador",
      description:
        "Creé interfaces de usuario responsivas, mejoré la experiencia del usuario y estuve encargado en resolver y analizar diferentes problemas técnicos.",
    },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 overflow-x-hidden ${
        theme === "dark" ? "bg-slate-900 text-white" : "bg-white text-slate-900"
      }`}
    >
      <Particles />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-40 backdrop-blur-sm border-b transition-colors duration-300 ${
          theme === "dark"
            ? "bg-slate-900/80 border-slate-700"
            : "bg-white/80 border-slate-200"
        }`}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold text-blue-500"
          >
            AR.DEV
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-8 items-center">
            {["Inicio", "Sobre mí", "Proyectos", "Experiencia", "Contacto"].map(
              (item, index) => (
                <motion.a
                  key={item}
                  href={`#${
                    ["inicio", "about", "projects", "experience", "contact"][
                      index
                    ]
                  }`}
                  whileHover={{ scale: 1.1 }}
                  className={`transition-colors ${
                    theme === "dark"
                      ? "text-slate-300 hover:text-blue-400"
                      : "text-slate-600 hover:text-blue-500"
                  }`}
                >
                  {item}
                </motion.a>
              )
            )}
            <ThemeToggle />
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center space-x-4">
            <ThemeToggle />
            <HamburgerButton
              isOpen={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            />
          </div>
        </div>
      </motion.nav>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Hero Section */}
      <section
        id="inicio"
        className="min-h-screen flex items-center justify-center relative"
      >
        <motion.div style={{ y }} className="text-center z-10 px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <div className="text-sm text-blue-500 mb-4 font-mono">
              {"> Inicializando sistema..."}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span
                className={`text-transparent bg-clip-text bg-gradient-to-r ${
                  theme === "dark"
                    ? "from-white to-blue-400"
                    : "from-slate-900 to-blue-500"
                }`}
              >
                {typedName}
              </span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                className="text-blue-500"
              >
                |
              </motion.span>
            </h1>
            <h2 className="text-xl md:text-2xl text-emerald-500 mb-6 font-mono">
              {typedRole}
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3 }}
              className={`text-lg mb-8 max-w-2xl mx-auto ${
                theme === "dark" ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Codificando ideas en realidades digitales
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              asChild
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              <Link
                href="https://www.linkedin.com/in/alejandro-rivera-65a243169/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="mr-2 h-4 w-4" />
                LinkedIn
              </Link>
            </Button>
            <Button
              variant="outline"
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                theme === "dark"
                  ? "border-slate-600 text-slate-300 hover:bg-slate-800"
                  : "border-slate-300 text-slate-700 hover:bg-slate-100"
              }`}
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Ver Proyectos
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating code elements - Only in dark mode */}
        {theme === "dark" && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x:
                    Math.random() *
                    (typeof window !== "undefined" ? window.innerWidth : 1000),
                  y:
                    Math.random() *
                    (typeof window !== "undefined" ? window.innerHeight : 1000),
                  opacity: 0,
                }}
                animate={{
                  x:
                    Math.random() *
                    (typeof window !== "undefined" ? window.innerWidth : 1000),
                  y:
                    Math.random() *
                    (typeof window !== "undefined" ? window.innerHeight : 1000),
                  opacity: [0, 0.2, 0],
                }}
                transition={{
                  duration: Math.random() * 15 + 15,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 5,
                }}
                className="absolute font-mono text-sm text-slate-500/30"
              >
                {
                  [
                    "const",
                    "function",
                    "return",
                    "import",
                    "export",
                    "async",
                    "await",
                  ][Math.floor(Math.random() * 7)]
                }
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span
                className={`text-transparent bg-clip-text bg-gradient-to-r ${
                  theme === "dark"
                    ? "from-white to-blue-400"
                    : "from-slate-900 to-blue-500"
                }`}
              >
                Sobre mí
              </span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card
                className={`backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300 transform hover:scale-105 hover:rotate-1 ${
                  theme === "dark"
                    ? "bg-slate-800/50 border-slate-700"
                    : "bg-white/50 border-slate-200"
                }`}
              >
                <CardContent className="p-8">
                  <User className="h-12 w-12 text-blue-500 mb-4" />
                  <h3
                    className={`text-xl font-bold mb-4 ${
                      theme === "dark" ? "text-white" : "text-slate-900"
                    }`}
                  >
                    Desarrollador Apasionado
                  </h3>
                  <p
                    className={`mb-6 ${
                      theme === "dark" ? "text-slate-300" : "text-slate-600"
                    }`}
                  >
                    Con más de 4 años de experiencia creando soluciones
                    digitales innovadoras. Me especializo en tecnologías
                    modernas y siempre busco la excelencia en cada proyecto.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Code className="h-5 w-5 text-emerald-500" />
                      <span
                        className={`text-sm ${
                          theme === "dark" ? "text-slate-300" : "text-slate-600"
                        }`}
                      >
                        Frontend
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Server className="h-5 w-5 text-blue-500" />
                      <span
                        className={`text-sm ${
                          theme === "dark" ? "text-slate-300" : "text-slate-600"
                        }`}
                      >
                        Backend
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Database className="h-5 w-5 text-emerald-500" />
                      <span
                        className={`text-sm ${
                          theme === "dark" ? "text-slate-300" : "text-slate-600"
                        }`}
                      >
                        Database
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Smartphone className="h-5 w-5 text-blue-500" />
                      <span
                        className={`text-sm ${
                          theme === "dark" ? "text-slate-300" : "text-slate-600"
                        }`}
                      >
                        Mobile
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div>
                <h4 className="text-lg font-semibold text-blue-500 mb-2">
                  Stack Favorito
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "React",
                    "Vue",
                    "Next.js",
                    "Node.js",
                    "TypeScript",
                    "Python",
                    "PostgreSQL",
                    "MongoDB",
                    "Google Cloud",
                  ].map((tech) => (
                    <motion.span
                      key={tech}
                      whileHover={{ scale: 1.1 }}
                      className={`px-3 py-1 rounded-full text-sm hover:border-blue-500/50 transition-colors ${
                        theme === "dark"
                          ? "bg-slate-800 border border-slate-600 text-slate-300"
                          : "bg-slate-100 border border-slate-300 text-slate-700"
                      }`}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-emerald-500 mb-2">
                  Filosofía
                </h4>
                <p
                  className={
                    theme === "dark" ? "text-slate-300" : "text-slate-600"
                  }
                >
                  "El código limpio no es solo funcional, es arte. Cada línea
                  debe contar una historia, cada función debe tener un propósito
                  claro, y cada proyecto debe superar las expectativas."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span
                className={`text-transparent bg-clip-text bg-gradient-to-r ${
                  theme === "dark"
                    ? "from-white to-blue-400"
                    : "from-slate-900 to-blue-500"
                }`}
              >
                Proyectos Destacados
              </span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card
                  className={`backdrop-blur-sm overflow-hidden hover:border-blue-500/30 transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-slate-800/50 border-slate-700"
                      : "bg-white/50 border-slate-200"
                  }`}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 ${
                        theme === "dark" ? "from-slate-900/80" : "from-white/80"
                      }`}
                    >
                      <Button
                        size="sm"
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Ver Proyecto
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3
                      className={`text-xl font-bold mb-2 ${
                        theme === "dark" ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {project.title}
                    </h3>
                    <p
                      className={`mb-4 ${
                        theme === "dark" ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className={`px-2 py-1 rounded text-xs ${
                            theme === "dark"
                              ? "bg-slate-700 border border-slate-600 text-slate-300"
                              : "bg-slate-100 border border-slate-300 text-slate-700"
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span
                className={`text-transparent bg-clip-text bg-gradient-to-r ${
                  theme === "dark"
                    ? "from-white to-blue-400"
                    : "from-slate-900 to-blue-500"
                }`}
              >
                Experiencia
              </span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto"></div>
          </motion.div>

          {/* ===== Vista MÓVIL: LISTA ===== */}
          <div className="sm:hidden max-w-3xl mx-auto space-y-4">
            {experiences.map((exp, index) => (
              <Card
                key={index}
                className={`backdrop-blur-sm ${
                  theme === "dark"
                    ? "bg-slate-800/50 border-slate-700"
                    : "bg-white/50 border-slate-200"
                }`}
              >
                <CardContent className="p-5">
                  <div className="text-blue-500 font-semibold">{exp.year}</div>
                  <h3
                    className={`text-lg font-bold ${
                      theme === "dark" ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {exp.title}
                  </h3>
                  <div className="text-emerald-500 mb-2">{exp.company}</div>
                  <p
                    className={
                      theme === "dark" ? "text-slate-300" : "text-slate-600"
                    }
                  >
                    {exp.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* ===== Vista DESKTOP: LÍNEA DE TIEMPO ===== */}
          <div className="hidden sm:block max-w-4xl mx-auto relative">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative flex items-center mb-12"
              >
                <div
                  className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 z-10 ${
                    theme === "dark" ? "border-slate-900" : "border-white"
                  }`}
                />
                <div
                  className={`w-1/2 ${
                    index % 2 === 0 ? "pr-8 text-right" : "pl-8 ml-auto"
                  }`}
                >
                  <Card
                    className={`backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300 ${
                      theme === "dark"
                        ? "bg-slate-800/50 border-slate-700"
                        : "bg-white/50 border-slate-200"
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="text-blue-500 font-bold text-lg mb-2">
                        {exp.year}
                      </div>
                      <h3
                        className={`text-xl font-bold mb-1 ${
                          theme === "dark" ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {exp.title}
                      </h3>
                      <div className="text-emerald-500 mb-3">{exp.company}</div>
                      <p
                        className={
                          theme === "dark" ? "text-slate-300" : "text-slate-600"
                        }
                      >
                        {exp.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 to-emerald-500 h-full top-0" />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span
                className={`text-transparent bg-clip-text bg-gradient-to-r ${
                  theme === "dark"
                    ? "from-white to-blue-400"
                    : "from-slate-900 to-blue-500"
                }`}
              >
                Contacto
              </span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3
                className={`text-2xl font-bold mb-6 ${
                  theme === "dark" ? "text-white" : "text-slate-900"
                }`}
              >
                ¡Hablemos!
              </h3>
              <p
                className={`mb-8 ${
                  theme === "dark" ? "text-slate-300" : "text-slate-600"
                }`}
              >
                ¿Tienes un proyecto en mente? ¿Quieres colaborar? No dudes en
                contactarme. Siempre estoy abierto a nuevas oportunidades y
                desafíos.
              </p>

              <div className="space-y-4">
                <motion.a
                  href="mailto:alejandro.riveraev@gmail.com"
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-3 text-blue-500 hover:text-blue-400 transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  <span>alejandro.riveraev@gmail.com</span>
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/alejandro-rivera-65a243169/"
                  whileHover={{ scale: 1.05 }}
                  target="_blank"
                  className="flex items-center space-x-3 text-emerald-500 hover:text-emerald-400 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                  <span>LinkedIn</span>
                </motion.a>
                <motion.a
                  target="_blank"
                  href="https://github.com/Alriveraev"
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-3 text-blue-500 hover:text-blue-400 transition-colors"
                >
                  <Github className="h-5 w-5" />
                  <span>GitHub</span>
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card
                className={`backdrop-blur-sm ${
                  theme === "dark"
                    ? "bg-slate-800/50 border-slate-700"
                    : "bg-white/50 border-slate-200"
                }`}
              >
                <CardContent className="p-6">
                  <ContactForm />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-8 border-t relative z-10 ${
          theme === "dark" ? "border-slate-700" : "border-slate-200"
        }`}
      >
        <div className="container mx-auto px-6 text-center">
          <p className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>
            © 2024 Alejandro Enrique Rivera Vasquez. Todos los derechos
            reservados.
          </p>
          <p
            className={`text-xs mt-2 ${
              theme === "dark" ? "text-slate-500" : "text-slate-500"
            }`}
          >
            Hecho con ❤️ y mucho café ☕
          </p>
        </div>
      </footer>
    </div>
  );
}

"use client"

import { useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars, Float } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Linkedin, Menu, X, Mail, ExternalLink } from "lucide-react"

// 3D Background Component
function AnimatedBackground() {
  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Float speed={1} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[10, 3, 16, 100]} />
          <meshStandardMaterial color="#3b82f6" wireframe />
        </mesh>
      </Float>
      <Float speed={0.5} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[20, 10, -20]}>
          <octahedronGeometry args={[5]} />
          <meshStandardMaterial color="#ec4899" wireframe />
        </mesh>
      </Float>
      <Float speed={0.8} rotationIntensity={0.8} floatIntensity={1.5}>
        <mesh position={[-15, -5, -10]}>
          <icosahedronGeometry args={[3]} />
          <meshStandardMaterial color="#10b981" wireframe />
        </mesh>
      </Float>
      <Float speed={0.6} rotationIntensity={0.6} floatIntensity={1.2}>
        <mesh position={[15, -10, 5]}>
          <dodecahedronGeometry args={[4]} />
          <meshStandardMaterial color="#f59e0b" wireframe />
        </mesh>
      </Float>
      <Float speed={0.9} rotationIntensity={0.9} floatIntensity={1.8}>
        <mesh position={[-20, 15, -15]}>
          <tetrahedronGeometry args={[6]} />
          <meshStandardMaterial color="#8b5cf6" wireframe />
        </mesh>
      </Float>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
    </>
  )
}

// Personal information and skills
const personalInfo = {
  name: "Suryagnik Roy",
  title: "Electronics & Communication Engineering Student",
  bio: "At the heart of it all, I see myself as a builder, explorer, and lifelong learner—someone who's always excited to transform ideas into real-world applications.",
  github: "https://github.com/Suryagnik414",
  linkedin: "https://linkedin.com/in/suryagnik-roy-9a019229b",
  resume: "/resume.pdf",
}

const skills = [
  { category: "Programming", items: ["C", "Python", "MATLAB", "Java"] },
  { category: "Hardware", items: ["Arduino", "Related Boards"] },
  { category: "Software & Design Tools", items: ["Figma", "Proteus", "Xilinx", "FreeCAD", "Git"] },
]

// Projects data
const projects = [
  {
    title: "Smart Home Automation System",
    description:
      "Developed an IoT-based home automation system using ESP32 and React web interface for controlling appliances remotely with real-time sensor monitoring.",
    tech: ["ESP32", "React", "Firebase", "IoT", "Sensors"],
    github: "https://github.com/suryagnikroy/smart-home",
    demo: "https://smart-home-demo.vercel.app",
  },
  {
    title: "Wearable Health Monitor",
    description:
      "Created a wearable device that continuously monitors vital signs and sends real-time alerts to healthcare providers using LoRa communication.",
    tech: ["Arduino", "LoRa", "Health Sensors", "Mobile App", "Cloud"],
    github: "https://github.com/suryagnikroy/health-monitor",
  },
  {
    title: "Autonomous Line Following Robot",
    description:
      "Built an intelligent robot with obstacle avoidance capabilities using computer vision and machine learning for path optimization.",
    tech: ["Raspberry Pi", "OpenCV", "Python", "Machine Learning", "Robotics"],
    github: "https://github.com/suryagnikroy/line-follower-robot",
  },
  {
    title: "Digital Audio Equalizer",
    description:
      "Implemented a real-time digital audio equalizer using DSP techniques with custom filter design and frequency analysis capabilities.",
    tech: ["MATLAB", "DSP", "Audio Processing", "Filter Design", "Real-time"],
    github: "https://github.com/suryagnikroy/audio-equalizer",
  },
]

export default function SuryagnikPortfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "blog", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden dark">
      {/* Fixed 3D Background */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 30], fov: 75 }}>
          <AnimatedBackground />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-900/80 via-blue-900/80 to-teal-900/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-heading font-bold text-xl transition-all duration-300 cursor-pointer text-white hover:bg-gradient-to-r hover:from-cyan-400 hover:to-purple-400 hover:bg-clip-text hover:text-transparent">
              Suryagnik Roy
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {[
                { id: "home", label: "Home" },
                { id: "about", label: "About" },
                { id: "skills", label: "Skills" },
                { id: "projects", label: "Projects" },
                { id: "blog", label: "Blog" },
                { id: "contact", label: "Contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 text-sm font-medium transition-all duration-300 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-pink-400 hover:bg-clip-text hover:text-transparent ${
                    activeSection === item.id ? "text-cyan-400" : "text-gray-300"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button
              className="md:hidden p-2 text-white hover:text-cyan-400 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-border bg-gradient-to-r from-purple-900/90 to-blue-900/90">
              {[
                { id: "home", label: "Home" },
                { id: "about", label: "About" },
                { id: "skills", label: "Skills" },
                { id: "projects", label: "Projects" },
                { id: "blog", label: "Blog" },
                { id: "contact", label: "Contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-cyan-400 ${
                    activeSection === item.id ? "text-cyan-400" : "text-gray-300"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl mb-6 text-balance">
            <span className="text-white hover:bg-gradient-to-r hover:from-cyan-400 hover:via-purple-500 hover:via-pink-500 hover:to-yellow-400 hover:bg-clip-text hover:text-transparent transition-all duration-300 animate-pulse">
              {personalInfo.name}
            </span>
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl mb-4 text-blue-400 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text hover:text-transparent text-balance">
            {personalInfo.title}
          </p>
          <p className="text-lg mb-8 text-gray-300 max-w-2xl mx-auto text-balance">{personalInfo.bio}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              onClick={() => scrollToSection("projects")}
            >
              View My Work
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/25 bg-transparent"
              onClick={() => scrollToSection("contact")}
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </section>

      {/* About section */}
      <section id="about" className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl md:text-5xl mb-4 text-balance text-white hover:bg-gradient-to-r hover:from-green-400 hover:to-blue-500 hover:bg-clip-text hover:text-transparent transition-all duration-300">
              About Me
            </h2>
            <p className="text-lg text-gray-300 text-balance">
              Get to know more about my journey and passion for electronics and technology.
            </p>
          </div>

          <Card className="bg-gradient-to-br from-gray-900/80 via-purple-900/20 to-blue-900/20 backdrop-blur-sm border-2 border-transparent relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/60 via-pink-900/60 to-cyan-900/60 rounded-lg blur opacity-50 group-hover:opacity-70 transition duration-300"></div>
            <CardContent className="relative p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                    <img
                      src="/images/suryagnik-photo.jpg"
                      alt="Suryagnik Roy"
                      className="relative w-full max-w-sm mx-auto rounded-lg shadow-2xl transform group-hover:scale-105 transition-all duration-300"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-2xl mb-4 text-white hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-500 hover:bg-clip-text hover:text-transparent transition-all duration-300">
                    🚀 About Me
                  </h3>
                  <p className="text-gray-300 mb-4 text-balance">
                    I'm currently pursuing my <strong>B.Tech in Electronics and Communication Engineering</strong>, and
                    every day feels like an adventure into the world of technology. What started as simple
                    curiosity—tinkering with circuits and writing "Hello World" programs—has slowly grown into a passion
                    for building things that connect hardware and software into something meaningful.
                  </p>
                  <p className="text-gray-300 mb-4 text-balance">
                    Along the way, I've picked up different tools and languages to bring my ideas to life. On the
                    <strong> programming side</strong>, I work with{" "}
                    <strong>C, Python, MATLAB, and a bit of Java</strong>, while in the <strong>hardware world</strong>,
                    I've spent plenty of time experimenting with <strong>Arduino and related boards</strong>—turning raw
                    components into working prototypes.
                  </p>
                  <p className="text-gray-300 mb-4 text-balance">
                    When it comes to <strong>software and design tools</strong>, I enjoy exploring{" "}
                    <strong>Figma for creativity</strong>, <strong>Proteus and Xilinx for simulations</strong>,{" "}
                    <strong>FreeCAD for design</strong>, and <strong>Git for collaboration and version control</strong>.
                    Each tool feels like a different piece of the puzzle that helps me turn imagination into innovation.
                  </p>
                  <p className="text-gray-300 mb-6 text-balance">
                    At the heart of it all, I see myself as a <strong>builder, explorer, and lifelong learner</strong>
                    —someone who's always excited to transform ideas into real-world applications.
                  </p>
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-300 hover:shadow-lg hover:shadow-green-400/25 bg-transparent"
                      disabled
                    >
                      Resume Coming Soon
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Skills section */}
      <section id="skills" className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl md:text-5xl mb-4 text-balance bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
              Skills & Expertise
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto text-balance">
              A comprehensive overview of my technical skills and areas of expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skillGroup, index) => {
              const gradients = [
                "from-purple-500 to-pink-500",
                "from-blue-500 to-cyan-500",
                "from-green-500 to-teal-500",
              ]
              const icons = ["💻", "🔧", "🎨"]

              return (
                <Card
                  key={skillGroup.category}
                  className="group bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border-2 border-gray-700 hover:border-gray-500 transition-all duration-500 relative overflow-hidden"
                >
                  {/* Floating background effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${gradients[index]} opacity-5 group-hover:opacity-15 transition-opacity duration-500`}
                  ></div>

                  <CardContent className="relative p-6">
                    {/* Floating icon with animation */}
                    <div className="text-center mb-6">
                      <div
                        className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-r ${gradients[index]} rounded-full flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg`}
                      >
                        <span className="text-3xl animate-bounce">{icons[index]}</span>
                      </div>
                      <h3
                        className={`font-heading font-semibold text-xl bg-gradient-to-r ${gradients[index]} bg-clip-text text-transparent`}
                      >
                        {skillGroup.category}
                      </h3>
                    </div>

                    {/* Animated skill items with progress bars */}
                    <div className="space-y-4">
                      {skillGroup.items.map((skill, skillIndex) => (
                        <div key={skill} className="group/skill">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-white text-sm font-medium">{skill}</span>
                            <span className="text-gray-400 text-xs">{85 + skillIndex * 3}%</span>
                          </div>

                          {/* Animated progress bar */}
                          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r ${gradients[index]} rounded-full transform origin-left transition-all duration-1000 delay-${skillIndex * 200} group-hover:scale-x-100 scale-x-0 group-hover:animate-pulse`}
                              style={{
                                width: `${85 + skillIndex * 3}%`,
                                animationDelay: `${skillIndex * 0.2}s`,
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Floating particles effect */}
                    <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                      <div className={`w-2 h-2 bg-gradient-to-r ${gradients[index]} rounded-full animate-ping`}></div>
                    </div>
                    <div className="absolute bottom-4 left-4 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
                      <div className={`w-1 h-1 bg-gradient-to-r ${gradients[index]} rounded-full animate-pulse`}></div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl md:text-5xl mb-4 text-balance text-white hover:bg-gradient-to-r hover:from-cyan-400 hover:to-green-500 hover:bg-clip-text hover:text-transparent transition-all duration-300">
              My Projects
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto text-balance">
              Explore my portfolio of innovative projects that showcase my technical expertise and problem-solving
              skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => {
              const projectGradients = [
                {
                  bg: "from-purple-900/40 to-pink-900/40",
                  border: "from-purple-400 to-pink-400",
                  shadow: "purple-500/20",
                },
                { bg: "from-blue-900/40 to-cyan-900/40", border: "from-blue-400 to-cyan-400", shadow: "cyan-500/20" },
                {
                  bg: "from-green-900/40 to-teal-900/40",
                  border: "from-green-400 to-teal-400",
                  shadow: "green-500/20",
                },
                {
                  bg: "from-orange-900/40 to-yellow-900/40",
                  border: "from-orange-400 to-yellow-400",
                  shadow: "orange-500/20",
                },
              ]
              const gradient = projectGradients[index % projectGradients.length]

              return (
                <Card
                  key={project.title}
                  className={`group hover:scale-105 transition-all duration-300 bg-gradient-to-br ${gradient.bg} backdrop-blur-sm border-2 border-transparent hover:shadow-2xl relative overflow-hidden`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${gradient.border} opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300`}
                  ></div>
                  <CardContent className="relative p-6">
                    <h3
                      className={`font-heading font-semibold text-xl mb-3 text-balance text-white hover:bg-gradient-to-r hover:${gradient.border} hover:bg-clip-text hover:text-transparent transition-all duration-300`}
                    >
                      {project.title}
                    </h3>
                    <p className="text-gray-300 mb-4 text-balance">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, techIndex) => {
                        const techColors = [
                          "bg-purple-600/80 text-white border-purple-400/50",
                          "bg-blue-600/80 text-white border-blue-400/50",
                          "bg-green-600/80 text-white border-green-400/50",
                          "bg-orange-600/80 text-white border-orange-400/50",
                          "bg-pink-600/80 text-white border-pink-400/50",
                        ]
                        return (
                          <span
                            key={tech}
                            className={`px-3 py-1 text-xs font-medium rounded-full border ${techColors[techIndex % techColors.length]} hover:scale-110 transition-transform duration-200`}
                          >
                            {tech}
                          </span>
                        )
                      })}
                    </div>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className={`border-2 border-gray-600 text-gray-300 hover:bg-gradient-to-r hover:${gradient.border} hover:text-black hover:border-transparent transition-all duration-300`}
                        asChild
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github size={16} className="mr-2" />
                          Code
                        </a>
                      </Button>
                      {project.demo && (
                        <Button
                          variant="outline"
                          size="sm"
                          className={`border-2 border-gray-600 text-gray-300 hover:bg-gradient-to-r hover:${gradient.border} hover:text-black hover:border-transparent transition-all duration-300`}
                          asChild
                        >
                          <a href={project.demo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink size={16} className="mr-2" />
                            Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl md:text-5xl mb-4 text-balance text-white hover:bg-gradient-to-r hover:from-orange-400 hover:to-red-500 hover:bg-clip-text hover:text-transparent transition-all duration-300">
              Blog
            </h2>
            <p className="text-lg text-gray-300 text-balance">
              Insights, tutorials, and thoughts on electronics, programming, and technology.
            </p>
          </div>

          <Card className="bg-gradient-to-br from-orange-900/40 via-red-900/40 to-pink-900/40 backdrop-blur-sm border-2 border-transparent relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
            <CardContent className="relative p-12 text-center">
              <div className="mb-6">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center">
                  <span className="text-3xl">📝</span>
                </div>
              </div>
              <h3 className="font-heading font-semibold text-3xl mb-4 text-white">Coming Soon</h3>
              <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto text-balance">
                I'm working on creating engaging content about my projects, learning experiences, and insights into the
                world of electronics and programming. Stay tuned for exciting articles and tutorials!
              </p>
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-black transition-all duration-300 hover:shadow-lg hover:shadow-orange-400/25 bg-transparent"
                  disabled
                >
                  Blog Posts Coming Soon
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact section */}
      <section id="contact" className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl md:text-5xl mb-4 text-balance text-white hover:bg-gradient-to-r hover:from-yellow-400 hover:to-red-500 hover:bg-clip-text hover:text-transparent transition-all duration-300">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-300 text-balance">
              Let's connect and discuss opportunities, collaborations, or just have a chat about technology!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card className="bg-gradient-to-br from-indigo-900/40 via-purple-900/40 to-pink-900/40 backdrop-blur-sm border-2 border-transparent relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-10"></div>
              <CardContent className="relative p-8">
                <h3 className="font-heading font-semibold text-2xl mb-6 text-white">Send a Message</h3>
                <form action="https://formsubmit.co/suryagnikroy02@gmail.com" method="POST" className="space-y-4">
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_next" value={typeof window !== "undefined" ? window.location.href : ""} />

                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <div>
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      rows={5}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                    ></textarea>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white border-0 shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="bg-gradient-to-br from-gray-900/40 via-blue-900/40 to-teal-900/40 backdrop-blur-sm border-2 border-transparent relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-500 via-blue-500 to-teal-500 opacity-10"></div>
              <CardContent className="relative p-8">
                <h3 className="font-heading font-semibold text-2xl mb-6 text-white">Connect With Me</h3>
                <p className="text-gray-300 mb-8 text-balance">
                  I'm always open to discussing new opportunities, interesting projects, or potential collaborations.
                  Let's connect!
                </p>

                <div className="space-y-4">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/25 bg-transparent justify-start"
                    asChild
                  >
                    <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin size={20} className="mr-3" />
                      Connect on LinkedIn
                    </a>
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-300 hover:shadow-lg hover:shadow-green-400/25 bg-transparent justify-start"
                    asChild
                  >
                    <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
                      <Github size={20} className="mr-3" />
                      View GitHub Profile
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-4 border-t border-gray-700 bg-gradient-to-r from-gray-900/80 via-purple-900/20 to-blue-900/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="font-heading font-bold text-xl text-white hover:bg-gradient-to-r hover:from-cyan-400 hover:to-purple-400 hover:bg-clip-text hover:text-transparent transition-all duration-300 mb-2">
                {personalInfo.name}
              </h3>
              <p className="text-sm text-gray-400">© 2024 Suryagnik Roy. All Rights Reserved.</p>
            </div>

            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="hover:text-purple-400 text-gray-400 transition-colors"
                asChild
              >
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
                  <Github size={20} />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
              <Button variant="ghost" size="sm" className="hover:text-blue-400 text-gray-400 transition-colors" asChild>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin size={20} />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="hover:text-green-400 text-gray-400 transition-colors"
                asChild
              >
                <a href={`mailto:suryagnikroy02@gmail.com`}>
                  <Mail size={20} />
                  <span className="sr-only">Email</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

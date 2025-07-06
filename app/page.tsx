"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Terminal, Github, Linkedin, Mail, X } from "lucide-react"

interface TerminalLine {
  type: "command" | "output" | "error" | "system" | "portrait" | "contact"
  content: string
  timestamp?: string
}

const ASCII_LOGO = `
 ██████╗ ██╗███████╗ ██████╗  ██████╗      ██████╗ ██████╗ ██████╗ ██████╗ ███████╗██╗██████╗  ██████╗ 
 ██╔══██╗██║██╔════╝██╔════╝ ██╔═══██╗    ██╔════╝██╔═══██╗██╔══██╗██╔══██╗██╔════╝██║██╔══██╗██╔═══██╗
 ██║  ██║██║█████╗  ██║  ███╗██║   ██║    ██║     ██║   ██║██████╔╝██║  ██║█████╗  ██║██████╔╝██║   ██║
 ██║  ██║██║██╔══╝  ██║   ██║██║   ██║    ██║     ██║   ██║██╔══██╗██║  ██║██╔══╝  ██║██╔══██╗██║   ██║
 ██████╔╝██║███████╗╚██████╔╝╚██████╔╝    ╚██████╗╚██████╔╝██║  ██║██████╔╝███████╗██║██║  ██║╚██████╔╝
 ╚═════╝ ╚═╝╚══════╝ ╚═════╝  ╚═════╝      ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚══════╝╚═╝╚═╝  ╚═╝ ╚═════╝ 
                                    FULL STACK DEVELOPER
`

const COMMANDS = {
  help: "Show available commands",
  about: "Display information about me",
  skills: "List technical skills and technologies",
  projects: "Show my development projects",
  experience: "Display work experience",
  contact: "Open secure contact form",
  portrait: "Display profile portrait",
  clear: "Clear the terminal",
  whoami: "Display current user info",
  ls: "List available sections",
  cat: "Display file contents (usage: cat <section>)",
  sudo: "Execute with elevated privileges",
  exit: "Close terminal session",
}

const SKILLS = {
  Frontend: ["HTML5", "CSS3", "JavaScript", "React", "Sass", "Responsive Design"],
  Backend: ["Node.js", "Python", "Express.js", "REST APIs", "SQL"],
  "Tools & Others": ["Git", "GitHub", "VS Code", "Figma", "MongoDB"],
}

const PROJECTS = [
  {
    name: "E-Commerce Platform",
    tech: ["React", "Node.js", "MongoDB"],
    description: "Full-stack e-commerce solution with user authentication, payment processing, and admin dashboard",
    status: "Production",
    url: "#",
  },
  {
    name: "Task Management App",
    tech: ["React", "Socket.io", "Express"],
    description:
      "Collaborative task management tool with real-time updates, drag-and-drop functionality, and team collaboration features",
    status: "Live",
    url: "#",
  },
  {
    name: "Weather Dashboard",
    tech: ["JavaScript", "API Integration", "Chart.js"],
    description:
      "Interactive weather application with location-based forecasts, data visualization, and responsive design",
    status: "Live",
    url: "#",
  },
]

// Contact Form Component
function ContactForm({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setFormData({ name: "", email: "", subject: "", message: "" })
        onClose()
      }, 2000)
    }, 1500)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <Card className="bg-gray-900 border-green-500/30 p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-green-400 font-bold text-lg">Secure Contact Form</h3>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-green-400 hover:text-green-300">
            <X className="w-4 h-4" />
          </Button>
        </div>

        {submitted ? (
          <div className="text-center py-8">
            <div className="text-green-400 text-lg mb-2">✓ Message Sent Successfully!</div>
            <div className="text-green-300 text-sm">Thank you for reaching out. I'll get back to you soon.</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-black border-green-500/30 text-green-400 placeholder:text-green-600"
              />
            </div>
            <div>
              <Input
                name="email"
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-black border-green-500/30 text-green-400 placeholder:text-green-600"
              />
            </div>
            <div>
              <Input
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="bg-black border-green-500/30 text-green-400 placeholder:text-green-600"
              />
            </div>
            <div>
              <Textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="bg-black border-green-500/30 text-green-400 placeholder:text-green-600 resize-none"
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 hover:bg-green-700 text-black font-semibold"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        )}
      </Card>
    </div>
  )
}

// Portrait component with glitch effect
function PortraitCard({ isLoading }: { isLoading: boolean }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [glitchPhase, setGlitchPhase] = useState(0)

  useEffect(() => {
    if (!isLoading) return

    // Simulate loading phases with glitch effect
    const phases = [
      "Loading portrait...",
      "█░░░░░░░░░░ 10%",
      "██░░░░░░░░░ 20%",
      "███░░░░░░░░ 30%",
      "████░░░░░░░ 40%",
      "█████░░░░░░ 50%",
      "██████░░░░░ 60%",
      "███████░░░░ 70%",
      "████████░░░ 80%",
      "█████████░░ 90%",
      "██████████ 100%",
    ]

    let currentPhase = 0
    const interval = setInterval(() => {
      setGlitchPhase(currentPhase)
      currentPhase++

      if (currentPhase >= phases.length) {
        clearInterval(interval)
        setTimeout(() => setImageLoaded(true), 500)
      }
    }, 200)

    return () => clearInterval(interval)
  }, [isLoading])

  if (!isLoading) return null

  const phases = [
    "Loading portrait...",
    "█░░░░░░░░░░ 10%",
    "██░░░░░░░░░ 20%",
    "███░░░░░░░░ 30%",
    "████░░░░░░░ 40%",
    "█████░░░░░░ 50%",
    "██████░░░░░ 60%",
    "███████░░░░ 70%",
    "████████░░░ 80%",
    "█████████░░ 90%",
    "██████████ 100%",
  ]

  return (
    <div className="my-4">
      {!imageLoaded ? (
        <div className="text-yellow-400 animate-pulse">{phases[glitchPhase] || phases[phases.length - 1]}</div>
      ) : (
        <Card className="bg-gray-900/50 border-green-500/30 p-6 max-w-md animate-in fade-in duration-1000">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Image
                src="/profile.png"
                alt="Diego Cordeiro - Full Stack Developer"
                width={120}
                height={120}
                className="rounded-full border-2 border-green-500 glitch-image"
                style={{
                  filter: "contrast(1.1) brightness(1.1)",
                }}
              />
              {/* Glitch overlay effect */}
              <div className="absolute inset-0 rounded-full border-2 border-cyan-400 opacity-20 animate-pulse"></div>
            </div>
            <div>
              <h3 className="text-green-400 font-bold text-lg">Diego Cordeiro</h3>
              <p className="text-green-300 text-sm mb-2">Full-Stack Developer</p>
              <p className="text-green-200 text-xs mb-3">"Ship dreams, debug nightmares!"</p>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline" className="border-green-500 text-green-400 text-xs">
                  React
                </Badge>
                <Badge variant="outline" className="border-green-500 text-green-400 text-xs">
                  Node.js
                </Badge>
                <Badge variant="outline" className="border-green-500 text-green-400 text-xs">
                  Python
                </Badge>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}

export default function TerminalPortfolio() {
  const [lines, setLines] = useState<TerminalLine[]>([])
  const [currentInput, setCurrentInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const [showPortrait, setShowPortrait] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Enhanced boot sequence with realistic terminal commands
    const bootSequence = [
      { type: "system" as const, content: "BIOS v2.1.0 - Diego Cordeiro Portfolio System", delay: 300 },
      { type: "system" as const, content: "Checking system integrity...", delay: 400 },
      { type: "output" as const, content: "✓ Memory test passed", delay: 200 },
      { type: "output" as const, content: "✓ CPU initialization complete", delay: 300 },
      { type: "output" as const, content: "✓ Network interface ready", delay: 250 },
      { type: "system" as const, content: "", delay: 100 },
      { type: "command" as const, content: "$ sudo systemctl start portfolio.service", delay: 600 },
      { type: "output" as const, content: "Starting Diego's Portfolio Service...", delay: 400 },
      { type: "output" as const, content: "[████████████████████] 100%", delay: 800 },
      { type: "system" as const, content: "✓ Service started successfully", delay: 300 },
      { type: "system" as const, content: "", delay: 100 },
      { type: "command" as const, content: "$ npm run dev", delay: 500 },
      { type: "output" as const, content: "Loading React components...", delay: 400 },
      { type: "output" as const, content: "Compiling TypeScript...", delay: 500 },
      { type: "output" as const, content: "Bundling assets...", delay: 400 },
      { type: "system" as const, content: "✓ Development server ready", delay: 300 },
      { type: "system" as const, content: "", delay: 100 },
      { type: "command" as const, content: "$ git log --oneline -3", delay: 400 },
      { type: "output" as const, content: "a7f3c21 feat: add terminal interface", delay: 200 },
      { type: "output" as const, content: "b8e4d32 style: implement matrix theme", delay: 200 },
      { type: "output" as const, content: "c9f5e43 init: portfolio foundation", delay: 200 },
      { type: "system" as const, content: "", delay: 200 },
      { type: "command" as const, content: "$ whoami", delay: 300 },
      { type: "output" as const, content: "diego-cordeiro", delay: 200 },
      { type: "system" as const, content: "", delay: 200 },
      { type: "command" as const, content: "$ echo 'Welcome to the matrix...'", delay: 500 },
      { type: "output" as const, content: "Welcome to the matrix...", delay: 400 },
      { type: "system" as const, content: "", delay: 300 },
      { type: "output" as const, content: ASCII_LOGO, delay: 800 },
      {
        type: "system" as const,
        content: 'Type "help" to see available commands or "about" to learn more about me.',
        delay: 400,
      },
      { type: "output" as const, content: "", delay: 100 },
    ]

    let index = 0
    let totalDelay = 0

    const executeBootSequence = () => {
      if (index < bootSequence.length) {
        const currentItem = bootSequence[index]

        setTimeout(() => {
          setLines((prev) => [
            ...prev,
            {
              type: currentItem.type,
              content: currentItem.content,
              timestamp: new Date().toLocaleTimeString(),
            },
          ])

          index++
          executeBootSequence()
        }, totalDelay)

        totalDelay = currentItem.delay || 300
      } else {
        // Boot sequence complete
        setTimeout(() => {
          setIsLoading(false)
        }, 500)
      }
    }

    executeBootSequence()
  }, [])

  useEffect(() => {
    // Cursor blinking effect
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    // Auto-scroll to bottom
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [lines])

  useEffect(() => {
    // Keep input focused when not loading
    if (isLoading) return

    const focusInput = () => {
      if (inputRef.current && !isTyping) {
        inputRef.current.focus()
      }
    }

    const interval = setInterval(focusInput, 100)
    return () => clearInterval(interval)
  }, [isTyping, isLoading])

  const addLine = (type: TerminalLine["type"], content: string) => {
    setLines((prev) => [
      ...prev,
      {
        type,
        content,
        timestamp: new Date().toLocaleTimeString(),
      },
    ])
  }

  const executeCommand = (command: string) => {
    const cmd = command.toLowerCase().trim()

    // Clear previous output and show header + current command
    const headerSequence = [
      { type: "system" as const, content: "BIOS v2.1.0 - Diego Cordeiro Portfolio System" },
      { type: "system" as const, content: "System ready. Welcome to the matrix." },
      { type: "output" as const, content: ASCII_LOGO },
      { type: "system" as const, content: 'Type "help" to see available commands or "about" to learn more about me.' },
      { type: "output" as const, content: "" },
      { type: "command" as const, content: `$ ${command}`, timestamp: new Date().toLocaleTimeString() },
    ]

    setLines(headerSequence)
    setShowPortrait(false) // Reset portrait state

    switch (cmd) {
      case "help":
        addLine("output", "Available commands:")
        Object.entries(COMMANDS).forEach(([cmd, desc]) => {
          addLine("output", `  ${cmd.padEnd(12)} - ${desc}`)
        })
        break

      case "portrait":
        addLine("output", "Accessing secure image database...")
        addLine("output", "Decrypting visual data...")
        addLine("portrait", "PORTRAIT_LOADING")
        setShowPortrait(true)
        break

      case "contact":
        addLine("output", "Initializing secure contact protocol...")
        addLine("output", "Establishing encrypted connection...")
        addLine("output", "✓ Contact form ready")
        addLine("contact", "CONTACT_FORM")
        setTimeout(() => setShowContactForm(true), 1000)
        break

      case "about":
        addLine("output", "=== ABOUT DIEGO CORDEIRO ===")
        addLine("output", "")
        addLine("output", "Name: Diego Cordeiro")
        addLine("output", "Role: Full Stack Developer")
        addLine("output", "Status: Currently mastering my craft through Codecademy's program")
        addLine("output", "Motto: 'Ship dreams, debug nightmares!'")
        addLine("output", "")
        addLine("output", "Hi, I'm Diego—a passionate full stack developer with hands-on")
        addLine("output", "experience in web development and a knack for problem-solving.")
        addLine("output", "I specialize in creating robust, user-friendly applications that")
        addLine("output", "make a difference.")
        addLine("output", "")
        addLine("output", "My journey in software development is driven by curiosity and")
        addLine("output", "a commitment to continuous learning. I enjoy tackling complex")
        addLine("output", "challenges and transforming ideas into elegant, functional solutions.")
        addLine("output", "")
        addLine("output", "📊 STATS:")
        addLine("output", "   • 15+ Projects Completed")
        addLine("output", "   • 3+ Years Learning")
        addLine("output", "   • 100% Commitment")
        break

      case "skills":
        addLine("output", "=== TECHNICAL SKILLS ===")
        addLine("output", "")
        Object.entries(SKILLS).forEach(([category, skills]) => {
          addLine("output", `${category}:`)
          addLine("output", `  ${skills.join(" • ")}`)
          addLine("output", "")
        })
        break

      case "projects":
        addLine("output", "=== FEATURED PROJECTS ===")
        addLine("output", "")
        PROJECTS.forEach((project, index) => {
          addLine("output", `${index + 1}. ${project.name} [${project.status}]`)
          addLine("output", `   Tech Stack: ${project.tech.join(", ")}`)
          addLine("output", `   Description: ${project.description}`)
          addLine("output", "")
        })
        break

      case "experience":
        addLine("output", "=== EXPERIENCE & EDUCATION ===")
        addLine("output", "")
        addLine("output", "🎓 Full-Stack Developer Course - Codecademy (In Progress)")
        addLine("output", "   • Comprehensive web development curriculum")
        addLine("output", "   • Frontend & Backend technologies")
        addLine("output", "   • Database design and management")
        addLine("output", "")
        addLine("output", "💻 Self-Taught Developer (3+ Years)")
        addLine("output", "   • Built 15+ web applications and projects")
        addLine("output", "   • Experienced with modern frameworks and tools")
        addLine("output", "   • Passionate about creating seamless web experiences")
        addLine("output", "   • Continuous learning and skill development")
        break

      case "whoami":
        addLine("output", "guest@diego-portfolio:~$ You are currently viewing the portfolio of")
        addLine("output", "Diego Cordeiro - a passionate full-stack developer who ships")
        addLine("output", "dreams and debugs nightmares!")
        break

      case "ls":
        addLine("output", "about.txt  skills.json  projects/  experience.md  contact.form  portrait.jpg")
        break

      case "clear":
        // Keep the initial boot sequence with header
        const clearHeaderSequence = [
          { type: "system" as const, content: "BIOS v2.1.0 - Diego Cordeiro Portfolio System" },
          { type: "system" as const, content: "System ready. Welcome to the matrix." },
          { type: "output" as const, content: ASCII_LOGO },
          {
            type: "system" as const,
            content: 'Type "help" to see available commands or "about" to learn more about me.',
          },
          { type: "output" as const, content: "" },
        ]
        setLines(clearHeaderSequence)
        break

      case "exit":
        addLine("system", "Thanks for visiting! Connection terminated.")
        setTimeout(() => {
          addLine("system", "Just kidding! You can't escape that easily 😄")
        }, 2000)
        break

      default:
        if (cmd.startsWith("cat ")) {
          const file = cmd.substring(4)
          switch (file) {
            case "about.txt":
              executeCommand("about")
              break
            case "skills.json":
              executeCommand("skills")
              break
            case "portrait.jpg":
              executeCommand("portrait")
              break
            case "contact.form":
              executeCommand("contact")
              break
            default:
              addLine("error", `cat: ${file}: No such file or directory`)
          }
        } else if (cmd.startsWith("sudo ")) {
          addLine("output", "[sudo] password for guest: ")
          setTimeout(() => {
            addLine("error", "Sorry, user guest is not in the sudoers file.")
            addLine("error", "This incident will be reported. 🚨")
          }, 1000)
        } else {
          addLine("error", `Command not found: ${command}`)
          addLine("output", 'Type "help" to see available commands.')
        }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentInput.trim() && !isTyping && !isLoading) {
      executeCommand(currentInput)
      setCurrentInput("")
    }
  }

  const handleInputClick = () => {
    if (inputRef.current && !isLoading) {
      inputRef.current.focus()
    }
  }

  const handleSocialClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono overflow-hidden">
      {/* Matrix-style background effect */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 to-transparent"></div>
      </div>

      {/* Terminal Header */}
      <div className="sticky top-0 z-10 bg-gray-900 border-b border-green-500/30 px-4 py-2 flex items-center gap-2">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex items-center gap-2 ml-4">
          <Terminal className="w-4 h-4" />
          <span className="text-sm">diego-portfolio@terminal:~</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-green-400 hover:text-green-300"
            onClick={() => handleSocialClick("https://github.com/diegojc79")}
          >
            <Github className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-green-400 hover:text-green-300"
            onClick={() => handleSocialClick("https://www.linkedin.com/in/diegojc79")}
          >
            <Linkedin className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-green-400 hover:text-green-300"
            onClick={() => setShowContactForm(true)}
          >
            <Mail className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Terminal Content */}
      <div ref={terminalRef} className="h-[calc(100vh-60px)] overflow-y-auto p-4 space-y-1" onClick={handleInputClick}>
        {lines
          .filter((ln): ln is TerminalLine => ln !== undefined && ln !== null)
          .map((line, index) => (
            <div key={index}>
              <div
                className={`
              ${line.type === "command" ? "text-cyan-400" : ""}
              ${line.type === "error" ? "text-red-400" : ""}
              ${line.type === "system" ? "text-yellow-400" : ""}
              ${line.type === "output" ? "text-green-400" : ""}
              whitespace-pre-wrap break-words
            `}
              >
                {line.type === "portrait" || line.type === "contact" ? null : line.content}
              </div>
              {line.type === "portrait" && <PortraitCard isLoading={showPortrait} />}
            </div>
          ))}

        {/* Input Line - Only show when not loading */}
        {!isLoading && (
          <form onSubmit={handleSubmit} className="flex items-center">
            <span className="text-cyan-400 mr-2">guest@diego-portfolio:~$</span>
            <Input
              ref={inputRef}
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              className="bg-transparent border-none text-green-400 font-mono p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 outline-none"
              placeholder=""
              autoFocus
            />
            <span className={`ml-1 ${showCursor ? "opacity-100" : "opacity-0"}`}>█</span>
          </form>
        )}
      </div>

      {/* Contact Form Modal */}
      <ContactForm isOpen={showContactForm} onClose={() => setShowContactForm(false)} />
    </div>
  )
}

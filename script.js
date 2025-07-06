// Terminal Portfolio JavaScript

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
  },
  {
    name: "Task Management App",
    tech: ["React", "Socket.io", "Express"],
    description:
      "Collaborative task management tool with real-time updates, drag-and-drop functionality, and team collaboration features",
    status: "Live",
  },
  {
    name: "Weather Dashboard",
    tech: ["JavaScript", "API Integration", "Chart.js"],
    description:
      "Interactive weather application with location-based forecasts, data visualization, and responsive design",
    status: "Live",
  },
]

let isLoading = true
const currentInput = ""
const commandHistory = []
let historyIndex = -1

// Initialize terminal
document.addEventListener("DOMContentLoaded", () => {
  startBootSequence()
  setupEventListeners()
})

function setupEventListeners() {
  const input = document.getElementById("commandInput")

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (!isLoading && input.value.trim()) {
        executeCommand(input.value.trim())
        commandHistory.unshift(input.value.trim())
        historyIndex = -1
        input.value = ""
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++
        input.value = commandHistory[historyIndex]
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        historyIndex--
        input.value = commandHistory[historyIndex]
      } else if (historyIndex === 0) {
        historyIndex = -1
        input.value = ""
      }
    }
  })

  // Contact form submission
  document.getElementById("contactForm").addEventListener("submit", (e) => {
    e.preventDefault()
    submitContactForm()
  })
}

function startBootSequence() {
  const bootSequence = [
    { type: "system", content: "BIOS v2.1.0 - Diego Cordeiro Portfolio System", delay: 300 },
    { type: "system", content: "Checking system integrity...", delay: 400 },
    { type: "output", content: "✓ Memory test passed", delay: 200 },
    { type: "output", content: "✓ CPU initialization complete", delay: 300 },
    { type: "output", content: "✓ Network interface ready", delay: 250 },
    { type: "system", content: "", delay: 100 },
    { type: "command", content: "$ sudo systemctl start portfolio.service", delay: 600 },
    { type: "output", content: "Starting Diego's Portfolio Service...", delay: 400 },
    { type: "output", content: "[████████████████████] 100%", delay: 800 },
    { type: "system", content: "✓ Service started successfully", delay: 300 },
    { type: "system", content: "", delay: 100 },
    { type: "command", content: "$ npm run dev", delay: 500 },
    { type: "output", content: "Loading React components...", delay: 400 },
    { type: "output", content: "Compiling TypeScript...", delay: 500 },
    { type: "output", content: "Bundling assets...", delay: 400 },
    { type: "system", content: "✓ Development server ready", delay: 300 },
    { type: "system", content: "", delay: 100 },
    { type: "command", content: "$ git log --oneline -3", delay: 400 },
    { type: "output", content: "a7f3c21 feat: add terminal interface", delay: 200 },
    { type: "output", content: "b8e4d32 style: implement matrix theme", delay: 200 },
    { type: "output", content: "c9f5e43 init: portfolio foundation", delay: 200 },
    { type: "system", content: "", delay: 200 },
    { type: "command", content: "$ whoami", delay: 300 },
    { type: "output", content: "diego-cordeiro", delay: 200 },
    { type: "system", content: "", delay: 200 },
    { type: "command", content: "$ echo 'Welcome to the matrix...'", delay: 500 },
    { type: "output", content: "Welcome to the matrix...", delay: 400 },
    { type: "system", content: "", delay: 300 },
    { type: "output", content: ASCII_LOGO, delay: 800 },
    { type: "system", content: 'Type "help" to see available commands or "about" to learn more about me.', delay: 400 },
    { type: "output", content: "", delay: 100 },
  ]

  let index = 0

  function executeBootStep() {
    if (index < bootSequence.length) {
      const step = bootSequence[index]
      setTimeout(() => {
        addLine(step.type, step.content)
        index++
        executeBootStep()
      }, step.delay)
    } else {
      setTimeout(() => {
        isLoading = false
        document.getElementById("inputLine").style.display = "flex"
        focusInput()
      }, 500)
    }
  }

  executeBootStep()
}

function addLine(type, content) {
  const output = document.getElementById("output")
  const line = document.createElement("div")

  line.className = `whitespace-pre-wrap break-words ${getLineClass(type)}`
  line.textContent = content

  output.appendChild(line)
  scrollToBottom()
}

function getLineClass(type) {
  switch (type) {
    case "command":
      return "text-cyan-400"
    case "error":
      return "text-red-400"
    case "system":
      return "text-yellow-400"
    case "output":
      return "text-green-400"
    default:
      return "text-green-400"
  }
}

function executeCommand(command) {
  const cmd = command.toLowerCase().trim()

  // Clear and show header
  clearTerminal()
  addLine("command", `$ ${command}`)

  switch (cmd) {
    case "help":
      addLine("output", "Available commands:")
      Object.entries(COMMANDS).forEach(([cmd, desc]) => {
        addLine("output", `  ${cmd.padEnd(12)} - ${desc}`)
      })
      break

    case "about":
      addLine("output", "=== ABOUT DIEGO CORDEIRO ===")
      addLine("output", "")
      addLine("output", "Name: Diego Cordeiro")
      addLine("output", "Role: Full Stack Developer")
      addLine("output", "Status: Currently mastering my craft through Codecademy's program")
      addLine("output", 'Motto: "Ship dreams, debug nightmares!"')
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

    case "contact":
      addLine("output", "Initializing secure contact protocol...")
      addLine("output", "Establishing encrypted connection...")
      addLine("output", "✓ Contact form ready")
      setTimeout(() => openContactForm(), 1000)
      break

    case "portrait":
      addLine("output", "Accessing secure image database...")
      addLine("output", "Decrypting visual data...")
      showPortrait()
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
      clearTerminal()
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

function clearTerminal() {
  const output = document.getElementById("output")
  output.innerHTML = ""

  // Add header
  addLine("system", "BIOS v2.1.0 - Diego Cordeiro Portfolio System")
  addLine("system", "System ready. Welcome to the matrix.")
  addLine("output", ASCII_LOGO)
  addLine("system", 'Type "help" to see available commands or "about" to learn more about me.')
  addLine("output", "")
}

function showPortrait() {
  const output = document.getElementById("output")
  const portraitDiv = document.createElement("div")
  portraitDiv.innerHTML = document.getElementById("portraitModal").innerHTML

  const loadingEl = portraitDiv.querySelector("#portraitLoading")
  const cardEl = portraitDiv.querySelector("#portraitCard")

  output.appendChild(portraitDiv)

  // Simulate loading
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

  let phase = 0
  const interval = setInterval(() => {
    if (phase < phases.length) {
      loadingEl.textContent = phases[phase]
      phase++
    } else {
      clearInterval(interval)
      setTimeout(() => {
        loadingEl.style.display = "none"
        cardEl.style.display = "block"
      }, 500)
    }
  }, 200)

  scrollToBottom()
}

function openContactForm() {
  document.getElementById("contactModal").style.display = "flex"
}

function closeContactForm() {
  document.getElementById("contactModal").style.display = "none"
}

function submitContactForm() {
  const form = document.getElementById("contactForm")
  const content = document.getElementById("contactContent")

  content.innerHTML = `
        <div class="text-center py-8">
            <div class="text-green-400 text-lg mb-2">Sending...</div>
        </div>
    `

  setTimeout(() => {
    content.innerHTML = `
            <div class="text-center py-8">
                <div class="text-green-400 text-lg mb-2">✓ Message Sent Successfully!</div>
                <div class="text-green-300 text-sm">Thank you for reaching out. I'll get back to you soon.</div>
            </div>
        `

    setTimeout(() => {
      closeContactForm()
      // Reset form
      form.reset()
      content.innerHTML = document.querySelector("#contactModal .bg-gray-900").innerHTML
    }, 2000)
  }, 1500)
}

function openLink(url) {
  window.open(url, "_blank", "noopener,noreferrer")
}

function focusInput() {
  if (!isLoading) {
    document.getElementById("commandInput").focus()
  }
}

function scrollToBottom() {
  const terminal = document.getElementById("terminal")
  terminal.scrollTop = terminal.scrollHeight
}

// Keep input focused
document.addEventListener("click", focusInput)

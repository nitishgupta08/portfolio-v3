import type { Project } from "@/types/Project";

export const fallbackProjectsData: Project[] = [
  {
    id: "1",
    title: "CodeCollab",
    slug: "codecollab",
    liveLink: "https://nkg-cc.netlify.app/",
    githubLink: "https://github.com/nitishgupta08/CodeCollab",
    imgSrc: "/codecollab.jpg",
    date: "March 2023 - April 2023",
    description:
      "An online code editor that allows users to work together on coding projects in a shared space. Implemented several APIs that perform CRUD operations on users and the spaces they own. Users can choose variety of languages and themes.",
    tags: ["ReactJS", "NodeJS", "MongoDB", "Socket.io", "MUI", "Codemirror"],
    isFeatured: true,
    isVisible: true,
  },
  {
    id: "2",
    title: "algotradersonline",
    slug: "algotradersonline",
    liveLink: null,
    githubLink: "https://github.com/nitishgupta08/algotradersonline",
    imgSrc: "/algotraders.png",
    date: "Jan 2022 - Sept 2022",
    description:
      "Implemented a wide range of account management, paper trading, and options chain features, as well as a homepage, login/registration screen, dashboard, and options chain. Wrote several APIs to retrieve data from MySQL after processing it for use in strategy execution, options trading, and paper trading.",
    tags: ["ReactJS", "Django", "MySQL", "Python", "Apache"],
    isFeatured: true,
    isVisible: true,
  },
  {
    id: "3",
    title: "Sorting Visualizer",
    slug: "sorting-visualizer",
    liveLink: "https://ng-sorting-visualizer.netlify.app/",
    githubLink: "https://github.com/nitishgupta08/Sorting-Visualizer",
    imgSrc: "/sorting.png",
    date: "July 2021 - Aug 2021",
    description:
      "This website visualizes various sorting techniques like bubble sort, quick sort, insertion sort, selection sort, merge sort, shell sort and heap sort. Sorting animation speed can be changed while the array is sorted. You can generate arrays ranging from size 2 to 100 and randomize them.",
    tags: ["HTML", "CSS", "Javascript"],
    isFeatured: true,
    isVisible: true,
  },

  // Archive Projects (previously in projectsArchive)
  {
    id: "4",
    title: "ListApp",
    slug: "listapp",
    liveLink: null,
    githubLink: "https://github.com/nitishgupta08/list-app",
    date: "May 2023",
    description:
      "A simple list management application built with TypeScript for task organization and productivity.",
    tags: ["TypeScript"],
    isFeatured: false,
    isVisible: true,
  },
  {
    id: "5",
    title: "MERN Auth",
    slug: "mern-auth",
    liveLink: null,
    githubLink: "https://github.com/nitishgupta08/mern-auth",
    date: "May 2023",
    description:
      "Complete authentication system using MERN stack with JWT tokens, secure password hashing, and user session management.",
    tags: ["MERN", "Redux", "JWT", "bcryptjs", "cookie-parser"],
    isFeatured: false,
    isVisible: true,
  },
  {
    id: "6",
    title: "CodeForges",
    slug: "codeforges",
    liveLink: "https://codeforges.netlify.app/",
    githubLink: "https://github.com/nitishgupta08/CodeForges",
    date: "Jan 2023",
    description:
      "Collaborative code editor with real-time synchronization, multiple language support, and team workspace features.",
    tags: ["ReactJS", "NodeJS", "MongoDB", "MUI", "Codemirror"],
    isFeatured: false,
    isVisible: true,
  },
  {
    id: "7",
    title: "Weather App",
    slug: "weather-app",
    liveLink: "https://weather-app-dqd4.onrender.com/",
    githubLink: "https://github.com/nitishgupta08/weather-app",
    date: "Sept 2022",
    description:
      "Weather application with location-based forecasting, real-time weather updates, and responsive design.",
    tags: ["NodeJS", "Handlebars"],
    isFeatured: false,
    isVisible: true,
  },
  {
    id: "8",
    title: "MQTT Demonstration",
    slug: "mqtt-demonstration",
    liveLink: null,
    githubLink: "https://github.com/nitishgupta08/iotproject",
    date: "Mar 2022",
    description:
      "IoT project demonstrating MQTT protocol implementation with real-time message publishing and subscribing.",
    tags: ["ReactJS", "MQTT"],
    isFeatured: false,
    isVisible: true,
  },
  {
    id: "9",
    title: "Portfolio v1",
    slug: "portfolio-v1",
    liveLink: "https://v1-nitishgupta.netlify.app/",
    githubLink: "https://github.com/nitishgupta08/portfolio",
    date: "Feb 2022",
    description:
      "First version of my personal portfolio website built with React, showcasing my early web development skills.",
    tags: ["ReactJS"],
    isFeatured: false,
    isVisible: true,
  },
  {
    id: "10",
    title: "Travelling Salesman Problem",
    slug: "tsp-hill-climbing",
    liveLink: null,
    githubLink: "https://github.com/nitishgupta08/travelling-salesman-problem",
    date: "Oct 2021",
    description:
      "Implementation of the Travelling Salesman Problem using Hill Climbing algorithm with visualization and performance analysis.",
    tags: ["Python", "Hill Climbing"],
    isFeatured: false,
    isVisible: true,
  },
  {
    id: "11",
    title: "Terminal Tic-Tac-Toe",
    slug: "terminal-tictactoe",
    liveLink: null,
    githubLink:
      "https://github.com/nitishgupta08/Algorithms/blob/main/tictactoe.py",
    date: "Sept 2021",
    description:
      "Command-line tic-tac-toe game with AI opponent using minimax algorithm for intelligent gameplay.",
    tags: ["Python"],
    isFeatured: false,
    isVisible: true,
  },
  {
    id: "12",
    title: "University Management System",
    slug: "university-management-system",
    liveLink: null,
    githubLink: "https://github.com/nitishgupta08/University-Management-System",
    date: "Sept 2020",
    description:
      "Complete university management system with student registration, course management, grade tracking, and faculty modules.",
    tags: ["Java", "MySQL"],
    isFeatured: false,
    isVisible: true,
  },
  {
    id: "13",
    title: "Bank Management System",
    slug: "bank-management-system",
    liveLink: null,
    githubLink: "https://github.com/nitishgupta08/Bank-Management-System",
    date: "Aug 2020",
    description:
      "Banking system with account management, transaction processing, balance inquiry, and customer management features.",
    tags: ["Java", "MySQL"],
    isFeatured: false,
    isVisible: true,
  },
];

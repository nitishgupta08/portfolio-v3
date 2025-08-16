import type { Experience } from "@/types/Experience";

// Fallback data for development/offline mode
export const fallbackExperienceData: Experience[] = [
  {
    id: "1",
    designation: "Software Engineer",
    company: "Samsung R&D Institute Delhi",
    from: "Jan 2024",
    to: "Present",
    startDate: "2024-01-01",
    endDate: null,
    description:
      "Currently working on cutting-edge software development projects using modern programming languages and frameworks.",
    tags: ["Python", "C", "C++"],
    isVisible: true,
  },
  {
    id: "2",
    designation: "Backend Intern",
    company: "AlgoBulls",
    from: "July 2023",
    to: "December 2023",
    startDate: "2023-07-01",
    endDate: "2023-12-31",
    description:
      "I optimized multiple APIs, resulting in faster response times and improved system efficiency. I implemented new features aligned with business logic using Django and Django Rest Framework (DRF), and I wrote unit, integration, and end-to-end tests to ensure code reliability. Additionally, I developed GitHub workflows to automate our test suite, streamlining the development process and facilitating seamless integration of new features.",
    tags: ["Django", "Django REST Framework", "Python", "GitHub"],
    isVisible: true,
  },
  {
    id: "3",
    designation: "Computer Networks Teaching Assistant",
    company: "LNMIIT",
    from: "Jan 2023",
    to: "April 2023",
    startDate: "2023-01-01",
    endDate: "2023-04-30",
    description:
      "I have assisted ~80 students, and my role has been centered around supporting and guiding students through their coursework.",
    tags: ["Omnet++", "Cisco Packet Tracer"],
    isVisible: true,
  },
  {
    id: "4",
    designation: "Full Stack Developer",
    company: "LUSIP, LNMIIT",
    from: "May 2022",
    to: "July 2022",
    startDate: "2022-05-01",
    endDate: "2022-07-31",
    description:
      "Built multiple user interface elements, including a homepage, login/registration screen, dashboard, options chain and other number of features, like an account management interface, a paper trading platform and an options chain system. Wrote several APIs to retrieve data from MySQL after having it undergo some computations based on business need for use in strategy execution, options trading, and paper trading.",
    tags: ["ReactJS", "Django", "MySQL", "MUI"],
    isVisible: true,
  },
];

import Hero from "@/components/home/Hero";
import AboutMe from "@/components/home/AboutMe";
import Skills from "@/components/home/Skills";
import Experience from "@/components/home/Experience";
import Projects from "@/components/home/Projects";
import Contact from "@/components/home/Contact";
import { getExperiences, getProjects } from "@/lib/server/portfolioData";

export default async function Home() {
  const [projects, experiences] = await Promise.all([
    getProjects(),
    getExperiences(),
  ]);

  return (
    <div className="relative overflow-hidden">
      <Hero />
      <AboutMe />
      {/*<Skills />*/}
      <Experience experiences={experiences} />
      <Projects projects={projects} />
      <Contact />
    </div>
  );
}

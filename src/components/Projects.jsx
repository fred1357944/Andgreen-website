import React from "react";
import projectsData from "./projectsData"; // Import the array
import "./Projects.css"; // Add CSS for the card effect

function Projects() {
  return (
    <section id="projects">
      <h2 className="text-3xl lg:text-4xl font-futura text-center text-gray-700 mb-12">
        設計及項目
      </h2>
      <div className="card-grid">
        {projectsData.map((project, index) => (
          <div className="card" key={index}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;

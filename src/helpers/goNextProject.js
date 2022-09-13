export const goNextProject = ({
  currentProjectSlug,
  projects,
  triggerTransition,
}) => {
  const nextProject = getNextProject({ currentProjectSlug, projects });
  triggerTransition({ to: `/${nextProject.title}` });
};

export const getNextProject = ({ currentProjectSlug, projects }) => {
  const projectsLength = projects.length;
  let nextProjectIndex = 0;
  if (currentProjectSlug) {
    const currentProject = projects.filter(
      (p) => p.title === currentProjectSlug
    )[0];
    const currentProjectIndex = projects.indexOf(currentProject);
    if (currentProjectIndex + 1 < projectsLength) {
      nextProjectIndex = currentProjectIndex + 1;
    }
  }

  return projects[nextProjectIndex];
};

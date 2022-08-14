export const goNextProject = ({ projects, triggerTransition }) => {
  const projectsLength = projects.length;
  let result;
  let projectsSeen = JSON.parse(localStorage.getItem("projectsSeen"));
  if (!projectsSeen) {
    projectsSeen = [];
  }
  if (projectsSeen.length >= projectsLength) {
    result = projectsSeen.shift();
  } else {
    let isViewed;
    do {
      result = Math.floor(Math.random() * projectsLength);
      isViewed =
        projectsSeen.filter((item) => {
          return item === result;
        }).length > 0;
    } while (isViewed);
  }
  projectsSeen.push(result);
  localStorage.setItem("projectsSeen", JSON.stringify(projectsSeen));
  triggerTransition({ to: `/${projects[result].title}` });
};

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

export const getNextProject = ({ projects }) => {
  const projectsLength = projects.length;
  let number;
  let projectsSeen = JSON.parse(localStorage.getItem("projectsSeen"));
  if (!projectsSeen) {
    projectsSeen = [];
  }
  if (projectsSeen.length >= projectsLength) {
    number = projectsSeen.shift();
  } else {
    let isViewed;
    do {
      number = Math.floor(Math.random() * projectsLength);
      isViewed =
        projectsSeen.filter((item) => {
          return item === number;
        }).length > 0;
    } while (isViewed);
  }

  return { number: number, title: `${projects[number].title}` };
};
export const saveNextProject = (number) => {
  let projectsSeen = JSON.parse(localStorage.getItem("projectsSeen"));
  if (!projectsSeen) {
    projectsSeen = [];
  }
  projectsSeen.push(number);
  localStorage.setItem("projectsSeen", JSON.stringify(projectsSeen));
};

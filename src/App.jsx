import React, { useState } from 'react';
import ProjectsSidebar from './components/ProjectsSidebar';
import NewProject from './components/NewProject';
import NoProjectSelected from './components/NoProjectSelected';
import SelectedProject from './components/SelectedProject';

const App = () => {
  const [projectsState, setProjectsState] = useState({
    // 왜 null이 아니라 undefined?
    // null은 새로운 프로젝트를 추가하고 싶을 때, 사용하고
    // undefined는 추가한 새 프로젝트가 없거나 아무런 프로젝트도 선택하지 않았을 때 사용
    selectedProjectId: undefined,
    projects: [],
  });

  const handleSelectProject = (id) => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  };

  const handleStartAddProject = () => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        // undefined -> null : 이제 새 프로젝트를 추가한다는 의미.
        selectedProjectId: null,
      };
    });
  };

  const handleCancelAddProject = () => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  };

  const handleAddProject = (projectData) => {
    const newProject = {
      ...projectData,
      id: Math.random(), // id는 중복되면 안되서 좋은 방법이 아니지만, 연습용 코드임.
    };

    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject], // 이전 프로젝트 데이터들은 전부 ...prevState.projects에 담겨 있고, 새로운 프로젝트를 추가함.
      };
    });
  };

  const handleDeleteProject = () => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter((project) => {
          // 지울 id에 해당하는 project를 배열에서 제거하는 구문임. (filter에서 false가 반환되면 해당 요소를 제외한 나머지 배열이 반환됨.)
          project.id !== prevState.selectedProjectId;
        }),
      };
    });
  };

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  let content = (
    <SelectedProject project={selectedProject} onDelete={handleDeleteProject} />
  );
  if (projectsState.selectedProjectId === null) {
    // 새 프로젝트 추가
    content = (
      <NewProject
        onAddProject={handleAddProject}
        onCancel={handleCancelAddProject}
      />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    // 프로젝트 없을 때
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
};

export default App;

import React, { useState } from 'react';
import ProjectsSidebar from './components/ProjectsSidebar';
import NewProject from './components/NewProject';
import NoProjectSelected from './components/NoProjectSelected';

const App = () => {
  const [projectsState, setProjectState] = useState({
    // 왜 null이 아니라 undefined?
    // null은 새로운 프로젝트를 추가하고 싶을 때, 사용하고
    // undefined는 추가한 새 프로젝트가 없거나 아무런 프로젝트도 선택하지 않았을 때 사용
    selectedProjectId: undefined,
    projects: [],
  });

  const handleStartAddProject = () => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        // undefined -> null : 이제 새 프로젝트를 추가한다는 의미.
        selectedProjectId: null,
      };
    });
  };

  const handleCancelAddProject = () => {
    setProjectState((prevState) => {
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

    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject], // 이전 프로젝트 데이터들은 전부 ...prevState.projects에 담겨 있고, 새로운 프로젝트를 추가함.
      };
    });
  };

  let content;
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
      />
      {content}
    </main>
  );
};

export default App;

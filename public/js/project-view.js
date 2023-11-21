//#region Imports
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
mermaid.initialize({ startOnLoad: true });

//#endregion

//#region Initial Const
const ProjectGanttChart = document.getElementById('gantt');
const ProjectTitle = document.getElementById('project-title');
const ProjectId = document.location.split('/').pop();

//#endregion

//#region Class Setup
const SetProjectName = function(newName) {
    ProjectTitle.innerHTML = newName;
}

const RefreshGantt = function(project, tasks, checkpoints) {

}

//#endregion

//#region API Calls
const GetProject = async function() {
    const projectResponse = await fetch(`/api/project/${ProjectId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    if (projectResponse.status == 500) return;
    const project = await projectResponse.json();

    const tasksResponse = await fetch(`api/task/${ProjectId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    if (tasksResponse.status == 500) return;
    const tasks = await tasksResponse.json();

    const checkpointResponse = await fetch(`api/checkpoint/${ProjectId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    if (checkpointResponse.status == 500) return;
    const checkpoints = await checkpointResponse.json();

    this.SetProjectName(project.project.name);
    this.RefreshGantt(project.project, tasks.tasks, checkpoints.checkpoints);
}

//#endregion

GetProject();
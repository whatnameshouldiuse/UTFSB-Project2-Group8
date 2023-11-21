import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
mermaid.initialize({ startOnLoad: false });
// import { dayjs } from 'https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js';

//#region Initial Const
const ProjectGanttChart = document.getElementById('gantt');
const ProjectTitle = document.getElementById('project-title');
console.log(document.location);
const ProjectId = document.location.href.split('/').pop();

//#endregion

//#region Class Setup
const SetProjectName = function(newName) {
    ProjectTitle.innerHTML = newName;
}

/**
 * 
 * @param {*} project 
 * @param {[]} tasks 
 * @param {[]} checkpoints 
 */
const RefreshGantt = function(project, tasks, checkpoints) {
    var newMermaidGantt = `gantt
    title ${project.name}
    dateFormat YYYY-MM-DD\n`;

    const orderedTasks = tasks.sort((t1, t2) => {
        return t1.priority > t2.priority
    })

    orderedTasks.forEach((task) => {
        newMermaidGantt += `section ${task.name}
        Task : ${dayjs(task.start_date).format('YYYY-MM-DD')}, ${dayjs(task.start_date).diff(dayjs(task.end_date), 'day')}d\n`
        
        let taskCheckpoints = checkpoints.filter((check) => { return check.task_id == task.id; });
        taskCheckpoints.forEach((check) => {
            newMermaidGantt += `${check.name} : milestone, ${dayjs(check.date).format('YYYY-MM-DD')}, 1D\n`
        });
    });

    console.log(newMermaidGantt);
    ProjectGanttChart.innerHTML = newMermaidGantt;
    mermaid.run();
}

//#endregion

//#region API Calls
const GetProject = async function() {
    const projectResponse = await fetch(`/api/projects/${ProjectId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    if (projectResponse.status == 500) return;
    const project = await projectResponse.json();
    console.log(project);

    const tasksResponse = await fetch(`api/tasks/${ProjectId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    if (tasksResponse.status == 500) return;
    const tasks = await tasksResponse.json();

    const checkpointResponse = await fetch(`api/checkpoints/${ProjectId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    if (checkpointResponse.status == 500) return;
    const checkpoints = await checkpointResponse.json();

    SetProjectName(project.name);
    RefreshGantt(project, tasks.tasks, checkpoints.checkpoints);
}

//#endregion

console.log(ProjectId);
GetProject();
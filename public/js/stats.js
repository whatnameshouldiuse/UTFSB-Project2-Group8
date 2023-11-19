const AllProjectBarChart = document.getElementById("AllProjectChart");
const OneProjectBarChart = document.getElementById("OneProjectBarChart");
const OneProjectPieChart = document.getElementById("OneProjectPieChart");
const UserInfoElement = document.getElementById("UserInfo");
const ProjectInfoElement = document.getElementById("Project-information-dev");
const UserHeaderElement = document.getElementById("User-header");
const ProjectHeaderElement = document.getElementById("Project-header");

const COLORS = [
    '#6879D0',    
    '#000080',
    '#3A9BDC',
    '#29C5F6',
    '#55E2E9',
    '#04BADE',
    '#0496C7',
    '#006CA5',
    '#02367B'
  ];

  
  var AllProjectBarChartVar = null;
  var OneProjectBarChartVar = null;
  var OneProjectPieChartVar = null;  


function GetLabelsAllProject(AllProjectdata)
{
    var ProjectLabels = [];

    console.log("number of projects: ", AllProjectdata.length);

    for (let i=0; i<AllProjectdata.length; i++)
    {
        ProjectLabels[i] = AllProjectdata[i].name;
    }

    return ProjectLabels;
}

function GetDatasetsAllProejct(AllProjectdata)
{
    var ProjectData = [];

    console.log("number of projects: ", AllProjectdata.length);

    for (let i=0; i<AllProjectdata.length; i++)
    {
        ProjectData[i] = AllProjectdata[i].tasks.length;     // number of tasks for each project
    }

    var Backgroundcolor = [];
    for (let i=0; i<AllProjectdata.length; i++)
    {
        Backgroundcolor[i] = COLORS[i % COLORS.length];
//        console.log(Backgroundcolor[i]);
    }

    var ProjectDataset = {
        label: 'Number of Tasks',
        data: ProjectData,
        backgroundColor: Backgroundcolor,
        borderWidth: 1
    }

    return ([ProjectDataset]);
}

function GetDataForAllProjectChart(AllProjectdata)
{
    const ChartData = {
        labels: GetLabelsAllProject(AllProjectdata),    // Project name
        datasets: GetDatasetsAllProejct(AllProjectdata)
    };

    return ChartData;
}

function GetOptionForProjectChart(userData, AllProjectdata)
{
    const ChartOption = {
        indexAxis: 'y',      
        scales: {
        },
        plugins: {
//             title: {
//                 display: true,
//                 text: 'Projects of User',
//                 padding: {
//                     top: 10,
//                     bottom: 30
//                 },
//                 // font: {
//                 //     size: 20,
//                 //     weight: bold,                    
//                 // },
// //                color: {}
//             },
            legend: {
                display: false
            },    
        },
        onClick: (e, activeEls) => {
            // console.log("Click!", activeEls);
            // console.log("index = ", activeEls[0].index);

            RenderOneProjectChart(userData, activeEls[0].index, AllProjectdata);
        }
    };

    return ChartOption
}

function RenderAllProjectChart(ChartData, ChartOption)
{
    AllProjectBarChartVar = new Chart(AllProjectBarChart, {
        type: 'bar',
        data: ChartData,
        options: ChartOption,
    });

    console.log("OneProjectBarChart: ", OneProjectBarChart);
    console.log("OneProjectPieChart: ", OneProjectPieChart);
}

function DisplayOneProjectInfo(userData, projectIndex, AllProjectdata)
{
    ProjectHeaderElement.innerHTML = AllProjectdata[projectIndex].name + " Project";

    UserInfoElement.innerHTML = userData.name + "'s " + AllProjectdata[projectIndex].name + " Project is filled with";
    UserInfoElement.innerHTML += "<br>"

    for (i=0; i<AllProjectdata[projectIndex].tasks.length-1; i++)
    {
        UserInfoElement.innerHTML += "&#8226 " + AllProjectdata[projectIndex].tasks[i].name + ',';
        UserInfoElement.innerHTML += "<br>"        
    }
    UserInfoElement.innerHTML += "&#8226 " + AllProjectdata[projectIndex].tasks[i].name;
    UserInfoElement.innerHTML += " Tasks";

}


function RenderOneProjectChart(userData, projectIndex, AllProjectdata)
{

    EnableProjectInfo();

    DisplayOneProjectInfo(userData, projectIndex, AllProjectdata);

    RenderOneProjectBarChart(projectIndex, AllProjectdata);
    RenderOneProjectPieChart(projectIndex, AllProjectdata);

}


function getTaskLabelsForOneProject(oneProjectData)
{
    var TaskLabels = [];
    for (let i=0; i<oneProjectData.tasks.length ; i++)
    {
        TaskLabels[i] = oneProjectData.tasks[i].name;
    }

    return TaskLabels;
}

function getTaskDataForOneProject(oneProjectData)
{
    var TaskData = [];
    for (let i=0; i<oneProjectData.tasks.length ; i++)
    {
        let start_data = oneProjectData.tasks[i].start_date;
        let end_date = oneProjectData.tasks[i].end_date;

        // console.log(start_data);
        // console.log(end_date);

        let sDate = new Date(start_data);
        let eDate = new Date(end_date);

        // console.log(sDate);
        // console.log(eDate);

        let diff_time = eDate.getTime() - sDate.getTime();
        let diff_days = diff_time/(1000*3600*24);

        TaskData[i] = diff_days;
    }  
    
    return TaskData;
}

function getBackgroundColorForOneProject(oneProjectData)
{
    var BackgroundColor = [];
    for (let i=0; i<oneProjectData.tasks.length; i++)
    {
        BackgroundColor[i] = COLORS[i % COLORS.length];
    }

    return BackgroundColor;
}

function RenderOneProjectBarChart(projectIndex, AllProjectdata)
{
    // console.log("RenderOneProjectBarChart");
    // console.log(OneProjectBarChartVar);

    if (OneProjectBarChartVar != null)
    {
        OneProjectBarChartVar.destroy();
//        console.log("OneProjectBarChartVar destroy");        
    }

    const oneProjectData = AllProjectdata[projectIndex];
    const TaskLabels = getTaskLabelsForOneProject(oneProjectData);
//    console.log(TaskLabels);

    const TaskData = getTaskDataForOneProject(oneProjectData);
//    console.log(TaskData);

    const BackgroundColor = getBackgroundColorForOneProject(oneProjectData);

    OneProjectBarChartVar = new Chart(OneProjectBarChart, {
        type: 'bar',
        data: {
            labels: TaskLabels,    // Project name
            datasets: [{
                label: 'Days on Task',
                data: TaskData,         // number of tasks for each project
                backgroundColor: BackgroundColor,                
                borderWidth: 1
            }]
        },    
        options: {
            indexAxis: 'y',
            scales: {
            },
            plugins: {
                legend: {
                    display: false
                },
            },
        }
    });  

//    console.log(OneProjectBarChart);
}



function RenderOneProjectPieChart(projectIndex, AllProjectdata)
{
    // console.log("RenderOneProjectPieChart");
    // console.log(OneProjectPieChartVar);

    if (OneProjectPieChartVar != null)
    {
//        console.log("PieChartVar destroy");
        OneProjectPieChartVar.destroy();
    }

    const oneProjectData = AllProjectdata[projectIndex];
    const TaskLabels = getTaskLabelsForOneProject(oneProjectData);    
    const TaskData = getTaskDataForOneProject(oneProjectData);
    const BackgroundColor = getBackgroundColorForOneProject(oneProjectData);

    OneProjectPieChartVar = new Chart(OneProjectPieChart, {
        type: 'doughnut',
        data: {
            labels: TaskLabels,
            datasets: [{
            label: 'Days on Task',
            data: TaskData,
            backgroundColor: BackgroundColor,
            hoverOffset: 4
        }]
        },  
        options: {
            plugins: {
                legend: {
                    display: true,
                    position: 'right'
                }
            }
        }  
    });   
    
//    console.log(OneProjectPieChart);
}

function DisplayUserProjectInfo(userData, AllProjectdata)
{
    console.log(userData);
    console.log(AllProjectdata);

    UserHeaderElement.innerHTML = userData.name + "'s Projects";
    UserInfoElement.innerHTML = userData.name + " has been so busy with ";
    UserInfoElement.innerHTML += "<br>"

    for (i=0; i<AllProjectdata.length-1; i++)
    {
        UserInfoElement.innerHTML += "&#8226 " + AllProjectdata[i].name + ',';
        UserInfoElement.innerHTML += "<br>"        
    }
    UserInfoElement.innerHTML += "&#8226 " + AllProjectdata[AllProjectdata.length-1].name;
    UserInfoElement.innerHTML += " Projects";
}


function InitializeAllProjectChart (userData)
{
    console.log("InitializeAllProjectChart");

    const id = 1;
    console.log(id);

    fetch(`/api/stats/project/${id}`).then (response => {
        if (!response.ok)
        {
            throw new Error("Error");
        }
        return response.json();
    })
    .then (AllProjectdata => {
        console.log(AllProjectdata);

        const AllProjectData = GetDataForAllProjectChart(AllProjectdata);        
        const AllProjectOption = GetOptionForProjectChart(userData, AllProjectdata);

        DisplayUserProjectInfo(userData, AllProjectdata);
        RenderAllProjectChart(AllProjectData, AllProjectOption);

        return AllProjectdata;
    })
    // .then (AllProjectdata => {
    //     console.log(AllProjectdata);
        

    // })
    .catch (error => console.error("Error", error));    
}

function DisableProjectInfo()
{
    ProjectInfoElement.style.display = "none";
}

function EnableProjectInfo()
{
    ProjectInfoElement.style.display = "block";
}



var InitializeUserInfo
{

    console.log("InitializeUserInfo");

    DisableProjectInfo();

    const id = 1;
    console.log(id);

    const userData=[];
//    InitializeAllProjectChart(userData);


    fetch(`/api/stats/user/${id}`).then (response => {
        if (!response.ok)
        {
            throw new Error("Error");
        }
        return response.json();
    }) 
    .then (userData => {
        console.log(userData);

        InitializeAllProjectChart(userData);
    })
    .catch (error => console.error("Error", error));    

    
}
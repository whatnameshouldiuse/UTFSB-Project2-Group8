const AllProjectBarChart = document.getElementById("AllProjectChart");
const OneProjectBarChart = document.getElementById("OneProjectBarChart");
const OneProjectPieChart = document.getElementById("OneProjectPieChart");


new Chart (AllProjectBarChart, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue'],    // Project name
        datasets: [{
            label: '# of Tasks',
            data: [40, 50],         // number of tasks for each project
            borderWidth: 1
        }]
    },
    options: {
        indexAxis: 'y',
    }
});


new Chart (OneProjectBarChart, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue'],    // Project name
        datasets: [{
            label: '# of Tasks',
            data: [40, 50],         // number of tasks for each project
            borderWidth: 1
        }]
    }
});


new Chart (OneProjectPieChart, {
    type: 'doughnut',
    data: {
        labels: ['Task1', 'Task2', 'Task3'],
    datasets: [{
        label: 'Days on Task',
        data: [30, 50, 20],
        backgroundColor: ['#3944BC', '281E5D', '#1520A6'],
        hoverOffset: 4
    }]
    }
});


// const labels = Utils.monts({count: 7});
// const allProjectBarChartConfigData = {
//     labels: labels,
//     datasets: [{
//         axis: 'y',
//         label: "All Project for User",
//         data: [65, 59, 80, 81, 56, 55, 40],
//         fill: true,
//         backgroundColor: [
//             '#3944BC', '281E5D', '#1520A6', '#59788E', '#051094', '#52B2BF', '#2832C2'
//         ],
//         borderWidth: 1
//     }]
// };

// const allProjectBarChartConfig = {
//     type: 'bar',
//     allProjectBarChartConfigData,
//     options: {
//         indexAxis: 'y',
//     }
// };


// new Chart(allProjectBarChart, allProjectBarChartConfig);
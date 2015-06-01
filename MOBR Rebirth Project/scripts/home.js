
//creates a chart on the canvas object.
function populateChart() {
    var pieData = [{ value: window.APP.models.observation.closed, color: "#F38630", label: 'Closed', labelColor: 'white', labelFontSize: '16' },
        		   { value: window.APP.models.observation.open, color: "#F34353", label: 'Open', labelColor: 'white', labelFontSize: '16' }];
    var myPie = new Chart(document.getElementById("canvas").getContext("2d")).Pie(pieData, {
        animationSteps: 100,
        animationEasing: 'easeInOutQuart'
    });
}

//chain the 2 expansions together to get Closed & open statuses, use callbacks to ensure correct ordering, then populate chart.
function loadHome() {
    QueryCountByProperty("ObservationReport", "Status", "Closed", function (e) {
        QueryCountByProperty("ObservationReport", "Status", "Open", function (f) {
            window.APP.models.observation.open = e;
            window.APP.models.observation.closed = f;
            console.log(window.APP.models.observation.closed);
            populateChart();
        })
    });
}
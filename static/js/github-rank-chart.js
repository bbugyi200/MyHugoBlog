var ctx = document.getElementById('myChart').getContext('2d');
var axFontSize = 17;
var myChart = new Chart(ctx, {
	type: 'bar',
	data: [
        {
            dataPoints: [
                { label: "TensorFlow", y: 5.00, link: "" },
                { label: "Django", y: 4.59, link: "" },
                { label: "Flask", y: 3.74, link: "" },
                { label: "Atom", y: 3.33, link: "" },
                { label: "Pytest", y: 3.30, link: "" },
                { label: "Qutebrowser", y: 2.49, link: "" },
                { label: "XMonad", y: 2.47, link: "" },
                { label: "Cookiecutter", y: 2.26, link: "" },
                { label: "Khal", y: 2.12, link: "" }
            ],
            datasets: [{
                label: '',
                backgroundColor: [
'rgba(255, 99, 132, 0.2)',
'rgba(54, 162, 235, 0.2)',
'rgba(255, 206, 86, 0.2)',
'rgba(75, 192, 192, 0.2)',
'rgba(153, 102, 255, 0.2)',
'rgba(255, 159, 64, 0.2)',
'rgba(255, 99, 132, 0.2)',
'rgba(54, 162, 235, 0.2)',
'rgba(255, 206, 86, 0.2)'
                ],
                borderWidth: 1
            }]
        }
    ],
	options: {
        title: {
            fontSize: 25,
            display: true,
            text: "GitHub Project vs Rank"
        },
        legend: {
            display: false
        },
		scales: {
            xAxes: [{
                scaleLabel: {
                    display: true,
                    fontSize: axFontSize,
                    labelString: 'GitHub Project'
                },
				ticks: {
					beginAtZero:true
				}
            }],
			yAxes: [{
                scaleLabel: {
                    display: true,
                    fontSize: axFontSize,
                    labelString: 'Rank'
                },
				ticks: {
					beginAtZero:true
				}
			}]
		}
	}
});

function onClick(e){ 
        window.open(e.dataPoint.link,'_blank');  
};

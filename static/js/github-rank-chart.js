var ctx = document.getElementById('myChart').getContext('2d');
var axFontSize = 17;
var myChart = new Chart(ctx, {
	type: 'bar',
	data: {
		labels: ['TensorFlow', 'Django', 'Flask', 'Atom', 'Pytest', 'Qutebrowser', 'XMonad', 'Cookiecutter', 'Khal'],
		datasets: [{
			label: '',
			data: [5.00, 4.59, 3.74, 3.33, 3.30, 2.49, 2.47, 2.26, 2.12],
			backgroundColor: [
'rgba(255, 99, 132, 0.2)',
'rgba(54, 162, 235, 0.2)',
'rgba(255, 206, 86, 0.2)',
'rgba(75, 192, 192, 0.2)',
'rgba(153, 102, 255, 0.2)',
'rgba(255, 159, 64, 0.2)',
'rgba(155, 99, 132, 0.2)',
'rgba(54, 62, 235, 0.2)',
'rgba(55, 206, 86, 0.2)'
			],
			borderWidth: 1
		}]
	},
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

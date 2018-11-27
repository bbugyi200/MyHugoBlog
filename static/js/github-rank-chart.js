var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
	type: 'bar',
	data: {
		labels: ['TensorFlow', 'Django', 'Flask', 'Atom', 'pytest', 'qutebrowser', 'xmonad', 'cookiecutter', 'khal'],
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
'rgba(255, 99, 132, 0.2)',
'rgba(54, 162, 235, 0.2)',
'rgba(255, 206, 86, 0.2)'
			],
			borderWidth: 1
		}]
	},
	options: {
        legend: {
            display: false
        },
		scales: {
			yAxes: [{
				ticks: {
					beginAtZero:true
				}
			}]
		}
	}
});

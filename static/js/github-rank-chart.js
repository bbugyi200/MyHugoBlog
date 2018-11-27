var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
	type: 'bar',
	data: {
		labels: ['TensorFlow', 'Django', 'Flask', 'Atom', 'pytest', 'qutebrowser', 'xmonad', 'cookiecutter', 'khal'],
		datasets: [{
			label: '# of Votes',
			data: [5.00, 4.59, 3.74, 3.33, 3.30, 2.49, 2.47, 2.26, 2.12],
			borderWidth: 1
		}]
	},
	options: {
		scales: {
			yAxes: [{
				ticks: {
					beginAtZero:true
				}
			}]
		}
	}
});

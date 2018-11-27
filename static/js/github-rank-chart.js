var ctx = document.getElementById('myChart').getContext('2d');
var axFontSize = 17;
var myChart = new Chart(ctx, {
	data: [
        {
            type: 'bar',
            cursor: 'pointer',
            click: onClick,
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
});

function onClick(e){ 
        window.open(e.dataPoint.link,'_blank');  
};

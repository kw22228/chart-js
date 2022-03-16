import template from './index.template';
import Chart from './lib/chart';
function App() {
    const container = document.querySelector('#root');
    container.innerHTML = template();

    const chart = new Chart('#chart');

    chart.percent = 75;
    chart.duration = 1000;
    chart.label = '충전중';

    chart.render();
}

document.addEventListener('DOMContentLoaded', App);

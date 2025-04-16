import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import regression from 'regression';
import '../styles/RegressionChart.css';

const RegressionChart = () => {
  useEffect(() => {
    const ctx = document.getElementById('chart').getContext('2d');
    const dataPoints = [];

    const chart = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'Исходные данные',
            data: [],
            backgroundColor: '#ffffff',
            borderColor: '#ffffff',
            pointRadius: 6,
          },
          {
            label: 'Линейная регрессия',
            data: [],
            borderColor: '#AAAAAA',
            fill: false,
            showLine: true,
          },
          {
            label: 'Квадратичная регрессия',
            data: [],
            borderColor: '#888888',
            fill: false,
            showLine: true,
          },
          {
            label: 'Экспоненциальная регрессия',
            data: [],
            borderColor: '#666666',
            fill: false,
            showLine: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { title: { display: true, text: 'X', color: '#ccc' }, ticks: { color: '#888' } },
          y: { title: { display: true, text: 'Y', color: '#ccc' }, ticks: { color: '#888' } },
        },
        plugins: {
          legend: {
            labels: { color: '#aaa', font: { size: 12 } },
          },
        },
      },
    });

    window.addData = () => {
      const x = parseFloat(document.getElementById('xValue').value);
      const y = parseFloat(document.getElementById('yValue').value);
      if (!isNaN(x) && !isNaN(y)) {
        dataPoints.push([x, y]);
        chart.data.datasets[0].data.push({ x, y });
        updateRegressions();
        chart.update();

        // сохраняем в историю
        const history = JSON.parse(localStorage.getItem('datasetHistory') || '[]');
        history.push({ x, y, timestamp: new Date().toLocaleString() });
        localStorage.setItem('datasetHistory', JSON.stringify(history));
      }
    };

    const updateRegressions = () => {
      if (dataPoints.length < 2) return;
      const linear = regression.linear(dataPoints);
      const quadratic = regression.polynomial(dataPoints, { order: 2 });
      const exponential = regression.exponential(dataPoints);

      document.getElementById('regressionFormulas').innerHTML = `
        <strong>Линейная:</strong> ${linear.string}<br/>
        <strong>Квадратичная:</strong> ${quadratic.string}<br/>
        <strong>Экспоненциальная:</strong> ${exponential.string}
      `;

      updateDataset(chart.data.datasets[1], linear.equation);
      updateDataset(chart.data.datasets[2], quadratic.equation);
      updateDataset(chart.data.datasets[3], exponential.equation);
      chart.update();
    };

    const updateDataset = (dataset, equation) => {
      dataset.data = [];
      for (let x = -5; x <= 5; x += 1) {
        let y;
        if (equation.length === 2) {
          y = equation[0] * x + equation[1];
        } else if (equation.length === 3) {
          y = equation[0] * x * x + equation[1] * x + equation[2];
        } else {
          y = equation[0] * Math.exp(equation[1] * x);
        }
        dataset.data.push({ x, y });
      }
    };

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div className="regression-wrapper">
      <h2>График регрессий</h2>
      <div className="chart-container">
        <canvas id="chart"></canvas>
      </div>
      <div className="input-container">
        <input type="number" id="xValue" placeholder="X" />
        <input type="number" id="yValue" placeholder="Y" />
        <button onClick={() => window.addData()}>Добавить</button>
      </div>
      <div className="regression-info" id="regressionFormulas"></div>
    </div>
  );
};

export default RegressionChart;
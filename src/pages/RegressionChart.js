import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import regression from 'regression';
import '../styles/RegressionChart.css';

const RegressionChart = ({ onAuthClick }) => {
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
            backgroundColor: 'red',
            borderColor: 'red',
            pointRadius: 6,
          },
          {
            label: 'Линейная регрессия',
            data: [],
            borderColor: 'blue',
            fill: false,
            showLine: true,
          },
          {
            label: 'Квадратичная регрессия',
            data: [],
            borderColor: 'green',
            fill: false,
            showLine: true,
          },
          {
            label: 'Экспоненциальная регрессия',
            data: [],
            borderColor: 'purple',
            fill: false,
            showLine: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { title: { display: true, text: 'X' } },
          y: { title: { display: true, text: 'Y' } },
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
      }
    };

    const updateRegressions = () => {
      if (dataPoints.length < 2) return;

      const linear = regression.linear(dataPoints);
      const quadratic = regression.polynomial(dataPoints, { order: 2 });
      const exponential = regression.exponential(dataPoints);

      const formulas = `
        Линейная: ${linear.string} <br>
        Квадратичная: ${quadratic.string} <br>
        Экспоненциальная: ${exponential.string}
      `;
      document.getElementById('regressionFormulas').innerHTML = formulas;

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
    <div className="regression-chart-wrapper">
      <h2>График регрессий</h2>
      <canvas id="chart"></canvas>

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
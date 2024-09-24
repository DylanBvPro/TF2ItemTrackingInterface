import Chart from 'chart.js/auto';
//import { items } from './+page.svelte';

async function loadItems() {
  const generatedItems = await displayRandomItems();
  console.log(generatedItems); // Use the generated items as needed
}

loadItems();

export function charter(canvasElement) {
  const data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];

  new Chart(canvasElement, {
    type: 'line', // Change type to 'line'
    data: {
      labels: data.map(row => row.year),
      datasets: [
        {
          label: 'Acquisitions by year',
          data: data.map(row => row.count),
          fill: true, // Optional: Enable filling under the line
          backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color for the area under the line
          borderColor: 'rgba(75, 192, 192, 1)', // Color of the line
          tension: 0.3, // Optional: Controls the curve of the line
          borderWidth: 2, // Line width
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true // Ensure the Y-axis starts at 0
        }
      }
    }
  });
}


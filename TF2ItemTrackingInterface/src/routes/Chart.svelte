<script>
  import { onMount } from "svelte";
  import { Line } from 'svelte-chartjs';
  import { data } from './data.js';
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
    Filler,
  } from 'chart.js';

  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    Filler,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale
  );

  let selectedArray = 'Ap-Sap';

  async function fetchUserSectionData() {
    try {
      const response = await fetch('src/lib/data/itemValue.json');
      const itemData = await response.json();

      // Check if itemData is an array
      if (itemData[selectedArray] && Array.isArray(itemData[selectedArray])) {
        const datasets = itemData[selectedArray].map(item => ({
          fill: true,
          label: 'My First dataset',
          type: 'line',
          lineTension: 0.3,
          backgroundColor: 'rgba(225, 204,230, .7)',
          borderColor: 'rgb(205, 130, 158)',

          pointBackgroundColor: 'rgb(255, 255, 255)',
          data: [65, 9, 28] // Use the 'number' field as data
          
        }));
        console.error('itemData is not an array:', itemData);
        // Update data for the graph
      } else {
        console.error('itemData is not an array:', itemData);
      }
    } catch (error) {
      console.error('Error fetching item data:', error);
    }
  }

  onMount(() => {
      fetchUserSectionData();
    });

</script>

<canvas>
  <Line {data} options={{ responsive: true }} />
</canvas>

<style>
  canvas {
    background-color: white;  /* Set background color to white */
    max-width: 100%;
    height: 400px;
  }
</style>
  
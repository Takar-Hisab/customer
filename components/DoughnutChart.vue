<template>
    <Doughnut id="area-chart" :options="chartOptions" :data="chartData" />
</template>
  
<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'DoughnutChart',
  components: {Doughnut},
  data() {
    return {
      chartData: {
        labels: ['Used - 50 GB', 'Free 5 GB'],
        datasets: [
          {
            backgroundColor: ['#00C16A', '#f2f2f2'],
            data: [80, 20]
          }
        ]
      },
      chartOptions: {
        responsive: true
      }
    }
  },
}
</script>
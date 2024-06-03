<template>
    <Bar
        id="my-chart-id"
        :options="chartOptions"
        :data="chartData"
        class="w-full"
    />
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
const props = defineProps({
  data:Object,
})
const chartData = {
    labels: props.data?.map(item => item?.x),//[ 'January', 'February', 'March', 'April', 'May', 'June', 'july', 'August', 'September', 'October ', 'November', 'December' ],
    datasets: [{
        label: 'Product Sales Record - 2024',
        data: props.data?.map(item => item?.y),// [65, 59, 80, 75, 56, 55, 40, 81],
            backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            // 'rgba(255, 159, 64, 0.2)',
            // 'rgba(255, 205, 86, 0.2)',
            // 'rgba(75, 192, 192, 0.2)',
            // 'rgba(54, 162, 235, 0.2)',
            // 'rgba(153, 102, 255, 0.2)',
            // 'rgba(201, 203, 207, 0.2)'
        ],
/*        borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
            ],*/
        borderWidth: 1
    }]
}
const chartOptions = {
    responsive: true
}

</script>
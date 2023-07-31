import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { createCategoryMap, generateChartData, getRandomColor } from './Utils/chartUtils';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Transaction {
    id: string;
    name: string;
    amount: number;
    date: string;
    category: string[];
}

interface Transactions {
    transactions: Transaction[];
}

const DonutChart: React.FC<Transactions> = ({ transactions }) => {
    if (!transactions || transactions.length === 0) {
        return null; // or display a message that there are no transactions
    }

    const categoryMap = createCategoryMap(transactions);
    const { labels, data } = generateChartData(categoryMap);

    const backgroundColors = data.map(() => getRandomColor());
    const borderColors = data.map(() => getRandomColor());

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Amount',
                data: data,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
            },
        ],
    };

    return <Doughnut data={chartData} />;
};

export default DonutChart;




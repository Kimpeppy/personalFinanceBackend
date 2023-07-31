
interface Transaction {
    id: string;
    name: string;
    amount: number;
    date: string;
    category: string[];
}


// Function to create the category map
export const createCategoryMap = (transactions: Transaction[]) => {
    const categoryMap = new Map<string, number>();
    

    for (let i = 0; i < transactions.length; i++) {
        const transaction = transactions[i];
        if (transaction.category === null) {
            continue;
        }
        for (let j = 0; j < transaction.category.length; j++) {
            const category = transaction.category[j];
            const amount = transaction.amount;

            if (categoryMap.has(category)) {
                let value = categoryMap.get(category) as number;
                value += amount;
                categoryMap.set(category, value);
            } else {
                categoryMap.set(category, amount);
            }
        }
    }
    return categoryMap;
};

// Function to generate chart data from the category map
export const generateChartData = (categoryMap: Map<string, number>) => {
    const labels = Array.from(categoryMap.keys());
    const data = Array.from(categoryMap.values());
    return { labels, data };
};

export function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

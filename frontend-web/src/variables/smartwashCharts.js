// ✅ SmartWash - Chart Data Configuration
// This file replaces generic Argon charts with SmartWash business metrics.

import { chartOptions, parseOptions } from "./charts.js";

// 📈 Revenue (per month / per week)
const smartWashChart_Revenue = {
  options: chartOptions(),

  // Monthly revenue (DT)
  month: (canvas) => {
    return {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
      ],
      datasets: [
        {
          label: "Revenue (DT)",
          data: [500, 650, 700, 780, 820, 900, 1100, 1500, 1400, 1800],
        },
      ],
    };
  },

  // Weekly revenue (DT)
  week: (canvas) => {
    return {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Revenue (DT)",
          data: [120, 150, 200, 180, 250, 300, 320],
        },
      ],
    };
  },
};

// 🚗 Number of wash machine usages
const smartWashChart_Orders = {
  options: chartOptions(),
  data: {
    labels: ["M01", "M02", "M03", "M04", "M05", "M06"],
    datasets: [
      {
        label: "Cycles per machine",
        data: [40, 28, 55, 32, 75, 62],
        maxBarThickness: 12,
      },
    ],
  },
};

export {
  parseOptions,
  chartOptions,
  smartWashChart_Revenue,
  smartWashChart_Orders,
};

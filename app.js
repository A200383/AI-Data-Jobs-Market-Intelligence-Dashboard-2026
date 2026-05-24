const marketData = {
  jobsTotal: 142800,
  avgSalary: 144000,
  yoyGrowth: 18.7,
  topSkill: "Large Language Models",
  roles: [
    { label: "Machine Learning Engineer", value: 36000 },
    { label: "Data Scientist", value: 28000 },
    { label: "Analytics Engineer", value: 22000 },
    { label: "AI Researcher", value: 14500 },
    { label: "ML Ops / Platform", value: 12300 },
    { label: "Business Intelligence", value: 10200 }
  ],
  regions: [
    { label: "North America", value: 42 },
    { label: "EMEA", value: 28 },
    { label: "APAC", value: 20 },
    { label: "Latin America", value: 6 },
    { label: "MEA", value: 4 }
  ],
  skills: [
    { label: "LLMs", value: 27 },
    { label: "MLOps", value: 21 },
    { label: "Cloud AI", value: 18 },
    { label: "Data Engineering", value: 16 },
    { label: "Computer Vision", value: 12 },
    { label: "NLP", value: 10 }
  ]
};

const formatCurrency = (value) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
const formatPercent = (value) => `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;

const jobsTotalEl = document.getElementById("jobsTotal");
const avgSalaryEl = document.getElementById("avgSalary");
const yoyGrowthEl = document.getElementById("yoyGrowth");
const topSkillEl = document.getElementById("topSkill");
const refreshBtn = document.getElementById("refreshBtn");

const renderKpis = () => {
  jobsTotalEl.textContent = marketData.jobsTotal.toLocaleString();
  avgSalaryEl.textContent = formatCurrency(marketData.avgSalary);
  yoyGrowthEl.textContent = formatPercent(marketData.yoyGrowth);
  topSkillEl.textContent = marketData.topSkill;
};

const createChart = (ctx, type, data, options) => {
  return new Chart(ctx, { type, data, options });
};

const initCharts = () => {
  const roleCtx = document.getElementById("roleChart").getContext("2d");
  const regionCtx = document.getElementById("regionChart").getContext("2d");
  const skillCtx = document.getElementById("skillChart").getContext("2d");

  createChart(roleCtx, "bar", {
    labels: marketData.roles.map((item) => item.label),
    datasets: [
      {
        label: "Openings",
        data: marketData.roles.map((item) => item.value),
        backgroundColor: "rgba(79, 182, 255, 0.85)",
        borderRadius: 14,
        maxBarThickness: 28
      }
    ]
  }, {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { mode: "index", intersect: false }
    },
    scales: {
      x: { ticks: { color: "#b8c7db" }, grid: { display: false } },
      y: { ticks: { color: "#b8c7db" }, grid: { color: "rgba(255,255,255,0.08)" } }
    }
  });

  createChart(regionCtx, "doughnut", {
    labels: marketData.regions.map((item) => item.label),
    datasets: [
      {
        data: marketData.regions.map((item) => item.value),
        backgroundColor: [
          "#4fa6ff",
          "#57d2f6",
          "#a16cff",
          "#ff9e64",
          "#7ee5a2"
        ],
        hoverOffset: 10
      }
    ]
  }, {
    responsive: true,
    plugins: {
      legend: { position: "bottom", labels: { color: "#cdd7e1" } }
    }
  });

  createChart(skillCtx, "polarArea", {
    labels: marketData.skills.map((item) => item.label),
    datasets: [
      {
        data: marketData.skills.map((item) => item.value),
        backgroundColor: [
          "#74d2ff",
          "#81beff",
          "#b38dff",
          "#f7c86c",
          "#86f2d9",
          "#c17dff"
        ]
      }
    ]
  }, {
    responsive: true,
    plugins: {
      legend: { position: "right", labels: { color: "#cdd7e1" } }
    },
    scales: {
      r: {
        grid: { color: "rgba(255,255,255,0.08)" },
        angleLines: { color: "rgba(255,255,255,0.08)" },
        ticks: { color: "#9bb0c9" }
      }
    }
  });
};

const refreshData = () => {
  const volatility = Math.random() * 2 - 1;
  marketData.jobsTotal = Math.round(marketData.jobsTotal * (1 + volatility / 200));
  marketData.avgSalary = Math.round(marketData.avgSalary * (1 + volatility / 600));
  marketData.yoyGrowth = Math.round((marketData.yoyGrowth + volatility) * 10) / 10;
  if (marketData.yoyGrowth < 0) marketData.yoyGrowth = 0.2;

  renderKpis();
};

refreshBtn.addEventListener("click", () => {
  refreshData();
  refreshBtn.textContent = "Data refreshed";
  setTimeout(() => { refreshBtn.textContent = "Refresh data"; }, 1300);
});

renderKpis();
initCharts();

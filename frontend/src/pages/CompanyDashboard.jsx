import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  AreaChart,
  Area,
} from "recharts";

function CompanyDashboard() {
  const { companyId } = useParams();
  const [data, setData] = useState(null);
  const sectionRefs = {
    overview: useRef(null),
    profit: useRef(null),
    cashflow: useRef(null),
    balance: useRef(null),
    ratios: useRef(null),
  };

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/dashboard/${companyId}/`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [companyId]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!data) {
    return (
      <div className="bg-[#020617] min-h-screen flex justify-center items-center overflow-hidden">

        <div className="text-center">

          <div className="w-24 h-24 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-8"></div>

          <h1 className="text-4xl font-bold text-cyan-400 animate-pulse">

            Hold on...

          </h1>

          <p className="text-gray-400 mt-4 text-lg">

            Fetching Financial Intelligence

          </p>

        </div>

      </div>
    );
  }

  const analysis = data.analysis?.[0];
  const latestProfit = data.profit_loss?.[data.profit_loss.length - 1];
  const latestBalance = data.balance_sheet?.[data.balance_sheet.length - 1];

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: custom * 0.1 },
    }),
    hover: (custom) => ({
      scale: 1.05,
      boxShadow: custom.boxShadow,
      transition: { duration: 0.2, type: "spring", stiffness: 300 },
    }),
  };

  const glowColors = {
    sales: "0px 0px 30px rgba(6, 182, 212, 0.4)",
    profit: "0px 0px 30px rgba(34, 197, 94, 0.4)",
    cagr: "0px 0px 30px rgba(168, 85, 247, 0.4)",
    eps: "0px 0px 30px rgba(234, 179, 8, 0.4)",
    debt: "0px 0px 30px rgba(239, 68, 68, 0.4)",
  };

  return (
    <div className="bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617] min-h-screen text-white">
      <div className="flex">
        {/* SIDEBAR */}
        <div className="w-72 min-h-screen bg-[#0f172a]/80 backdrop-blur-xl border-r border-gray-800 p-8 sticky top-0 z-10">
          <div className="mb-14">
            <span className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent tracking-wide">
              NiftyIQ
            </span>
          </div>
          <div className="space-y-6 text-lg">
            <motion.a
              whileHover={{ x: 10, color: "#22d3ee" }}
              transition={{ type: "spring", stiffness: 400 }}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("overview");
              }}
              href="#overview"
              className="block text-cyan-400 hover:text-white transition cursor-pointer"
            >
              Overview
            </motion.a>
            <motion.a
              whileHover={{ x: 10, color: "#22d3ee" }}
              transition={{ type: "spring", stiffness: 400 }}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("profit");
              }}
              href="#profit"
              className="block text-gray-400 hover:text-white transition cursor-pointer"
            >
              Profit Analysis
            </motion.a>
            <motion.a
              whileHover={{ x: 10, color: "#22d3ee" }}
              transition={{ type: "spring", stiffness: 400 }}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("cashflow");
              }}
              href="#cashflow"
              className="block text-gray-400 hover:text-white transition cursor-pointer"
            >
              Cash Flow
            </motion.a>
            <motion.a
              whileHover={{ x: 10, color: "#22d3ee" }}
              transition={{ type: "spring", stiffness: 400 }}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("balance");
              }}
              href="#balance"
              className="block text-gray-400 hover:text-white transition cursor-pointer"
            >
              Balance Sheet
            </motion.a>
            <motion.a
              whileHover={{ x: 10, color: "#22d3ee" }}
              transition={{ type: "spring", stiffness: 400 }}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("ratios");
              }}
              href="#ratios"
              className="block text-gray-400 hover:text-white transition cursor-pointer"
            >
              Financial Ratios
            </motion.a>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="flex-1 px-10 py-10"
        >
          {/* HEADER */}
          <div id="overview" className="mb-14 scroll-mt-8">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-6xl font-bold text-cyan-400 mb-3"
            >
              {companyId}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 text-xl"
            >
              Financial Intelligence Dashboard
            </motion.p>
          </div>

          {/* KPI CARDS */}
          <div className="grid md:grid-cols-5 gap-6 mb-14">
            <motion.div
              custom={{ boxShadow: glowColors.sales }}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="bg-[#1e293b]/70 backdrop-blur-xl p-6 rounded-3xl border border-cyan-500/20 shadow-2xl cursor-pointer"
            >
              <h2 className="text-gray-400 mb-3">Sales Growth</h2>
              <p className="text-4xl font-bold text-cyan-400">
                {analysis?.sales_growth?.toFixed(2)}%
              </p>
            </motion.div>

            <motion.div
              custom={{ boxShadow: glowColors.profit }}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="bg-[#1e293b]/70 backdrop-blur-xl p-6 rounded-3xl border border-green-500/20 shadow-2xl cursor-pointer"
            >
              <h2 className="text-gray-400 mb-3">Profit Growth</h2>
              <p className="text-4xl font-bold text-green-400">
                {analysis?.profit_growth?.toFixed(2)}%
              </p>
            </motion.div>

            <motion.div
              custom={{ boxShadow: glowColors.cagr }}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="bg-[#1e293b]/70 backdrop-blur-xl p-6 rounded-3xl border border-purple-500/20 shadow-2xl cursor-pointer"
            >
              <h2 className="text-gray-400 mb-3">Stock CAGR</h2>
              <p className="text-4xl font-bold text-purple-400">
                {analysis?.stock_cagr?.toFixed(2)}%
              </p>
            </motion.div>

            <motion.div
              custom={{ boxShadow: glowColors.eps }}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="bg-[#1e293b]/70 backdrop-blur-xl p-6 rounded-3xl border border-yellow-500/20 shadow-2xl cursor-pointer"
            >
              <h2 className="text-gray-400 mb-3">EPS</h2>
              <p className="text-4xl font-bold text-yellow-400">
                {latestProfit?.eps?.toFixed(2)}
              </p>
            </motion.div>

            <motion.div
              custom={{ boxShadow: glowColors.debt }}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="bg-[#1e293b]/70 backdrop-blur-xl p-6 rounded-3xl border border-red-500/20 shadow-2xl cursor-pointer"
            >
              <h2 className="text-gray-400 mb-3">Debt/Equity</h2>
              <p className="text-4xl font-bold text-red-400">
                {latestBalance?.debt_to_equity?.toFixed(2)}
              </p>
            </motion.div>
          </div>

          {/* HEALTH METER */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="bg-[#1e293b]/70 backdrop-blur-xl p-8 rounded-3xl mb-14 border border-gray-800"
          >
            <h2 className="text-3xl font-bold mb-8 text-yellow-400">
              Company Health Meter
            </h2>
            <div className="grid md:grid-cols-3 gap-10">
              <div>
                <p className="mb-3 text-gray-400">Profitability</p>
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{
                      width: `${Math.min(Math.abs(analysis?.profit_growth || 0), 100)}%`,
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="bg-green-400 h-4 rounded-full"
                  />
                </div>
              </div>
              <div>
                <p className="mb-3 text-gray-400">Revenue Growth</p>
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{
                      width: `${Math.min(Math.abs(analysis?.sales_growth || 0), 100)}%`,
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="bg-cyan-400 h-4 rounded-full"
                  />
                </div>
              </div>
              <div>
                <p className="mb-3 text-gray-400">Financial Stability</p>
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{
                      width: `${100 - Math.min(latestBalance?.debt_to_equity * 10 || 0, 100)}%`,
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="bg-purple-400 h-4 rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* PROFIT ANALYSIS */}
          <motion.div
            id="profit"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="bg-[#1e293b]/70 backdrop-blur-xl rounded-3xl p-8 mb-14 border border-gray-800 scroll-mt-8"
          >
            <h2 className="text-3xl font-bold mb-8 text-green-400">
              Revenue vs Net Profit
            </h2>
            <ResponsiveContainer width="100%" height={450}>
              <AreaChart data={data.profit_loss}>
                <defs>
                  <linearGradient id="salesColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="profitColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="year" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "12px",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#06b6d4"
                  fillOpacity={1}
                  fill="url(#salesColor)"
                  strokeWidth={3}
                  name="Revenue"
                />
                <Area
                  type="monotone"
                  dataKey="net_profit"
                  stroke="#22c55e"
                  fillOpacity={1}
                  fill="url(#profitColor)"
                  strokeWidth={3}
                  name="Net Profit"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* CASH FLOW */}
          <motion.div
            id="cashflow"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="bg-[#1e293b]/70 backdrop-blur-xl rounded-3xl p-8 mb-14 border border-gray-800 scroll-mt-8"
          >
            <h2 className="text-3xl font-bold mb-8 text-cyan-400">
              Cash Flow Trend
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data.cashflow}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="year" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "12px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="operating_activity"
                  stroke="#22c55e"
                  strokeWidth={3}
                  name="Operating Activity"
                />
                <Line
                  type="monotone"
                  dataKey="net_cash_flow"
                  stroke="#06b6d4"
                  strokeWidth={3}
                  name="Net Cash Flow"
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* BALANCE SHEET */}
          <motion.div
            id="balance"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="bg-[#1e293b]/70 backdrop-blur-xl rounded-3xl p-8 mb-14 border border-gray-800 scroll-mt-8"
          >
            <h2 className="text-3xl font-bold mb-8 text-purple-400">
              Balance Sheet Overview
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={data.balance_sheet}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="id" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "12px",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="total_assets"
                  fill="#06b6d4"
                  name="Total Assets"
                />
                <Bar
                  dataKey="total_liabilities"
                  fill="#ef4444"
                  name="Total Liabilities"
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* FINANCIAL RATIOS */}
          <motion.div
            id="ratios"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="bg-[#1e293b]/70 backdrop-blur-xl rounded-3xl p-8 border border-gray-800 scroll-mt-8"
          >
            <h2 className="text-3xl font-bold mb-8 text-yellow-400">
              Financial Ratios
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700 text-gray-400">
                    <th className="text-left py-4">Metric</th>
                    <th className="text-left py-4">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-800">
                    <td className="py-4">EPS</td>
                    <td className="py-4 text-cyan-400">
                      {latestProfit?.eps?.toFixed(2)}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-4">OPM %</td>
                    <td className="py-4 text-green-400">
                      {latestProfit?.opm_percentage?.toFixed(2)}%
                    </td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-4">Net Profit</td>
                    <td className="py-4 text-yellow-400">
                      ₹ {latestProfit?.net_profit}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-4">Debt To Equity</td>
                    <td className="py-4 text-red-400">
                      {latestBalance?.debt_to_equity?.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default CompanyDashboard;
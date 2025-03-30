import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Calendar, DollarSign, Users, TrendingUp, Filter, Download, ChevronDown, ArrowUpRight, ArrowDownRight, Package, ShoppingCart, Activity, Target, Box, ShoppingBag, Clock, Sun, Moon, Bell, Search, Settings } from 'lucide-react';

// Mock data for different periods
const allData = {
  'Today': [
    { month: 'Morning', revenue: 15000, orders: 80, customers: 60 },
    { month: 'Afternoon', revenue: 22000, orders: 100, customers: 85 },
    { month: 'Evening', revenue: 18000, orders: 90, customers: 75 },
  ],
  'This Week': [
    { month: 'Mon', revenue: 25000, orders: 120, customers: 100 },
    { month: 'Tue', revenue: 32000, orders: 140, customers: 120 },
    { month: 'Wed', revenue: 28000, orders: 130, customers: 110 },
    { month: 'Thu', revenue: 35000, orders: 150, customers: 130 },
    { month: 'Fri', revenue: 30000, orders: 140, customers: 120 },
  ],
  'This Month': [
    { month: 'Week 1', revenue: 45000, orders: 220, customers: 180 },
    { month: 'Week 2', revenue: 52000, orders: 240, customers: 200 },
    { month: 'Week 3', revenue: 48000, orders: 230, customers: 190 },
    { month: 'Week 4', revenue: 61000, orders: 280, customers: 250 },
  ],
  'This Quarter': [
    { month: 'Jan', revenue: 145000, orders: 720, customers: 580 },
    { month: 'Feb', revenue: 152000, orders: 740, customers: 600 },
    { month: 'Mar', revenue: 148000, orders: 730, customers: 590 },
  ],
  'This Year': [
    { month: 'Q1', revenue: 445000, orders: 2220, customers: 1800 },
    { month: 'Q2', revenue: 552000, orders: 2440, customers: 2000 },
    { month: 'Q3', revenue: 448000, orders: 2230, customers: 1900 },
    { month: 'Q4', revenue: 661000, orders: 2880, customers: 2500 },
  ],
};

const salesByCategory = [
  { name: 'Electronics', value: 35, growth: 12.5, icon: Package },
  { name: 'Clothing', value: 25, growth: 8.3, icon: ShoppingBag },
  { name: 'Food', value: 20, growth: -2.1, icon: Box },
  { name: 'Books', value: 20, growth: 15.7, icon: Package },
];

const orderStatuses = [
  { name: 'Completed', value: 'completed', color: 'text-green-400', bgColor: 'bg-green-400/10' },
  { name: 'Pending', value: 'pending', color: 'text-yellow-400', bgColor: 'bg-yellow-400/10' },
  { name: 'Cancelled', value: 'cancelled', color: 'text-red-400', bgColor: 'bg-red-400/10' },
];

const COLORS = ['#9333ea', '#a855f7', '#c084fc', '#d8b4fe'];

function App() {
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [revenueData, setRevenueData] = useState(allData[selectedPeriod]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);

  const periods = ['Today', 'This Week', 'This Month', 'This Quarter', 'This Year'];
  const metrics = ['revenue', 'orders', 'customers'];

  useEffect(() => {
    setRevenueData(allData[selectedPeriod]);
  }, [selectedPeriod]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const totalRevenue = revenueData.reduce((acc, curr) => acc + curr.revenue, 0);
  const totalOrders = revenueData.reduce((acc, curr) => acc + curr.orders, 0);
  const totalCustomers = revenueData.reduce((acc, curr) => acc + curr.customers, 0);
  const averageOrderValue = totalRevenue / totalOrders;
  const customerRetentionRate = 78.5;

  const getMetricData = () => {
    let filteredData = [...revenueData];
    
    if (selectedCategory !== 'all') {
      filteredData = filteredData.map(item => ({
        ...item,
        revenue: item.revenue * (salesByCategory.find(cat => cat.name === selectedCategory)?.value || 100) / 100,
        orders: Math.floor(item.orders * (salesByCategory.find(cat => cat.name === selectedCategory)?.value || 100) / 100),
        customers: Math.floor(item.customers * (salesByCategory.find(cat => cat.name === selectedCategory)?.value || 100) / 100),
      }));
    }

    return filteredData.map(item => ({
      month: item.month,
      value: item[selectedMetric],
    }));
  };

  const getMetricColor = (metric) => {
    switch(metric) {
      case 'revenue': return '#9333ea';
      case 'orders': return '#06b6d4';
      case 'customers': return '#10b981';
      default: return '#9333ea';
    }
  };

  const SelectBox = ({ label, value, options, onChange, icon: Icon }) => (
    <div className="relative">
      <label className="block text-sm font-medium text-purple-600 dark:text-purple-200 mb-2">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className="w-full bg-light-700 dark:bg-dark-700 border border-light-600 dark:border-dark-600 text-gray-800 dark:text-purple-100 rounded-lg py-2.5 pl-10 pr-8 appearance-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 cursor-pointer hover:bg-light-600 dark:hover:bg-dark-600"
        >
          {options.map((option) => (
            <option
              key={option.value || option}
              value={option.value || option}
              className="py-2 bg-light-700 dark:bg-dark-700 hover:bg-light-600 dark:hover:bg-dark-600 cursor-pointer"
            >
              {option.name || option}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-purple-400" />
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <ChevronDown className="h-4 w-4 text-purple-400" />
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen bg-light-900 dark:bg-dark-900 text-gray-800 dark:text-gray-100 transition-colors duration-200`}>
      {/* Header */}
      <header className="bg-light-800 dark:bg-dark-800 border-b border-light-600 dark:border-dark-700 sticky top-0 z-50">
        <div className="max-w-[95rem] mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <Activity className="w-8 h-8 text-purple-600 dark:text-purple-400 mr-3" />
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-purple-100">Sales Dashboard</h1>
              </div>
              
            </div>
            <div className="flex items-center space-x-4">
              
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg bg-light-700 dark:bg-dark-700 text-purple-600 dark:text-purple-400 hover:bg-light-600 dark:hover:bg-dark-600 transition-all duration-200 border border-light-600 dark:border-dark-600 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.1)] focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-purple-200 bg-light-700 dark:bg-dark-700 rounded-lg hover:bg-light-600 dark:hover:bg-dark-600 transition-all duration-200 border border-light-600 dark:border-dark-600 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.1)] focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </button>
              <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-purple-200 bg-light-700 dark:bg-dark-700 rounded-lg hover:bg-light-600 dark:hover:bg-dark-600 transition-all duration-200 border border-light-600 dark:border-dark-600 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.1)] focus:outline-none focus:ring-2 focus:ring-purple-500/20">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
              
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[95rem] mx-auto px-4 py-8">
        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-light-800 dark:bg-dark-800 rounded-lg border border-light-600 dark:border-dark-700 mb-8 overflow-hidden shadow-lg"
            >
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-purple-100 mb-6">Filters</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <SelectBox
                    label="Metric"
                    value={selectedMetric}
                    onChange={(e) => setSelectedMetric(e.target.value)}
                    options={[
                      { value: 'revenue', name: 'Revenue' },
                      { value: 'orders', name: 'Orders' },
                      { value: 'customers', name: 'Customers' },
                    ]}
                    icon={TrendingUp}
                  />
                  <SelectBox
                    label="Category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    options={[
                      { value: 'all', name: 'All Categories' },
                      ...salesByCategory.map(cat => ({ value: cat.name, name: cat.name }))
                    ]}
                    icon={Package}
                  />
                  <SelectBox
                    label="Status"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    options={[
                      { value: 'all', name: 'All Status' },
                      ...orderStatuses.map(status => ({ value: status.value, name: status.name }))
                    ]}
                    icon={Clock}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Period Selector */}
        <div className="mb-8 relative">
          <button 
            onClick={() => setShowPeriodDropdown(!showPeriodDropdown)}
            className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-purple-200 bg-light-800 dark:bg-dark-800 rounded-lg border border-light-600 dark:border-dark-700 hover:bg-light-700 dark:hover:bg-dark-700 transition-all duration-200 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.1)] focus:outline-none focus:ring-2 focus:ring-purple-500/20"
          >
            <Calendar className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" />
            {selectedPeriod}
            <ChevronDown className="w-4 h-4 ml-2 text-purple-600 dark:text-purple-400" />
          </button>
          
          <AnimatePresence>
            {showPeriodDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full mt-2 w-48 bg-light-800 dark:bg-dark-800 rounded-lg shadow-lg z-10 border border-light-600 dark:border-dark-700 overflow-hidden"
              >
                {periods.map((period) => (
                  <button
                    key={period}
                    onClick={() => {
                      setSelectedPeriod(period);
                      setShowPeriodDropdown(false);
                    }}
                    className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-purple-200 hover:bg-light-700 dark:hover:bg-dark-700 hover:text-gray-900 dark:hover:text-purple-100 transition-colors duration-150 border-b border-light-600 dark:border-dark-700 last:border-0"
                  >
                    {period}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-light-800 dark:bg-dark-800 p-6 rounded-lg border border-light-600 dark:border-dark-700 hover:border-purple-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-md">
                <DollarSign className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="flex items-center text-green-600 dark:text-green-400 text-sm font-medium">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                12.5%
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-600 dark:text-purple-200">Total Revenue</p>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-purple-100">${totalRevenue.toLocaleString()}</h2>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-light-800 dark:bg-dark-800 p-6 rounded-lg border border-light-600 dark:border-dark-700 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 bg-cyan-100 dark:bg-cyan-900/50 rounded-md">
                <ShoppingCart className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
              </div>
              <span className="flex items-center text-green-600 dark:text-green-400 text-sm font-medium">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                8.3%
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-600 dark:text-purple-200">Total Orders</p>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-purple-100">{totalOrders.toLocaleString()}</h2>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-light-800 dark:bg-dark-800 p-6 rounded-lg border border-light-600 dark:border-dark-700 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-md">
                <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="flex items-center text-red-600 dark:text-red-400 text-sm font-medium">
                <ArrowDownRight className="w-4 h-4 mr-1" />
                2.1%
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-600 dark:text-purple-200">Total Customers</p>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-purple-100">{totalCustomers.toLocaleString()}</h2>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-light-800 dark:bg-dark-800 p-6 rounded-lg border border-light-600 dark:border-dark-700 hover:border-purple-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-md">
                <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="flex items-center text-green-600 dark:text-green-400 text-sm font-medium">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                15.7%
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-600 dark:text-purple-200">Avg. Order Value</p>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-purple-100">${averageOrderValue.toFixed(2)}</h2>
            </div>
          </motion.div>
        </div>

        {/* Main Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-light-800 dark:bg-dark-800 p-6 rounded-lg border border-light-600 dark:border-dark-700 hover:border-purple-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-purple-100">Performance Overview</h3>
            <div className="flex space-x-2">
              {metrics.map((metric) => (
                <button
                  key={metric}
                  onClick={() => setSelectedMetric(metric)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-all duration-200 ${
                    selectedMetric === metric
                      ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-900 dark:text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                      : 'text-gray-600 dark:text-purple-300 hover:bg-light-700 dark:hover:bg-dark-700'
                  }`}
                >
                  {metric}
                </button>
              ))}
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={getMetricData()}>
                <defs>
                  <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={getMetricColor(selectedMetric)} stopOpacity={0.2}/>
                    <stop offset="95%" stopColor={getMetricColor(selectedMetric)} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#334155" : "#e2e8f0"} vertical={false} />
                <XAxis dataKey="month" stroke={isDarkMode ? "#94a3b8" : "#64748b"} />
                <YAxis stroke={isDarkMode ? "#94a3b8" : "#64748b"} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkMode ? '#1E293B' : '#ffffff',
                    border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
                    borderRadius: '0.375rem',
                    color: isDarkMode ? '#E2E8F0' : '#1E293B',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={getMetricColor(selectedMetric)}
                  fillOpacity={1}
                  fill="url(#colorMetric)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Category Performance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-light-800 dark:bg-dark-800 p-6 rounded-lg border border-light-600 dark:border-dark-700 hover:border-purple-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]"
          >
            <h3 className="text-lg font-medium text-gray-900 dark:text-purple-100 mb-6">Category Performance</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={salesByCategory}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {salesByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDarkMode ? '#1E293B' : '#ffffff',
                        border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
                        borderRadius: '0.375rem',
                        color: isDarkMode ? '#E2E8F0' : '#1E293B',
                      }}
                      itemStyle={{
                        color: isDarkMode ? '#E2E8F0' : '#1E293B',
                      }}
                      labelStyle={{
                        color: isDarkMode ? '#E2E8F0' : '#1E293B',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                {salesByCategory.map((category, index) => (
                  <div key={category.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-light-700 dark:hover:bg-dark-700/50 transition-colors duration-200">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index] }} />
                      <span className="text-sm font-medium text-gray-600 dark:text-purple-200">{category.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900 dark:text-purple-100 mr-2">{category.value}%</span>
                      <span className={`text-xs font-medium ${category.growth >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {category.growth >= 0 ? '+' : ''}{category.growth}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Customer Insights */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-light-800 dark:bg-dark-800 p-6 rounded-lg border border-light-600 dark:border-dark-700 hover:border-purple-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]"
          >
            <h3 className="text-lg font-medium text-gray-900 dark:text-purple-100 mb-6">Customer Insights</h3>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-purple-200">Customer Retention Rate</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-purple-100">{customerRetentionRate}%</span>
                </div>
                <div className="w-full bg-light-700 dark:bg-dark-700 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: `${customerRetentionRate}%` }}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-radial from-purple-100 to-light-800 dark:from-purple-900/50 dark:to-dark-800 rounded-lg p-4 border border-light-600 dark:border-dark-700">
                  <p className="text-sm font-medium text-gray-600 dark:text-purple-200 mb-1">Avg. Purchase Frequency</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-purple-100">2.8x</p>
                  <p className="text-xs text-gray-500 dark:text-purple-300 mt-1">per month</p>
                </div>
                <div className="bg-gradient-radial from-purple-100 to-light-800 dark:from-purple-900/50 dark:to-dark-800 rounded-lg p-4 border border-light-600 dark:border-dark-700">
                  <p className="text-sm font-medium text-gray-600 dark:text-purple-200 mb-1">Customer Lifetime Value</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-purple-100">$1,250</p>
                  <p className="text-xs text-gray-500 dark:text-purple-300 mt-1">per customer</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-purple-100 mb-3">Top Customer Segments</h4>
                <div className="space-y-2">
                  {[
                    { name: 'Premium Members', value: 45, growth: 12 },
                    { name: 'Regular Buyers', value: 30, growth: 8 },
                    { name: 'Occasional Shoppers', value: 25, growth: -3 },
                  ].map((segment) => (
                    <div key={segment.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-light-700 dark:hover:bg-dark-700/50 transition-colors duration-200">
                      <span className="text-sm text-gray-600 dark:text-purple-200">{segment.name}</span>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900 dark:text-purple-100 mr-2">{segment.value}%</span>
                        <span className={`text-xs font-medium ${segment.growth >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {segment.growth >= 0 ? '+' : ''}{segment.growth}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default App;
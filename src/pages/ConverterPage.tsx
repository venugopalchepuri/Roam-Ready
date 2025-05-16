import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight, DollarSign, RefreshCw } from 'lucide-react';
import { currencies } from '../data/currencies';


const ConverterPage: React.FC = () => {
  const [amount, setAmount] = useState<string>('1000');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('INR');
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const switchCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const convert = () => {
    setIsLoading(true);
    
    // Get the exchange rates from our mock data
    const fromRate = currencies.find((c) => c.code === fromCurrency)?.rate || 1;
    const toRate = currencies.find((c) => c.code === toCurrency)?.rate || 1;
    
    // Convert the amount (simulate API delay)
    setTimeout(() => {
      const result = (parseFloat(amount) / fromRate) * toRate;
      setConvertedAmount(result);
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (amount && !isNaN(parseFloat(amount))) {
      convert();
    }
  }, [fromCurrency, toCurrency, amount]);

  const formatAmount = (value: number): string => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(value);
  };

  const fromCurrencyDetails = currencies.find((c) => c.code === fromCurrency);
  const toCurrencyDetails = currencies.find((c) => c.code === toCurrency);

  return (
    <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Currency Converter</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Easily convert between different currencies with our simple calculator.
            Perfect for planning your travel budget!
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
                <div className="lg:col-span-2">
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Amount
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter amount"
                    />
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <label htmlFor="fromCurrency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    From
                  </label>
                  <select
                    id="fromCurrency"
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    className="block w-full py-3 px-4 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {currencies.map((currency) => (
                      <option key={currency.code} value={currency.code}>
                        {currency.flag} {currency.code} - {currency.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={switchCurrencies}
                    className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    aria-label="Switch currencies"
                  >
                    <ArrowLeftRight size={20} className="text-gray-600 dark:text-gray-300" />
                  </button>
                </div>

                <div className="lg:col-span-1">
                  <label htmlFor="toCurrency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    To
                  </label>
                  <select
                    id="toCurrency"
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    className="block w-full py-3 px-4 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {currencies.map((currency) => (
                      <option key={currency.code} value={currency.code}>
                        {currency.flag} {currency.code} - {currency.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div className="text-center">
                  {isLoading ? (
                    <div className="flex justify-center items-center py-4">
                      <RefreshCw size={24} className="animate-spin text-primary-600 dark:text-primary-400" />
                    </div>
                  ) : (
                    <>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {amount} {fromCurrencyDetails?.code} equals
                      </div>
                      <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        {toCurrencyDetails?.symbol}{formatAmount(convertedAmount)}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        1 {fromCurrencyDetails?.code} = {toCurrencyDetails?.symbol}
                        {formatAmount((1 / (fromCurrencyDetails?.rate || 1)) * (toCurrencyDetails?.rate || 1))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Currency Exchange Tips</h2>
              
              <div className="space-y-4">
                <div className="flex space-x-3">
                  <div className="bg-primary-100 dark:bg-primary-900 rounded-full p-2 h-min">
                    <DollarSign size={18} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Best Time to Exchange</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Monitor exchange rates a few weeks before your trip to find the best rates. 
                      Rates can fluctuate daily.
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <div className="bg-primary-100 dark:bg-primary-900 rounded-full p-2 h-min">
                    <DollarSign size={18} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Avoid Airport Exchanges</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Airport currency exchange services typically offer less favorable rates. 
                      Try to exchange your money at banks or authorized exchange services in the city.
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <div className="bg-primary-100 dark:bg-primary-900 rounded-full p-2 h-min">
                    <DollarSign size={18} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Use Local Currency</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      In most places, paying in local currency is more economical than using your home currency. 
                      When given the choice, always opt for local currency transactions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ConverterPage;
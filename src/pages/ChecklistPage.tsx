import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Plus, Trash } from 'lucide-react';
import { checklistCategories } from '../data/checklist';

interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

interface ChecklistCategory {
  id: string;
  name: string;
  emoji: string;
  items: ChecklistItem[];
}

const ChecklistPage: React.FC = () => {
  const [categories, setCategories] = useState<ChecklistCategory[]>(() => {
    const savedChecklist = localStorage.getItem('checklist');
    return savedChecklist ? JSON.parse(savedChecklist) : checklistCategories;
  });
  
  const [newItemText, setNewItemText] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id || '');

  useEffect(() => {
    localStorage.setItem('checklist', JSON.stringify(categories));
  }, [categories]);

  const toggleItem = (categoryId: string, itemId: string) => {
    setCategories(prevCategories =>
      prevCategories.map(category =>
        category.id === categoryId
          ? {
              ...category,
              items: category.items.map(item =>
                item.id === itemId
                  ? { ...item, checked: !item.checked }
                  : item
              )
            }
          : category
      )
    );
  };

  const addNewItem = (categoryId: string) => {
    if (newItemText.trim() === '') return;
    
    const newItem: ChecklistItem = {
      id: Date.now().toString(),
      text: newItemText.trim(),
      checked: false
    };
    
    setCategories(prevCategories =>
      prevCategories.map(category =>
        category.id === categoryId
          ? { ...category, items: [...category.items, newItem] }
          : category
      )
    );
    
    setNewItemText('');
  };

  const removeItem = (categoryId: string, itemId: string) => {
    setCategories(prevCategories =>
      prevCategories.map(category =>
        category.id === categoryId
          ? {
              ...category,
              items: category.items.filter(item => item.id !== itemId)
            }
          : category
      )
    );
  };

  const resetChecklist = () => {
    if (window.confirm('Are you sure you want to reset your checklist? All checked items will be unchecked.')) {
      setCategories(prevCategories =>
        prevCategories.map(category => ({
          ...category,
          items: category.items.map(item => ({ ...item, checked: false }))
        }))
      );
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Packing Checklist</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Stay organized with our comprehensive packing checklist. Add your own items and never forget essentials again!
          </p>
        </motion.div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Category Sidebar */}
            <div className="md:w-1/4 bg-gray-50 dark:bg-gray-900 p-4 border-r border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Categories</h2>
                <button
                  onClick={resetChecklist}
                  className="text-xs px-2 py-1 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                >
                  Reset All
                </button>
              </div>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-colors ${
                      activeCategory === category.id
                        ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <span role="img" aria-label={category.name} className="text-xl">
                      {category.emoji}
                    </span>
                    <span className="font-medium">{category.name}</span>
                    <span className="ml-auto bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs rounded-full px-2 py-1">
                      {category.items.filter(item => item.checked).length}/{category.items.length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Items List */}
            <div className="md:w-3/4 p-6">
              {categories.map(category => (
                <div
                  key={category.id}
                  className={`${activeCategory === category.id ? 'block' : 'hidden'}`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold flex items-center">
                      <span role="img" aria-label={category.name} className="mr-2">
                        {category.emoji}
                      </span>
                      {category.name}
                    </h2>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {category.items.filter(item => item.checked).length}/{category.items.length} items packed
                    </div>
                  </div>

                  <div className="flex items-center mb-6">
                    <input
                      type="text"
                      value={newItemText}
                      onChange={(e) => setNewItemText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addNewItem(category.id)}
                      placeholder="Add a new item..."
                      className="flex-grow border border-gray-300 dark:border-gray-600 rounded-l-lg px-4 py-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <button
                      onClick={() => addNewItem(category.id)}
                      className="bg-primary-600 text-white px-4 py-2 rounded-r-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      <Plus size={20} />
                    </button>
                  </div>

                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-2"
                  >
                    {category.items.length === 0 ? (
                      <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                        No items in this category. Add some items to get started!
                      </p>
                    ) : (
                      category.items.map(item => (
                        <motion.div
                          key={item.id}
                          variants={itemVariants}
                          className={`flex items-center p-3 border rounded-lg transition-colors ${
                            item.checked
                              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900'
                              : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                          }`}
                        >
                          <button
                            onClick={() => toggleItem(category.id, item.id)}
                            className={`w-6 h-6 flex items-center justify-center rounded-md border mr-3 transition-colors ${
                              item.checked
                                ? 'bg-green-500 border-green-500 text-white'
                                : 'border-gray-300 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-500'
                            }`}
                          >
                            {item.checked && <Check size={16} />}
                          </button>
                          <span className={`flex-grow ${item.checked ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}>
                            {item.text}
                          </span>
                          <button
                            onClick={() => removeItem(category.id, item.id)}
                            className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                          >
                            <Trash size={16} />
                          </button>
                        </motion.div>
                      ))
                    )}
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Your checklist is automatically saved in your browser's local storage.</p>
        </div>
      </div>
    </div>
  );
};

export default ChecklistPage;
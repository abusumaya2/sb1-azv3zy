import React, { useState } from 'react';
import { Bell, Home, Menu, PlusSquare, Search, UserIcon, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import type { User } from '../types';

interface HeaderProps {
  currentUser: User;
}

export default function Header({ currentUser }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
          СоцСеть
        </div>
        
        {/* Desktop Search */}
        <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Поиск..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 focus:outline-none focus:border-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Points Display */}
        <div className="hidden md:flex items-center mr-6">
          <span className="text-purple-500 font-semibold">
            {currentUser.points} поинтов
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Home className="h-6 w-6 text-gray-700 dark:text-gray-300 hover:text-blue-500 cursor-pointer" title="Главная" />
          <PlusSquare className="h-6 w-6 text-gray-700 dark:text-gray-300 hover:text-blue-500 cursor-pointer" title="Создать" />
          <Bell className="h-6 w-6 text-gray-700 dark:text-gray-300 hover:text-blue-500 cursor-pointer" title="Уведомления" />
          <UserIcon className="h-6 w-6 text-gray-700 dark:text-gray-300 hover:text-blue-500 cursor-pointer" title="Профиль" />
          <ThemeToggle />
        </nav>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center space-x-4">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
          >
            <Search className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="md:hidden px-4 py-2 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="relative">
            <input
              type="text"
              placeholder="Поиск..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 focus:outline-none focus:border-blue-500"
              autoFocus
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden fixed inset-0 top-16 bg-white dark:bg-gray-900 z-40">
          <div className="p-4 space-y-4">
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <span className="text-purple-500 font-semibold">
                {currentUser.points} поинтов
              </span>
            </div>
            <a className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              <Home className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              <span className="text-gray-700 dark:text-gray-300">Главная</span>
            </a>
            <a className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              <PlusSquare className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              <span className="text-gray-700 dark:text-gray-300">Создать</span>
            </a>
            <a className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              <Bell className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              <span className="text-gray-700 dark:text-gray-300">Уведомления</span>
            </a>
            <a className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              <UserIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              <span className="text-gray-700 dark:text-gray-300">Профиль</span>
            </a>
            <div className="p-3">
              <ThemeToggle />
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
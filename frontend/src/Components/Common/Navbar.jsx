import React, { useState } from 'react';
import { Search, User, Heart, ShoppingCart, X, Menu } from 'lucide-react';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div>
            <header className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">SN</span>
                            </div>
                            <span className="text-xl font-bold text-rose-700">StyleNest</span>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center space-x-8">
                            <a href="#" className="text-rose-700 hover:text-rose-900 transition-colors font-medium">New Arrivals</a>
                            <a href="#" className="text-rose-700 hover:text-rose-900 transition-colors font-medium">Women</a>
                            <a href="#" className="text-rose-700 hover:text-rose-900 transition-colors font-medium">Men</a>
                            <a href="#" className="text-rose-700 hover:text-rose-900 transition-colors font-medium">Kids</a>
                            <a href="#" className="text-rose-700 hover:text-rose-900 transition-colors font-medium">Accessories</a>
                            <a href="#" className="text-red-600 hover:text-red-700 transition-colors font-medium">Sale</a>
                        </nav>

                        {/* Actions */}
                        <div className="flex items-center space-x-3">
                            <Search className="w-5 h-5 text-rose-600 cursor-pointer hover:text-rose-800 transition-colors hidden sm:block" />
                            <User className="w-5 h-5 text-rose-600 cursor-pointer hover:text-rose-800 transition-colors hidden sm:block" />
                            <Heart className="w-5 h-5 text-rose-600 cursor-pointer hover:text-rose-800 transition-colors" />
                            <div className="relative">
                                <ShoppingCart className="w-5 h-5 text-rose-600 cursor-pointer hover:text-rose-800 transition-colors" />
                                <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
                            </div>
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="lg:hidden"
                            >
                                {isMobileMenuOpen ? (
                                    <X className="w-5 h-5 text-rose-600" />
                                ) : (
                                    <Menu className="w-5 h-5 text-rose-600" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {isMobileMenuOpen && (
                        <div className="lg:hidden mt-4 pb-4 border-t border-gray-100">
                            <nav className="flex flex-col space-y-4 pt-4">
                                <a href="#" className="text-rose-700 hover:text-rose-900 transition-colors font-medium">New Arrivals</a>
                                <a href="#" className="text-rose-700 hover:text-rose-900 transition-colors font-medium">Women</a>
                                <a href="#" className="text-rose-700 hover:text-rose-900 transition-colors font-medium">Men</a>
                                <a href="#" className="text-rose-700 hover:text-rose-900 transition-colors font-medium">Kids</a>
                                <a href="#" className="text-rose-700 hover:text-rose-900 transition-colors font-medium">Accessories</a>
                                <a href="#" className="text-red-600 hover:text-red-700 transition-colors font-medium">Sale</a>
                                <div className="flex items-center space-x-4 pt-2">
                                    <Search className="w-5 h-5 text-rose-600 cursor-pointer hover:text-rose-800 transition-colors" />
                                    <User className="w-5 h-5 text-rose-600 cursor-pointer hover:text-rose-800 transition-colors" />
                                </div>
                            </nav>
                        </div>
                    )}
                </div>
            </header>
        </div>
    );
};

export default Navbar;

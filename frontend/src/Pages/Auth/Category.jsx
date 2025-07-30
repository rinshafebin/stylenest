import React from 'react'

const Category = () => {
    return (
        <div>
            {/* Category Sections */}
            <section className="py-12 sm:py-16 lg:py-20 bg-rose-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12 lg:mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-pink-700 mb-4">Shop by Category</h2>
                        <p className="text-lg sm:text-xl text-pink-500 max-w-2xl mx-auto">
                            Curated collections for every style and every member of your family
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {/* Women Section */}
                        <div className="group cursor-pointer">
                            <div className="relative overflow-hidden rounded-2xl mb-4 h-80 sm:h-96">
                                <div className="absolute inset-0 bg-gradient-to-br from-rose-200 to-pink-300 group-hover:scale-105 transition-transform duration-500"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center text-pink-500">
                                        <div className="w-16 h-16 bg-pink-400 rounded-full mx-auto mb-4"></div>
                                        <p className="text-sm font-medium">Women's Collection</p>
                                    </div>
                                </div>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <h3 className="text-2xl font-bold text-pink-800 mb-2">Women</h3>
                                    <p className="text-pink-600 text-sm mb-4">Elegant & Modern Styles</p>
                                    <button className="bg-white/90 backdrop-blur-sm text-pink-800 px-6 py-2 rounded-lg font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                                        Shop Women
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Men Section */}
                        <div className="group cursor-pointer">
                            <div className="relative overflow-hidden rounded-2xl mb-4 h-80 sm:h-96">
                                <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-rose-300 group-hover:scale-105 transition-transform duration-500"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center text-rose-500">
                                        <div className="w-16 h-16 bg-rose-400 rounded-full mx-auto mb-4"></div>
                                        <p className="text-sm font-medium">Men's Collection</p>
                                    </div>
                                </div>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <h3 className="text-2xl font-bold text-pink-800 mb-2">Men</h3>
                                    <p className="text-pink-600 text-sm mb-4">Sophisticated & Sharp</p>
                                    <button className="bg-white/90 backdrop-blur-sm text-pink-800 px-6 py-2 rounded-lg font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                                        Shop Men
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Kids Section */}
                        <div className="group cursor-pointer sm:col-span-2 lg:col-span-1">
                            <div className="relative overflow-hidden rounded-2xl mb-4 h-80 sm:h-96">
                                <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-rose-200 group-hover:scale-105 transition-transform duration-500"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center text-pink-400">
                                        <div className="w-16 h-16 bg-pink-300 rounded-full mx-auto mb-4"></div>
                                        <p className="text-sm font-medium">Kids Collection</p>
                                    </div>
                                </div>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <h3 className="text-2xl font-bold text-pink-800 mb-2">Kids</h3>
                                    <p className="text-pink-600 text-sm mb-4">Fun & Comfortable</p>
                                    <button className="bg-white/90 backdrop-blur-sm text-pink-800 px-6 py-2 rounded-lg font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                                        Shop Kids
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-12 sm:py-16 bg-rose-100">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        <div className="text-center group">
                            <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r from-pink-600 to-pink-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <Truck className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-pink-700">Free Shipping</h3>
                            <p className="text-pink-600 text-sm sm:text-base">Free shipping on all orders over $50. No hidden fees.</p>
                        </div>
                        <div className="text-center group">
                            <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r from-pink-600 to-pink-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <RotateCcw className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-pink-700">Easy Returns</h3>
                            <p className="text-pink-600 text-sm sm:text-base">30-day return policy. No questions asked.</p>
                        </div>
                        <div className="text-center group sm:col-span-2 lg:col-span-1">
                            <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r from-pink-600 to-pink-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <Shield className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-pink-700">Secure Payment</h3>
                            <p className="text-pink-600 text-sm sm:text-base">Your payment information is always protected.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-12 sm:py-16 lg:py-20 bg-rose-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12 lg:mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-pink-700 mb-4">Featured Products</h2>
                        <p className="text-lg sm:text-xl text-pink-500 max-w-2xl mx-auto">
                            Handpicked items from our latest collection. Quality meets style in every piece.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="group cursor-pointer">
                                <div className="relative overflow-hidden rounded-2xl mb-4">
                                    <div className="aspect-[3/4] bg-gradient-to-br from-rose-100 to-pink-200 group-hover:scale-105 transition-transform duration-500"></div>
                                    <div className="absolute top-4 right-4">
                                        <Heart className="w-5 sm:w-6 h-5 sm:h-6 text-white hover:text-rose-500 transition-colors drop-shadow-lg" />
                                    </div>
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <button className="w-full bg-white/90 backdrop-blur-sm text-pink-800 py-2 sm:py-3 rounded-xl font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 text-sm sm:text-base">
                                            Quick Add
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="font-semibold text-pink-800 text-sm sm:text-base">Premium Cotton Tee</h3>
                                    <div className="flex items-center space-x-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star key={star} className="w-3 sm:w-4 h-3 sm:h-4 fill-rose-400 text-rose-400" />
                                        ))}
                                        <span className="text-xs sm:text-sm text-pink-500 ml-2">(24)</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-lg sm:text-xl font-bold text-pink-800">$39</span>
                                        <span className="text-sm text-pink-400 line-through">$59</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <button className="bg-gradient-to-r from-pink-600 to-pink-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300">
                            View All Products
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Category
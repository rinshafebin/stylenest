import React, { useEffect, useState } from 'react'
import axiosInstance from '../../api/axios'
import ProductGrid from '../../Components/Products/ProductGrid'
import Navbar from '../../Components/Common/Navbar'
import Footer from '../../Components/Common/Footer'

export default function AllProducts() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get('/products/allproducts')
                setProducts(response.data)
            } catch (error) {
                console.log("error fetching products :", error)
            }
        }
        fetchProducts();
    }, [])
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="text-center my-6">
                <h2 className="text-3xl font-bold text-center text-gray-800">
                    <span className="text-black">Our </span>
                    <span className="text-rose-500">Products</span>
                </h2>
                <p className="text-black mt-2 max-w-2xl mx-auto">
                    Discover the latest trends in fashion and lifestyle.
                </p>
            </div>

            <ProductGrid products={products} />
            <Footer/>
        </div>


    );  
}



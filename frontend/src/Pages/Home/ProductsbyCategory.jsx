import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axios";
import ProductGrid from "../../Components/Products/ProductGrid";

export default function CategoryProducts(){
    const { category } = useParams();
    const [product, setProducts] = useState([]);

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            try {
                const response = await axiosInstance.get('products/productbycategory/${category}')
                setProducts(response.data)
            } catch (error) {
                console.log('failed to fetch products:', error)
            }
        }
        fetchCategoryProducts();
    }, [category])

    return (
        <div>
            <h2 className="text-2xl font-bold text-center my-5 capitalize">{category} Collection</h2>
            <ProductGrid products={products} />
        </div>
    )

}
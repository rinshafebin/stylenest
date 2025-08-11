import React, { useState } from "react";
import Sidebar from "../../Components/Admin/Sidebar";
import Header from "../../Components/Admin/Header";
import axiosInstance from '../../api/axios';

export default function AddProduct() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "women",
        stock: "",
        sizes: "",
        details: "",
        image: null
    });

    // Input styles: white background, pink border focus, no blue outline
    const inputClass =
        "w-full rounded-lg px-4 py-2 border border-gray-300 bg-white " +
        "focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-200 placeholder-gray-500";

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData((prev) => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const productData = new FormData();
        Object.keys(formData).forEach((key) => {
            productData.append(key, formData[key]);
        });

        try {
            await axiosInstance.post("/adminside/createproducts/", productData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setMessage("✅ Product added successfully!");
            setFormData({
                name: "",
                description: "",
                price: "",
                category: "women",
                stock: "",
                sizes: "",
                details: "",
                image: null
            });
        } catch (err) {
            console.error(err);
            setMessage("❌ Failed to add product.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <div className="flex flex-1">
                <Sidebar sidebarOpen={sidebarOpen} />
                <div className="flex-1 flex flex-col">
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                    <main className="flex-1 p-6 bg-gray-50">
                        <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md">
                            <h2 className="text-2xl font-bold mb-6">Add New Product</h2>

                            {message && <p className="mb-4">{message}</p>}

                            <form className="space-y-5" onSubmit={handleSubmit}>
                                {[
                                    { label: "Product Name", name: "name", type: "text" },
                                    { label: "Description", name: "description", type: "textarea" },
                                    { label: "Price", name: "price", type: "number" },
                                    { label: "Stock", name: "stock", type: "number" },
                                    { label: "Sizes (comma separated)", name: "sizes", type: "text" },
                                    { label: "Details (comma separated)", name: "details", type: "text" },
                                ].map(({ label, name, type }) => (
                                    <div key={name}>
                                        <label className="block font-medium mb-1">{label}</label>
                                        {type === "textarea" ? (
                                            <textarea
                                                name={name}
                                                value={formData[name]}
                                                onChange={handleChange}
                                                className={inputClass}
                                                rows="3"
                                            />
                                        ) : (
                                            <input
                                                type={type}
                                                name={name}
                                                value={formData[name]}
                                                onChange={handleChange}
                                                className={inputClass}
                                            />
                                        )}
                                    </div>
                                ))}

                                <div>
                                    <label className="block font-medium mb-1">Category</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className={inputClass}
                                    >
                                        <option value="women">Women's Collection</option>
                                        <option value="men">Men's Collection</option>
                                        <option value="kids">Kids Collection</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block font-medium mb-1">Product Image</label>
                                    <input
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleChange}
                                        className={inputClass}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-lg w-full hover:opacity-90"
                                    disabled={loading}
                                >
                                    {loading ? "Adding..." : "Add Product"}
                                </button>
                            </form>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

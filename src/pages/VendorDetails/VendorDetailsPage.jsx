import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

const VendorDetailsPage = () => {

    const [vendors, setVendors] = useState([]);

    const [categories, setCategories] = useState([]);

    const [subcategories, setSubcategories] = useState([]);

    const [loading, setLoading] = useState(false);

    const [hasSearched, setHasSearched] = useState(false);

    const [totalResults, setTotalResults] = useState(0);

    const [page, setPage] = useState(1);

    const limit = 10;


    // FILTER STATES

    const [query, setQuery] = useState("");

    const [city, setCity] = useState("");

    const [category, setCategory] = useState("");

    const [subcategory, setSubcategory] = useState("");

    const [minPrice, setMinPrice] = useState("");

    const [maxPrice, setMaxPrice] = useState("");

    const [pricingType, setPricingType] = useState("");

    const [rating, setRating] = useState("");

    const [available, setAvailable] = useState("");

    const [verified, setVerified] = useState("");

    const [sortBy, setSortBy] = useState("");


    // FETCH CATEGORIES

    const fetchCategories = async () => {

        try {

            const response = await axiosInstance.get(
                "/categories"
            );

            setCategories(
                response.data.categories || []
            );

        }

        catch (error) {

            console.error(error);

        }

    };


    // FETCH SUBCATEGORIES

    const fetchSubcategories = async () => {

        try {

            const response = await axiosInstance.get(
                "/subcategories"
            );

            setSubcategories(
                response.data.subcategories || []
            );

        }

        catch (error) {

            console.error(error);

        }

    };


    useEffect(() => {

        fetchCategories();

        fetchSubcategories();

    }, []);


    // SEARCH

    const fetchVendors = async (

        targetPage = 1

    ) => {

        try {

            setLoading(true);

            setHasSearched(true);

            setPage(targetPage);

            const response = await axiosInstance.get(

                "/vendors/search",

                {

                    params: {

                        query:
                            query || undefined,

                        city:
                            city || undefined,

                        category:
                            category || undefined,

                        subcategory:
                            subcategory || undefined,

                        min_price:
                            minPrice || undefined,

                        max_price:
                            maxPrice || undefined,

                        pricing_type:
                            pricingType || undefined,

                        rating:
                            rating || undefined,

                        available:

                            available === ""

                                ? undefined

                                : available,

                        verified:

                            verified === ""

                                ? undefined

                                : verified,

                        sort_by:
                            sortBy || undefined,

                        page:
                            targetPage,

                        limit

                    }

                }

            );

            setVendors(
                response.data.vendors || []
            );

            setTotalResults(
                response.data.total_results || 0
            );

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };


    // RESET

    const resetFilters = () => {

        setQuery("");

        setCity("");

        setCategory("");

        setSubcategory("");

        setMinPrice("");

        setMaxPrice("");

        setPricingType("");

        setRating("");

        setAvailable("");

        setVerified("");

        setSortBy("");

        setPage(1);

        setHasSearched(false);

        setVendors([]);

        setTotalResults(0);

    };


    const totalPages = Math.ceil(

        totalResults / limit

    );


    return (

        <div className="min-h-screen bg-gray-950 text-white p-10">

            <div className="max-w-7xl mx-auto">

                <h1 className="text-5xl font-bold text-violet-400 mb-8">

                    Vendor Marketplace

                </h1>


                <div className="bg-gray-900 p-8 rounded-2xl mb-10">

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">


                        <div>

                            <label className="block mb-2 text-violet-300">

                                Vendor Name

                            </label>

                            <input

                                value={query}

                                placeholder="Search Vendor"

                                onChange={(e)=>

                                    setQuery(
                                        e.target.value
                                    )

                                }

                                className="w-full bg-gray-800 text-white p-3 rounded-xl"

                            />

                        </div>


                        <div>

                            <label className="block mb-2 text-violet-300">

                                City

                            </label>

                            <input

                                value={city}

                                placeholder="Enter City"

                                onChange={(e)=>

                                    setCity(
                                        e.target.value
                                    )

                                }

                                className="w-full bg-gray-800 text-white p-3 rounded-xl"

                            />

                        </div>


                        <div>

                            <label className="block mb-2 text-violet-300">

                                Category

                            </label>

                            <select

                                value={category}

                                onChange={(e)=>setCategory(e.target.value)}

                                className="w-full bg-gray-800 p-3 rounded-xl"

                            >

                                <option value="">

                                    Select Category

                                </option>

                                {

                                    categories.map(

                                        (item)=>(

                                            <option

                                                key={item.category_id}

                                                value={item.name}

                                            >

                                                {item.name}

                                            </option>

                                        )

                                    )

                                }

                            </select>

                        </div>


                        <div>

                            <label className="block mb-2 text-violet-300">

                                Subcategory

                            </label>

                            <select

                                value={subcategory}

                                onChange={(e)=>setSubcategory(e.target.value)}

                                className="w-full bg-gray-800 p-3 rounded-xl"

                            >

                                <option value="">

                                    Select Subcategory

                                </option>

                                {

                                    subcategories.map(

                                        (item)=>(

                                            <option

                                                key={item.subcategory_id}

                                                value={item.name}

                                            >

                                                {item.name}

                                            </option>

                                        )

                                    )

                                }

                            </select>

                        </div>


                        <div>

                            <label>Min Price</label>

                            <input

                                type="number"

                                value={minPrice}

                                onChange={(e)=>setMinPrice(e.target.value)}

                                className="w-full bg-gray-800 p-3 rounded-xl"

                            />

                        </div>


                        <div>

                            <label>Max Price</label>

                            <input

                                type="number"

                                value={maxPrice}

                                onChange={(e)=>setMaxPrice(e.target.value)}

                                className="w-full bg-gray-800 p-3 rounded-xl"

                            />

                        </div>


                        <div>

                            <label>Pricing Type</label>

                            <select

                                value={pricingType}

                                onChange={(e)=>setPricingType(e.target.value)}

                                className="w-full bg-gray-800 p-3 rounded-xl"

                            >

                                <option value="">Select</option>

                                <option value="fixed">Fixed</option>

                                <option value="hourly">Hourly</option>

                                <option value="package">Package</option>

                                <option value="custom">Custom</option>

                            </select>

                        </div>


                        <div>

                            <label>Rating</label>

                            <select

                                value={rating}

                                onChange={(e)=>setRating(e.target.value)}

                                className="w-full bg-gray-800 p-3 rounded-xl"

                            >

                                <option value="">Select</option>

                                <option value="4">4+</option>

                                <option value="3">3+</option>

                                <option value="2">2+</option>

                            </select>

                        </div>


                        <div>

                            <label>Availability</label>

                            <select

                                value={available}

                                onChange={(e)=>setAvailable(e.target.value)}

                                className="w-full bg-gray-800 p-3 rounded-xl"

                            >

                                <option value="">All</option>

                                <option value="true">Available</option>

                                <option value="false">Unavailable</option>

                            </select>

                        </div>


                        <div>

                            <label>Verification</label>

                            <select

                                value={verified}

                                onChange={(e)=>setVerified(e.target.value)}

                                className="w-full bg-gray-800 p-3 rounded-xl"

                            >

                                <option value="">All</option>

                                <option value="true">Verified</option>

                            </select>

                        </div>


                        <div>

                            <label>Sort</label>

                            <select

                                value={sortBy}

                                onChange={(e)=>setSortBy(e.target.value)}

                                className="w-full bg-gray-800 p-3 rounded-xl"

                            >

                                <option value="">Select</option>

                                <option value="rating">Highest Rating</option>

                                <option value="price_low">Lowest Price</option>

                                <option value="price_high">Highest Price</option>

                                <option value="latest">Latest</option>

                            </select>

                        </div>

                    </div>


                    <div className="flex gap-4 mt-8">

                        <button
                            onClick={()=>fetchVendors()}
                            className="bg-violet-600 px-8 py-3 rounded-xl"
                        >
                            Search
                        </button>

                        <button
                            onClick={resetFilters}
                            className="bg-red-600 px-8 py-3 rounded-xl"
                        >
                            Reset
                        </button>

                    </div>

                </div>


                <h2 className="mb-6">

                    Results: {totalResults}

                </h2>


                {

                    loading ? (

                        <div>

                            Loading Vendors...

                        </div>

                    )

                    :

                    vendors.length > 0 ? (

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                            {

                                vendors.map(

                                    (vendor)=>(

                                        <div
                                            key={vendor.vendor_id}
                                            className="bg-gray-900 border border-violet-500/20 rounded-2xl p-6"
                                        >

                                            <h3 className="text-2xl font-bold text-violet-400 mb-2">

                                                {vendor.name}

                                            </h3>

                                            <p className="text-violet-300 mb-2">

                                                ⭐ {vendor.avg_rating}

                                                {" ("}

                                                {vendor.review_count || 0}

                                                {" reviews)"}

                                            </p>

                                            <p>

                                                📍 {vendor.city}

                                            </p>

                                            <p>

                                                🏠 {vendor.address || "Address unavailable"}

                                            </p>

                                            <p className="text-green-400 font-semibold mt-2">

                                                ₹ {vendor.price_min}

                                                {" - ₹ "}

                                                {vendor.price_max}

                                            </p>

                                            <p className="mt-3 text-gray-300">

                                                {

                                                    vendor.description ||

                                                    "No description available"

                                                }

                                            </p>

                                            <div className="border-t border-gray-700 mt-4 pt-4">

                                                <p>

                                                    📞 {vendor.contact_phone}

                                                </p>

                                                <p>

                                                    📧 {vendor.business_email}

                                                </p>

                                            </div>

                                        </div>

                                    )

                                )

                            }

                        </div>

                    )

                    :

                    (

                        hasSearched && (

                            <div>

                                No Vendors Found

                            </div>

                        )

                    )

                }

            </div>

        </div>

    );

};

export default VendorDetailsPage;
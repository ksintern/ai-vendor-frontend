import {
    useEffect,
    useState
} from "react";

import axiosInstance from "../../api/axiosInstance";

import useAuth from "../../hooks/useAuth";

import Input from "../../components/common/Input/Input";


const VendorPage = () => {

    const { user } = useAuth();

    const [categories, setCategories] = useState([]);

    const [subcategories, setSubcategories] = useState([]);

    const [loading, setLoading] = useState(false);

    const [successMessage, setSuccessMessage] = useState("");

    const [errorMessage, setErrorMessage] = useState("");


    const [formData, setFormData] = useState({

        name: "",

        slug: "",

        description: "",

        category_id: "",

        subcategory_id: "",

        city: "",

        address: "",

        business_email: "",

        contact_phone: "",

        price_min: "",

        price_max: "",

        is_available: true

    });


    const fetchVendorProfile = async () => {

        try {

            const response = await axiosInstance.get(

                "/vendors/profile"

            );

            const vendor = response.data.vendor;

            setFormData({

                name: vendor.name || "",

                slug: vendor.slug || "",

                description: vendor.description || "",

                category_id:

                    vendor.category_id || "",

                subcategory_id:

                    vendor.subcategory_id || "",

                city: vendor.city || "",

                address: vendor.address || "",

                business_email:

                    vendor.business_email || "",

                contact_phone:

                    vendor.contact_phone || "",

                price_min:

                    vendor.price_min || "",

                price_max:

                    vendor.price_max || "",

                is_available:

                    vendor.is_available

            });

        }

        catch (error) {

            console.error(error);

        }

    };


    const fetchCategories = async () => {

        try {

            const response = await axiosInstance.get(

                "/categories"

            );

            setCategories(

                response.data.categories

            );

        }

        catch (error) {

            console.error(error);

        }

    };


    const fetchSubcategories = async (

        categoryId

    ) => {

        try {

            const response = await axiosInstance.get(

                `/subcategories/category/${categoryId}`

            );

            setSubcategories(

                response.data.subcategories

            );

        }

        catch (error) {

            console.error(error);

        }

    };


    useEffect(() => {

        fetchVendorProfile();

        fetchCategories();

    }, []);


    useEffect(() => {

        if (

            formData.category_id

        ) {

            fetchSubcategories(

                formData.category_id

            );

        }

    }, [

        formData.category_id

    ]);


    const handleChange = (

        e

    ) => {

        const {

            name,

            value,

            type,

            checked

        } = e.target;

        setFormData(

            (

                prev

            ) => ({

                ...prev,

                [name]:

                    type === "checkbox"

                    ? checked

                    : value

            })

        );

    };


    const handleSubmit = async (

        e

    ) => {

        e.preventDefault();

        try {

            setLoading(true);

            setSuccessMessage("");

            setErrorMessage("");

            await axiosInstance.put(

                "/vendors/profile",

                formData

            );

            setSuccessMessage(

                "Vendor profile updated successfully"

            );

        }

        catch (error) {

            setErrorMessage(

                error.response?.data?.detail ||

                "Vendor profile update failed"

            );

        }

        finally {

            setLoading(false);

        }

    };


    return (

<div className="min-h-screen bg-gray-950 text-white p-10">

<div className="max-w-6xl mx-auto">


<div className="mb-10">

<h1 className="text-5xl font-bold text-violet-400">

Vendor Marketplace Dashboard

</h1>

<p className="text-gray-400 mt-3">

Complete your marketplace profile

</p>

</div>


{

successMessage && (

<div className="mb-6 p-4 rounded-xl border border-green-500 bg-green-500/10 text-green-300">

{successMessage}

</div>

)

}


{

errorMessage && (

<div className="mb-6 p-4 rounded-xl border border-red-500 bg-red-500/10 text-red-300">

{errorMessage}

</div>

)

}


<form

onSubmit={handleSubmit}

className="bg-gray-900 border border-violet-500/20 rounded-3xl p-8"

>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">


<Input

label="Business Name"

name="name"

placeholder="Enter business name"

value={formData.name}

onChange={handleChange}

/>


<Input

label="Business Slug"

name="slug"

placeholder="business-slug"

value={formData.slug}

onChange={handleChange}

/>


<div>

<label className="block mb-2 text-violet-300">

Category

</label>

<select

name="category_id"

value={formData.category_id}

onChange={handleChange}

className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-4"

>

<option>

Select Category

</option>

{

categories.map(

(category)=>(

<option

key={category.category_id}

value={category.category_id}

>

{category.name}

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

name="subcategory_id"

value={formData.subcategory_id}

onChange={handleChange}

className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-4"

>

<option>

Select Subcategory

</option>

{

subcategories.map(

(subcategory)=>(

<option

key={subcategory.subcategory_id}

value={subcategory.subcategory_id}

>

{subcategory.name}

</option>

)

)

}

</select>

</div>


<Input

label="City"

name="city"

placeholder="Delhi"

value={formData.city}

onChange={handleChange}

/>


<Input

label="Address"

name="address"

placeholder="Address"

value={formData.address}

onChange={handleChange}

/>


<Input

label="Business Email"

name="business_email"

placeholder="business@gmail.com"

value={formData.business_email}

onChange={handleChange}

/>


<Input

label="Contact Number"

name="contact_phone"

placeholder="9876543210"

value={formData.contact_phone}

onChange={handleChange}

/>


<Input

label="Minimum Price"

type="number"

name="price_min"

placeholder="50000"

value={formData.price_min}

onChange={handleChange}

/>


<Input

label="Maximum Price"

type="number"

name="price_max"

placeholder="200000"

value={formData.price_max}

onChange={handleChange}

/>

</div>


<div className="mt-6">

<label className="block mb-2 text-violet-300">

Description

</label>

<textarea

name="description"

value={formData.description}

onChange={handleChange}

rows={5}

className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-4"

/>

</div>


<div className="flex items-center gap-3 mt-6">

<input

type="checkbox"

name="is_available"

checked={formData.is_available}

onChange={handleChange}

/>

<label>

Vendor Available

</label>

</div>


<button

type="submit"

disabled={loading}

className="mt-8 bg-violet-600 hover:bg-violet-700 px-8 py-3 rounded-xl"

>

{

loading

? "Saving..."

: "Save Vendor Profile"

}

</button>

</form>

</div>

</div>

    );

};

export default VendorPage;
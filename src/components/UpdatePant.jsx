import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdatePant = () => {
    const pant = useLoaderData()
    const { _id, name, price, quantity, description, category, size, photo } = pant;


    const updatePant = event => {
        event.preventDefault()
        const form = event.target;
        const name = form.name.value;
        const price = form.price.value;
        const quantity = form.quantity.value;
        const description = form.description.value;
        const category = form.category.value;
        const size = form.size.value;
        const photo = form.photo.value;
        const pant = { name, price, quantity, description, category, size, photo }

        // Send the pant to the backend and database through fetch
        fetch(`http://localhost:5000/pants/${_id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(pant)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Pant Updated Successfully!",
                        icon: "success",
                    });
                    form.reset()
                }
            })
    }
    return (
        <div>
            <h1 className="text-3xl text-center text-blue-700 font-semibold my-5">Update your pant</h1>
            <form onSubmit={updatePant}>
                <div className='space-y-3  md:m-8 m-4'>
                    {/* Name and price */}
                    <div className='md:flex gap-4 justify-center items-center'>
                        <fieldset className="md:w-1/2">
                            <legend className="text-base">Pant Name</legend>
                            <input type="text" name='name' defaultValue={name} className="input w-full" placeholder="Pant Name" />
                        </fieldset>
                        <fieldset className="md:w-1/2">
                            <legend className="text-base">Pant Price</legend>
                            <input type="text" name='price' defaultValue={price} className="input w-full" placeholder="Pant Price" />
                        </fieldset>
                    </div>
                    {/* Quantity and description */}
                    <div className='md:flex gap-4 justify-center items-center'>
                        <fieldset className="md:w-1/2">
                            <legend className="text-base">Pant Quantity</legend>
                            <input type="text" name='quantity' defaultValue={quantity} className="input w-full" placeholder="Pant Quantity" />
                        </fieldset>
                        <fieldset className="md:w-1/2">
                            <legend className="text-base">Pant Description</legend>
                            <input type="text" name='description' defaultValue={description} className="input w-full" placeholder="Pant Description" />
                        </fieldset>
                    </div>
                    {/* Category and size */}
                    <div className='md:flex gap-4 justify-center items-center'>
                        <fieldset className="md:w-1/2">
                            <legend className="text-base">Pant Category</legend>
                            <input type="text" name='category' defaultValue={category} className="input w-full" placeholder="Pant Category" />
                        </fieldset>
                        <fieldset className="md:w-1/2">
                            <legend className="text-base">Pant Size</legend>
                            <input type="text" name='size' defaultValue={size} className="input w-full" placeholder="Pant Size" />
                        </fieldset>
                    </div>
                    {/* Photo */}
                    <div className='md:flex gap-4 items-center'>
                        <fieldset className="md:w-1/2">
                            <legend className="text-base">Photo URL</legend>
                            <input type="text" name='photo' defaultValue={photo} className="input w-full" placeholder="Pant Photo" />
                        </fieldset>
                    </div>
                    <input type="submit" className='btn btn-secondary btn-dash btn-block' value="Update Pant" />
                </div>
            </form>
            <div className='text-center'>
                <Link to="/">
                    <button className='btn btn-secondary btn-xl'>Pants</button>
                </Link>
            </div>
        </div>
    );
};

export default UpdatePant;
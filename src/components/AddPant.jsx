
import Swal from 'sweetalert2'

const AddPant = () => {
    const handleAddPant = event => {
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
        console.log(pant);

        // Send the pant to the backend and database through fetch
        fetch("http://localhost:5000/pants", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(pant)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        title: "Pant added Successfully!",
                        icon: "success",
                    });
                    form.reset()
                }
            })
    }
    return (
        <div>
            <h1 className="text-3xl text-center text-blue-700 font-semibold my-5">Add your pant</h1>
            <form onSubmit={handleAddPant}>
                <div className='space-y-3  md:m-8 m-4'>
                    {/* Name and price */}
                    <div className='md:flex gap-4 justify-center items-center'>
                        <fieldset className="md:w-1/2">
                            <legend className="text-base">Pant Name</legend>
                            <input type="text" name='name' className="input w-full" placeholder="Pant Name" />
                        </fieldset>
                        <fieldset className="md:w-1/2">
                            <legend className="text-base">Pant Price</legend>
                            <input type="text" name='price' className="input w-full" placeholder="Pant Price" />
                        </fieldset>
                    </div>
                    {/* Quantity and description */}
                    <div className='md:flex gap-4 justify-center items-center'>
                        <fieldset className="md:w-1/2">
                            <legend className="text-base">Pant Quantity</legend>
                            <input type="text" name='quantity' className="input w-full" placeholder="Pant Quantity" />
                        </fieldset>
                        <fieldset className="md:w-1/2">
                            <legend className="text-base">Pant Description</legend>
                            <input type="text" name='description' className="input w-full" placeholder="Pant Description" />
                        </fieldset>
                    </div>
                    {/* Category and size */}
                    <div className='md:flex gap-4 justify-center items-center'>
                        <fieldset className="md:w-1/2">
                            <legend className="text-base">Pant Category</legend>
                            <input type="text" name='category' className="input w-full" placeholder="Pant Category" />
                        </fieldset>
                        <fieldset className="md:w-1/2">
                            <legend className="text-base">Pant Size</legend>
                            <input type="text" name='size' className="input w-full" placeholder="Pant Size" />
                        </fieldset>
                    </div>
                    {/* Photo */}
                    <div className='md:flex gap-4 items-center'>
                        <fieldset className="md:w-1/2">
                            <legend className="text-base">Photo URL</legend>
                            <input type="text" name='photo' className="input w-full" placeholder="Pant Photo" />
                        </fieldset>
                    </div>
                    <input type="submit" className='btn btn-primary btn-dash btn-block' value="Add Pant" />
                </div>
            </form>
        </div>
    );
};

export default AddPant;
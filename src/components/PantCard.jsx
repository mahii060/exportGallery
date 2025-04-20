import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const PantCard = ({ pant, setPants }) => {
    const { _id, name, price, description, category, size, photo } = pant;

    const handleDelete = _id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    html: `Your <span class="text-indigo-700 font-bold">${name}</span> has been deleted.`,
                    icon: "success"
                });
                fetch(`http://localhost:5000/pants/${_id}`, {
                    method: "DELETE",
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        setPants((prevPants) => prevPants.filter(pant => pant._id !== _id))
                    })

            }
        });




    }
    return (
        <div className="card card-side border w-full md:m-0 m-2 bg-base-100 shadow-lg">
            <figure>
                <img className="md:w-96 md:h-96 w-full h-full p-2 rounded-2xl object-contain md:object-cover"
                    src={photo}
                    alt="Movie" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>Price: {price}</p>
                <p>Category: {category}</p>
                <p>{description}</p>
                <p>Size: {size}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">View</button>
                    <Link to={`/updatePant/${_id}`}>
                        <button className="btn btn-info">Edit</button>
                    </Link>
                    <button onClick={() => handleDelete(_id)} className="btn btn-error">X</button>
                </div>
            </div>
        </div >
    );
};

export default PantCard;
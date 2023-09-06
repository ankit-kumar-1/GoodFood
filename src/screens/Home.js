import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import Footer from '../components/Footer'


export default function Home() {
    const [search, setSearch] = useState("")
    const [foodCat, setfoodCat] = useState([]);
    const [foodItem, setfoodItem] = useState([]);

    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        response = await response.json();
        // console.log(response[0], response[1])

        setfoodItem(response[0]);
        setfoodCat(response[1]);

    }

    useEffect(() => {
        loadData()
    }, [])





    return (
        <div>
            <div><Navbar /> </div>
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                <div className="carousel-inner" id='carousel'>

                    <div className="carousel-caption" style={{ zIndex: "1" }}>
                        <form className="d-flex justify-content-center">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                            {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                        </form>

                    </div>

                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/900×700/?burger" className="d-block w-100" alt='.' style={{ filter: "brightness(30%)" }} />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900×700/?pastry" className="d-block w-100" alt='.' style={{ filter: "brightness(30%)" }} />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900×700/?barbeque" className="d-block w-100" alt='.' style={{ filter: "brightness(30%)" }} />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className='container'>
                {
                    foodCat.length !== 0 ? foodCat.map((data) => {
                        return (
                            <div className='row mb-3' key={data._id}>
                                <div className='fs-3 m-3'>{data.CategoryName}</div>

                                <hr />
                                {foodItem !== [] ? foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))).map(filterItems => {
                                    return (
                                        <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                            <Card foodItem={filterItems} options={filterItems.options[0]} />
                                        </div>
                                    )
                                }

                                ) : <div>No Such Data Found</div>}
                            </div>
                        )
                    })
                        : ""
                }

            </div>

            <div><Footer /></div>
        </div>
    )
}

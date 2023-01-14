import { React, useState } from 'react'
import { updateMovies } from '../Actions/moviesAction';
import { updateProducers } from '../Actions/producerAction';
import { updateActors } from '../Actions/actorsAction';
import { connect, useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import '../assets/styles/AddMovie.css';
import '../assets/styles/Home.css';
import AddActorProducer from './AddActorProducer';

function EditMovie(props) {

    const [movie, setmovie] = useState(
      props.movieDetails
    )
    const [errorMessage, seterrorMessage] = useState("")
    const [clickType, setclickType] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestOptions = {
            method: 'PUT',
            body: JSON.stringify(movie),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }
        if (errorMessage == "" && movie.name != "" && movie.plot != "" && movie.producerId != 0) {
            fetch('http://localhost:8080/editmovie/', requestOptions)
                .then(async (response) => {
                    const data = await response.json();
                    if (!response.ok) {
                        const error = (data && data.message) || response.statusText;
                        return Promise.reject(error);
                    }
                    else {
                        props.getAllMovies().then(() => {
                            props.handleEditClick(0);
                        });
                    }
                })
        }
    }

    const handleNameChange = (e) => {
        if (e.target.value != "") {
            setmovie({ ...movie, name: e.target.value });
            seterrorMessage("")
        }
        else {
            seterrorMessage("Name cannot be empty")
        }
    }
    const handlePlotChange = (e) => {
        if (e.target.value != "") {
            setmovie({ ...movie, plot: e.target.value });
            seterrorMessage("")
        }
        else {
            seterrorMessage("plot cannot be empty")
        }
    }
    const handleYearChange = (e) => {
        if (e.target.value != "" && (1800 < parseInt(e.target.value) < 2023)) {
            setmovie({ ...movie, yearOfRelease: e.target.value });
            seterrorMessage("")

        }
        else {
            seterrorMessage("Enter a valid year")
        }
    }

    const handleClickType = (e) => {
        setclickType(e.target.value);
    }

    return (
        <div className='actorproducer_container'>
            <h3>Edit Movie Details</h3>
            <form className='form_wrapper' onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input id='name' type='text' value={movie.name} required onChange={handleNameChange} />

                </div>
                <div>
                    <label>Plot</label>
                    <input id='plot' type='text' minLength={1} value={movie.plot} required onChange={handlePlotChange} />
                </div>
                <div>
                    <label>Year of Release</label>
                    <input id='yearOfRelease' type='number' value={movie.yearOfRelease} min={1800} max={2023} required onChange={handleYearChange} />
                </div>

                <div className='error'>{errorMessage}</div>
                <input type='submit' className='button-primary' value="Submit" />

            </form>
        </div>
    )
}


export default EditMovie;
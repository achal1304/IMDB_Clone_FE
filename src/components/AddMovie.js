import { React, useState } from 'react'
import { updateMovies } from '../Actions/moviesAction';
import { updateProducers } from '../Actions/producerAction';
import { updateActors } from '../Actions/actorsAction';
import { connect, useDispatch } from "react-redux";
import { useSelector } from 'react-redux';


function AddMovie() {

    const [movie, setmovie] = useState(
        {
            'name': '',
            'yearOfRelease': 0,
            'plot': "",
            'poster': "",
            'producerId': "",
            "actors": []
        }
    )
    const [errorMessage, seterrorMessage] = useState("")


    const dispatch = useDispatch();
    const actors = useSelector(state => state.actors.actors);
    const producers = useSelector(state => state.producers.producers);

    const handleActorClick = (e) => {
        const { value, checked } = e.target;
        var actorIds = []
        var actorIdsPresent = movie['actors'];
        if (checked) {
            actorIds = [...actorIdsPresent, parseInt(value)];
        } else {
            actorIds = actorIdsPresent.filter((x) => x != value);
        }

        setmovie({ ...movie, actors: actorIds });
        // console.log(movie)
    };

    const handleProducerClick = (e) => {
        const { value } = e.target;
        setmovie({ ...movie, producerId: parseInt(value) });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (movie.actors.length == 0) {
            seterrorMessage("Select atleast one actor")
        }
        if (movie.producerId == "") {
            seterrorMessage("Select atleast one producer")
        }

        const requestOptions = {
            method: 'POST',
            headeer: { 'contentType': 'application/json' },
            body: JSON.stringify(movie)
        }
        if (errorMessage == "") {
            fetch('http://localhost:8080/actors/', requestOptions)
                .then(async (response) => {
                    const data = await response.json();
                    if (!response.ok) {
                        const error = (data && data.message) || response.statusText;
                        return Promise.reject(error);
                    }
                })
        }
    }

    const handleNameChange = (e) => {
        if (e.target.value != "") {
            setmovie({ ...movie, name: e.target.value });
        }
        else {
            seterrorMessage("Name cannot be empty")
        }
    }
    const handlePlotChange = (e) => {
        if (e.target.value != "") {
            setmovie({ ...movie, plot: e.target.value });
        }
        else {
            seterrorMessage("plot cannot be empty")
        }
    }
    const handleYearChange = (e) => {
        if (e.target.value != "") {
            setmovie({ ...movie, yearOfRelease: e.target.value });
        }
        else {
            seterrorMessage("year cannot be empty")
        }
    }

    console.log(movie)
    return (

        <div>
            <h3>Enter Movie Details</h3>
            <form onClick={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input id='name' type='text' minLength={1} required onChange={handleNameChange} />

                </div>
                <div>
                    <label>Plot</label>
                    <input id='plot' type='text' minLength={1} required onChange={handlePlotChange} />
                </div>
                <div>
                    <label>Year of Release</label>
                    <input id='yearOfRelease' type='text' minLength={1} required onChange={handleYearChange} />
                </div>
                <div>
                    <label htmlFor='actor'>Select Actor</label>
                    <ul id='actor'>
                        {actors.map((actor) => {
                            return (
                                <label key={actor.ID}>
                                    <input type='checkbox' value={actor.ID} onClick={handleActorClick} />
                                    {actor.Name}
                                </label>
                            )
                        })}
                    </ul>
                </div>
                <div>
                    <label htmlFor='producer'>Select Producer</label>
                    <select
                        id='producer'
                        onChange={handleProducerClick}
                    >
                        {producers.map((producer) => {
                            return (
                                <option
                                    key={producer.ID}
                                    value={producer.ID}
                                >
                                    {producer.Name}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <div className='error'>{errorMessage}</div>
                {/* <button type='submit' value='Submit' disabled = {errorMessage != ""} onClick={handleSubmit}>Add Movie</button> */}
                <input type='submit' value="Submit" />
            </form>
        </div>
    )
}


export default AddMovie;
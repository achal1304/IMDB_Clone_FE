import { React, useState } from 'react'
import { updateMovies } from '../Actions/moviesAction';
import { updateProducers } from '../Actions/producerAction';
import { updateActors } from '../Actions/actorsAction';
import { connect, useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import '../assets/styles/AddMovie.css';
import '../assets/styles/Home.css';
import AddActorProducer from './AddActorProducer';

function AddMovie(props) {

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
    const [clickType, setclickType] = useState("");


    const dispatch = useDispatch();
    const actors = useSelector(state => state.actors.actors);
    const producers = useSelector(state => state.producers.producers);

    const handleActorClick = (e) => {
        const { value, checked } = e.target;
        var actorIds = []
        var actorIdsPresent = movie['actors'];
        if (checked) {
            actorIds = [...actorIdsPresent, parseInt(value)];
            seterrorMessage("");
        } else {
            actorIds = actorIdsPresent.filter((x) => x != value);
        }
        if (actorIds.length == 0) {
            seterrorMessage("Select atleast one actor")
        }

        setmovie({ ...movie, actors: actorIds });
        // console.log(movie)
    };

    const handleProducerClick = (e) => {
        const { value } = e.target;
        if (e.target.value == "") {
            seterrorMessage("Select  one producer")
        }
        else {
            seterrorMessage("")
        }
        setmovie({ ...movie, producerId: parseInt(value) });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(movie),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }
        console.log('err', errorMessage);
        console.log('Movies', JSON.stringify(movie));
        if (errorMessage == "" && movie.name != "" && movie.plot != "" && movie.producerId != 0) {
            console.log("");
            fetch('http://localhost:8080/movies/', requestOptions)
                .then(async (response) => {
                    const data = await response.json();
                    console.log("response for insertmovies is", data)
                    if (!response.ok) {
                        const error = (data && data.message) || response.statusText;
                        return Promise.reject(error);
                    }
                    else {
                        props.getAllMovies().then(() => {
                            props.onAddMoviesClicked(false);
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

    console.log(movie)
    var clickValue = "";
    if (clickType == "actor") {
        clickValue = <AddActorProducer
            type="actor"
            getDetails={props.getAllActors}
            setclickType={setclickType} />
    }
    else if (clickType == "producer") {
        clickValue = <AddActorProducer
            type="producer"
            getDetails={props.getAllProducers}
            setclickType={setclickType} />
    }
    return (
        <div className='addMovie_container'>
            <h3>Enter Movie Details</h3>
            <form className='form_wrapper' onSubmit={handleSubmit}>
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
                    <input id='yearOfRelease' type='number' min={1800} max={2023} required onChange={handleYearChange} />
                </div>
                <div className='actors_wrapper'>
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
                <div className='producer_wrapper'>
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
                <input type='submit' className='button-primary' value="Submit" />

            </form>
            <div className='add_actor_producer_wrapper'>
                <button className='button-primary' value="actor" onClick={handleClickType}>Add Actor</button>
                <button className='button-primary' value="producer" onClick={handleClickType}>Add Producer</button>
            </div>
            <div>
                {clickValue}

                {/* {clickType == "actor"
                    ? <AddActorProducer type="actor" getDetails={props.getAllActors} /> 
                    : null}

                {clickType = "producer" ?
                    <AddActorProducer type="producer" getDetails={props.getAllProducers} /> 
                    : null} */}
            </div>
        </div>
    )
}


export default AddMovie;
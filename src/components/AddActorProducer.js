import { React, useState } from 'react'
import { updateMovies } from '../Actions/moviesAction';
import { updateProducers } from '../Actions/producerAction';
import { updateActors } from '../Actions/actorsAction';
import { connect, useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import '../assets/styles/AddMovie.css';
import '../assets/styles/Home.css';

function AddActorProducer(props) {

    const [actorProducer, setactorProducer] = useState(
        {
            'name': '',
            'dob': '',
            'bio': "",
            'gender': "",
        }
    )
    const [errorMessage, seterrorMessage] = useState("")


    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(actorProducer),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }
        if (errorMessage == "" && actorProducer.name != "" && actorProducer.bio != "" && actorProducer.gender != "") {
            fetch(`http://localhost:8080/${props.type}`, requestOptions)
                .then(async (response) => {
                    const data = await response.json();
                    if (!response.ok) {
                        const error = (data && data.message) || response.statusText;
                        return Promise.reject(error);
                    }
                    else {
                        props.getDetails();
                        props.setclickType("");

                    }
                })
        }
    }

    const handleNameChange = (e) => {
        if (e.target.value != "") {
            setactorProducer({ ...actorProducer, name: e.target.value });
            seterrorMessage("")
        }
        else {
            seterrorMessage("Name cannot be empty")
        }
    }
    const handleBioChange = (e) => {
        if (e.target.value != "") {
            setactorProducer({ ...actorProducer, bio: e.target.value });
            seterrorMessage("")
        }
        else {
            seterrorMessage("bio cannot be empty")
        }
    }
    const handleDOBChange = (e) => {
        if (e.target.value != "") {
            setactorProducer({ ...actorProducer, dob: e.target.value });
            seterrorMessage("")
        }
        else {
            seterrorMessage("dob cannot be empty")
        }
    }
    const handleGenderChange = (e) => {
        if (e.target.value != "" && (e.target.value != "Male" || e.target.value != "Female" || e.target.value != "Other")) {
            setactorProducer({ ...actorProducer, gender: e.target.value });
            seterrorMessage("")

        }
        else {
            seterrorMessage("Enter a valid gender")
        }
    }

    return (
        <div className='actorproducer_container'>
            <h3>Enter {props.type} Details</h3>
            <form className='form_wrapper' onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input id='name' type='text' minLength={1} required onChange={handleNameChange} />

                </div>
                <div>
                    <label>DOB</label>
                    <input id='dob' type="date"
                        min="1800-01-01" max="2023-12-31" required onChange={handleDOBChange} />
                </div>
                <div>
                    <label>Gender</label>
                    <input id='gender' type='text' required onChange={handleGenderChange} />
                </div>
                <div>
                    <label>Bio</label>
                    <input id='bio' type='text' required onChange={handleBioChange} />
                </div>
                <div className='error'>{errorMessage}</div>
                <input type='submit' className='button-primary' value="Submit" />

            </form>
        </div>
    )
}


export default AddActorProducer;
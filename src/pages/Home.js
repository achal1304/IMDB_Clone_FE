import React, { Component } from 'react'
import { updateMovies } from '../Actions/moviesAction';
import { updateProducers } from '../Actions/producerAction';
import { updateActors } from '../Actions/actorsAction';
import { connect } from "react-redux";
import '../assets/styles/Home.css';
import AddMovie from '../components/AddMovie';

export class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAddMoviesClicked: false
        }

        this.getAllMovies = this.getAllMovies.bind(this);
        this.onAddMoviesClicked = this.onAddMoviesClicked.bind(this);
    }

    async componentDidMount() {
        await this.getAllMovies();
        await this.getAllActors();
        await this.getAllProducers();
    }

    getAllActors = async () => {
        fetch('http://localhost:8080/actors/').
            then(async (response) => {
                const data = await response.json();
                if (!response.ok) {
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
                this.props.updateActors(data);
            })
    }
    getAllProducers = async () => {
        fetch('http://localhost:8080/producers/').
            then(async (response) => {
                const data = await response.json();
                if (!response.ok) {
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }

                this.props.updateProducers(data);
            })
    }

    getAllMovies = async () => {
        fetch('http://localhost:8080/movies/')
            .then(async (response) => {
                const data = await response.json();
                if (!response.ok) {
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }

                var moviesResult = data[0]
                var movies = [];
                moviesResult.forEach(element => {
                    var movie = {}
                    var movieExists = movies.filter((ele) => element["ID"] == ele['id'])
                    if (movieExists.length != 0) {
                        movieExists[0]["actors"].push(element["actorName"])
                    } else {
                        movie["id"] = element["ID"];
                        movie["name"] = element["Name"];
                        movie["yearOfRelease"] = element["yearOfRelease"];
                        movie["plot"] = element["plot"];
                        movie["poster"] = element["poster"];
                        movie["producer"] = element["producerName"];
                        movie["actors"] = [element["actorName"]];
                        movies.push(movie);
                    }

                });

                this.props.updateMovies(movies);
            })
    }

    onAddMoviesClicked = (value) => {
        this.setState({
            isAddMoviesClicked: value
        })
    }

    render() {
        let buttonAddMovie = (<div className='movie_wrapper'>
            <button className='button-primary' onClick={() => this.onAddMoviesClicked(true)}>Add a Movie</button>
        </div>)
        return (
            <div>
                <div className='movie_container'>
                    {this.state.isAddMoviesClicked
                        ? <AddMovie
                            getAllMovies={this.getAllMovies}
                            onAddMoviesClicked={this.onAddMoviesClicked}
                            getAllProducers={this.getAllProducers}
                            getAllActors={this.getAllActors} />
                        : buttonAddMovie}
                    {this.props.movies.map((movie) => {
                        return (
                            <div key={movie.id}>
                                <div className='movie_wrapper'>
                                    <div className='movie_header'>
                                        <h3>{movie.name}</h3>
                                        <p>Year : {movie.yearOfRelease}</p>
                                    </div>
                                    <h4>{movie.plot}</h4>
                                    <div className='movie_footer'>
                                        <p>Actors : {movie.actors.join(", ")}</p>
                                        <p>Producer : {movie.producer}</p>
                                    </div>
                                    <button className='button-primary'>Edit</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        movies: state.movies.movies,
        actors: state.actors.actors,
        producers: state.producers.producers
    };
};

export default connect(mapStateToProps, {
    updateMovies,
    updateProducers,
    updateActors
})(Home);
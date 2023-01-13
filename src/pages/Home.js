import React, { Component } from 'react'
import { updateMovies } from '../Actions/moviesAction';
import { connect } from "react-redux";


export class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            movies : []
        }
    }

    async componentDidMount(){
        fetch('http://localhost:8080/movies/')
        .then(async (response) => {
            const data = await response.json();
            if(!response.ok){
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            var moviesResult = data[0]
            var movies = [];
            moviesResult.forEach(element => {
                var movie = {}
                var movieExists = movies.filter((ele) => element["ID"] == ele['id'])
                if(movieExists.length != 0){
                    console.log("In IF")
                    movieExists[0]["actors"].push(element["actorName"])
                }else{
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
            // console.log(this.state.movies);
            console.log(movies);


        })
    }

    render() {
        console.log("Movies from props",this.props.movies);
        return (
            <div> 
                {this.props.movies.map((movie) => {
                    return (
                        <div key={movie.id}>
                            <p>{movie.id + "" + movie.name}</p>
                        </div>
                    )
                })}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        movies: state.movies.movies,
    };
};

export default connect(mapStateToProps, {
    updateMovies
})(Home);
import React, { Component } from 'react'
import axios from 'axios';
import Crawl from './Crawl';
import Characters from './Characters'

export default class Movies extends Component {
  state = {
    movies: [],
    openingCrawl: '',
    showButton: true,
    characters: []
  }

  getMovies = async () => {
    const response = await axios.get('https://swapi.dev/api/films/')
    console.log(response)
    this.setState({
      movies: response.data.results
    })
  }

  getInfo = async (index) => {
    this.setState({
      openingCrawl: this.state.movies[index].opening_crawl
    })
    const characters = await Promise.all(this.state.movies[index].characters.map(async (url) => {
      const response = await axios.get(url)
      return response.data
    }))
    this.setState({
      characters
    })
  }

  toggleButton = () => {
    this.setState(prevState => ({
      showButton: !prevState.showButton
    }))
  }


  render() {
    return (
      <div className='container'>
        <div className="movies">
          <h1>Movies</h1>
          {this.state.showButton ? <button onClick={() => { this.getMovies(); this.toggleButton() }}>Get Movies</button> : null}
          {this.state.movies.map((movie, index) => (
            <div className='movie'>
              <h2>{movie.title}</h2>
              <button onClick={() => { this.getInfo(index) }}>Get Crawl</button>
            </div>
          ))}
        </div>
        <div className="right-side">
          <Crawl
            movieCrawl={this.state.openingCrawl}
            characters={this.state.characters}
          />
        </div>
      </div>
    )
  }
}

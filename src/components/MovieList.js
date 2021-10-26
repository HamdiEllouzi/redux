import { useState } from 'react';
import './style.css'
import Filter from './Filter';
import { Route, Switch, useLocation } from "react-router-dom";
import { MovieInfo } from './MovieInfo';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { addMovie } from '../redux/Reducers/rootReducer';
const MovieList = () => {
  const { movie } = useSelector((state) => state.movie)
  const dispatch = useDispatch()
  const [movieName, setMovieName] = useState('')
  const [movieDescr, setMovieDescr] = useState('')
  const [movieRate, setMovieRate] = useState('')
  const [movieUrl, setMovieUrl] = useState('')
  const [searchName, setSearchName] = useState('')
  const [searchRate, setSearchRate] = useState('')
  const addMove = (name, description, rate, url) => {
    const newMovie = {
      titile: name,
      description: description,
      posterURL: url,
      rating: rate
    }
    dispatch(addMovie(newMovie))
    setMovieName('')
    setMovieDescr('')
    setMovieRate('')
    setMovieUrl('')
  }
  const location = useLocation();
  const search = () => ((location.pathname === '/') &&
    <div className='searchBlock'>
      <input type='text' onChange={e => setSearchName(e.target.value)} placeholder="search by name" />
      <input type='text' onChange={e => setSearchRate(e.target.value) / 6} placeholder="search by rate" />
    </div>)
  const addFilmeBlock = () => ((location.pathname === '/') &&
    <div className='addBlock'>
      <input type='text' value={movieName} onChange={e => setMovieName(e.target.value)} className='' placeholder='Movie Name' />
      <input type='text' value={movieUrl} onChange={e => setMovieUrl(e.target.value)} className='' placeholder='Movie cover URL' />
      <input type='text' value={movieDescr} onChange={e => setMovieDescr(e.target.value)} className='' placeholder='Movie description' />
      <input type='text' value={movieRate} onChange={e => setMovieRate(e.target.value)} className='' placeholder='Movie rating' />
    </div>)
  const addButtonBlock = () => ((location.pathname === '/') &&
    <div>
      <button onClick={() => addMove(movieName, movieDescr, movieRate, movieUrl)}>Add Movie</button>
    </div>)
  search()
  return (
    <div className="App">
      {search()}
      <div className='cardBlock'>
        <Switch>
          <Route path='/:name' render={(props) => <MovieInfo filmeListe={movie} {...props} />} />
          <Route to='/' render={(props) => <Filter filmeListe={movie} title={searchName} rate={searchRate} />} />
        </Switch>
      </div>
      {addFilmeBlock()}
      {addButtonBlock()}
    </div>
  );
}
export default (MovieList)
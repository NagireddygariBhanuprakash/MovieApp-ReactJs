import styled from 'styled-components'
import MovieComponent from "./component/MovieComponent"
import MovieInfoComponent from "./component/movieInfoComponent"
import { useState } from 'react'
import axios from 'axios';

export  const API_KEY="b075de5d";

const Container=styled.div`
display:flex;
flex-direction:column; 
`
const Header =styled.div`
display:flex;
flex-direction:row;
background-color:grey;
color:black;
padding:10px;
font-size:35px;
font-weight:bold;
box-shadow:0 13px 6px pink;
justify-content:space-between;
align-items:center;

`
const AppName=styled.div`
display:flex;
flex-direction:row;
align-items:center
` 
const MovieImage=styled.img`
width:48px;
height:48px;
margin:15px;
`
const SearchBox=styled.div`
display:flex;
flex-direction:row;
padding:5px 5px;
background-color:white;
border-radius:6px;
margin-left:20px;
width:50%;
background-color:white;
align-items:center;

`
const Searchicon=styled.img`

width:32px;
height:32px;
`
const SearchInput=styled.input`
color:red;
fonst-size:26px;
font-weight:bold;
border:none;
outline:none;
margin-left:15px;

`
const MovieListContainer=styled.div`
display:flex;
flex-direction:row;
flex-wrap:wrap;
padding:30px;
gap:24px;
justify-content:space-evenly;

`
const Placeholder =styled.img`
width:120px;
height:120px;
margin:150px;
opacity:50%;

`
function App() {
  const [searchQuery,updateSearchQuery]=useState();
  const [timeoutId,updatetimeoutId]=useState();
  const [movieList,updateMovieList]=useState([]);
  const [selectedMovie,onMovieSelect]=useState();

  const fetchData=async(searchString)=>{
    const response=await axios.get(`https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`)
    // console.log(response);
    updateMovieList(response.data.Search)
    
  }

const onTextChange=(event)=>{
  clearTimeout(timeoutId);
  updateSearchQuery(event.target.value);
  const timeout=setTimeout(()=>fetchData(event.target.value),500);
  updatetimeoutId(timeout)
};
  return <Container>
              <Header>
                <AppName>
                  <MovieImage src="/video.png"></MovieImage>
                  React Movie Applications</AppName>
                  <SearchBox>
                    <Searchicon src="/search.png"></Searchicon>
                    <SearchInput 
                        placeholder='Search Movie Name...'
                        value={searchQuery} 
                        onChange={onTextChange}
                    />

                  </SearchBox>
              </Header>

              {selectedMovie && (
                <MovieInfoComponent
                 selectedMovie={selectedMovie}
                 onMovieSelect={onMovieSelect}
                 />
                )}
              <MovieListContainer>
                   {movieList?.length
                   ? movieList.map((movie,index)=> (
                     <MovieComponent key={index} movie={movie} onMovieSelect={onMovieSelect}/>
                  ))
                   :(
                    <Placeholder src="/search.png"></Placeholder>
                   )
                   }
                
                
              </MovieListContainer>
        </Container>
}

export default App;

import axios from "axios"
import { useEffect,useState } from "react"
import styled from "styled-components"
import  {API_KEY} from "../App"




const Container=styled.div`
display:flex;
flex-direction:column;
padding:20px 30px;
justify-content:center;
border-bottom:1px solid lightgray;
`
const CoverImage=styled.img`
object-fit:cover;
height:362px;
`
const InfoColumn=styled.div`
display:flex;
flex-direction:column;
margin:20px;
`
const MovieName=styled.span`
fonst-size:22px;
font-weight:600;
color:black;
margin:15px 0;
white-space:nowrap;
text-transform:capatalize
text-overflow:ellipsis;
overflow:hidden;
`
const MovieInfo=styled.span`
font-size:16px;
font-weight:500;
color:black;
overflow:hidden;
margin:4px 0;
text-transform:capitalize;
text-overflow:ellipsis;
& span{
    opacity:0.5;
    font-size:20px;
}
`
const Close=styled.span`
font-size:18px;
font-weight:600;
color:black;
background:lightgray;
height:fit-content;
padding:8px;
border-radius:50%;
cursor:pointer;
opacity:0.8;
`



const MovieInfoComponent=(props)=>{
    const [movieInfo,setMovieInfo]=useState();
    const {selectedMovie}=props;
    useEffect(()=>{
        axios
        .get(`https://www.omdabapi.com/?i=${selectedMovie}&apikey=${API_KEY}`)
    .then((response)=>setMovieInfo(response.data));
    // console.log(response);
    
},[selectedMovie]);
    return <Container>
        {movieInfo?<>
            <CoverImage src={MovieInfo?.Poster}></CoverImage>
       <InfoColumn>
            <MovieName>
                {MovieInfo?.Type}:{movieInfo?.Title}
            </MovieName>
            <MovieInfo>
            IMBD Rating : <span>{movieInfo?.imbdRating}</span>
            </MovieInfo>
            <MovieInfo>
            Language : <span>{movieInfo?.Language}</span>
            </MovieInfo>
            <MovieInfo>
            Rated : <span>{movieInfo?.Rated}</span>
            </MovieInfo>
            <MovieInfo>
            Released : <span>{movieInfo?.Released}</span>
            </MovieInfo>
            <MovieInfo>
            Runtime : <span>{movieInfo?.Runtime}</span>
            </MovieInfo>
            <MovieInfo>
            Genre : <span>{movieInfo?.Genre}</span>
            </MovieInfo>
            <MovieInfo>
            Director : <span>{movieInfo?.Director}</span>
            </MovieInfo>
            <MovieInfo>
            Actors : <span>{movieInfo?.Actors}</span>
            </MovieInfo><MovieInfo>
            Plot : <span>{movieInfo?.Plot}</span>
            </MovieInfo>

       </InfoColumn>
            <Close onClick={()=>props.onMovieSelect()}>
                X
            </Close>
        
        </>:"Loading"}
     

            </Container> 
}
export default MovieInfoComponent
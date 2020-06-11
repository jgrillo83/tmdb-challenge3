import {Movie, Series} from "./models";

const apiKey = `66683917a94e703e14ca150023f4ea7c`;
let stage;

export const init = (stageInstance) =>{
    stage = stageInstance;
};

export const getGenres= async(genre) => {
  const result = await get(`https://api.themoviedb.org/3/genre/${genre}/list?api_key=${apiKey}`);
  const {genres = []} = result
  return genres
}
/**
 * @todo:
 * call get with the correct url
 * https://api.themoviedb.org/3/movie/popular
 * and return the data
 */
export const getPopular = async(genre)=> {

    const genres = await getGenres(genre);
    console.error(genres);
    const movies = await get(`https://api.themoviedb.org/3/${genre}/popular?api_key=${apiKey}`);
    const {results = []} = movies;

    if(results.length){
      console.error(results)
        return results.map((data)=>{
            if (genre == "movie")
              return new Movie(data, genres);
            else if (genre == "tv")
              return new Series(data, genres)
        });
    }

    return [];
};

const get = (url)=> {
    return fetch(url, {
        'Accept': 'application/json'
    }).then(response => {
        return response.json();
    })
};

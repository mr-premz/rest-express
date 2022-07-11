const express = require('express')

const app = express()
const port = 3000;

//parse JSON using express
app.use(express.json());
app.use(express.urlencoded({extended:false}));

let movies = [
    {
        id: '1',
        title: 'ZNMD',
        director: 'PK',
        release_date: '2012'
    },
    {
        id: '2',
        title: 'The Irishman',
        director: 'martin scorcese',
        release_date: '2020' 
    },
    {
        id: '3',
        title: 'Justice League',
        director: 'Zack Snyder',
        release_date: '2021'
    }
];



// movies in json form
app.get('/movies',(req,res)=>{
    res.json(movies);
})

//add movie using post method

app.post('/movies',(req,res)=>{
    const movie = req.body;
    console.log(movie);
    movies.push(movie);
    res.send("Movie is added");
});

//Search the Movie
app.get('/movies/:id',(req,res)=>{
    const id = req.params.id;
    for( let movie of movies){
       if(movie.id===id){
        res.json(movie);
        return;
       }
    }
  res.status(404).send("Movie not found");
})

//Delete specific movie object

app.delete('/movies/:id',(req,res)=>{
    const id = req.params.id;
    movies = movies.filter(movie=>{
        if(movie.id!==id){
            return true;
        }
        return false;
    })
    res.send("Movie Deleted");
})

//set the server to listen to port
app.listen(port,()=> console.log(`Server listening to port ${port}`));
var mongoose = require('mongoose');

var express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser')
var sha256File = require('sha256-file');
const fetch = require('node-fetch');
const { buildSchema } = require('graphql');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const upload = require('./upload')
const IncomingForm = require('formidable').IncomingForm

const uploadTrackPath = `${__dirname}/public/track/`;
const uploadTrack  = require('multer')({ dest: uploadTrackPath, fieldSize: 1024*1024*128 })


function getPart(str, ind) {
  n = str.includes('-')
  if (n)
    return str.split('-')[ind]
  else
    return str
}


async function playlistManager(ownerID, playlistTYPE) {
  if (await Playlist.findOne({ owner: ownerID, type: playlistTYPE }) === null) {
    let newList = new Playlist({ owner: ObjectID(ownerID), type: String(playlistTYPE) })
    await newList.save();
  }
}


async function songAbsence(id) {
  if (await Track.findOne({ id: id }) === null)
    return true
  else
    return false
}


async function songToPlaylist(ownerID,playlistTYPE, trackID) {
  await Playlist.findOneAndUpdate(
    { owner: ObjectID(ownerID), type: playlistTYPE },
    { $push: { songs: ObjectID(trackID) } }

  )}


mongoose.connect('mongodb://localhost/project', { useNewUrlParser: true });
var ObjectID = require('mongodb').ObjectID;


var db = mongoose.connection;

var userSchema = new mongoose.Schema({
  login: String,
  password: String,
  firstname: String,
  lastname: String

});

var User = mongoose.model('User', userSchema)


var trackSchema = new mongoose.Schema({
  id: String,
  artist: String,
  title: String,
  preview: String,
  duration: String

})

var Track = mongoose.model('Track', trackSchema)


var playlistSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }],
  type: String
})

var Playlist = mongoose.model('Playlist', playlistSchema)


const config = {
  secret: `akfr-vfybfr`
}

function jwtWare() {
  const { secret } = config;
  return expressJwt({ secret }).unless({
    path: [
      '/login',
      '/',
      '/signup',
      '/hotchart'
    ]
  });
}

function errorHandler(err, req, res, next) {
  if (typeof (err) === 'string') {
    // custom application error
    return res.status(400).json({ message: err });
  }

  if (err.name === 'UnauthorizedError') { //отлавливает ошибку, высланную из expressJwt
    // jwt authentication error
    return res.status(401).json({ message: 'Invalid Token' });
  }

  // default to 500 server error
  return res.status(500).json({ message: err.message });
}



var app = express();
app.use(cors())
app.use(bodyParser.json())
app.use(jwtWare());



// global error handler
app.get('/', (req, res, next) => {
  res.json({ all: 'ok' })
});
app.use(errorHandler);


db.on('error', console.error.bind(console, 'connection error:'));

app.post('/signup', async (req, res) => {
  user = await User.findOne({ login: req.body.login })
  if (user) {
    res.status(400).json({
      err: 'Login already exists'
    })
  }
  else {
    let newUser = new User(req.body)
    await newUser.save()
    let { password, ...userInfo } = newUser.toObject()
    const token = jwt.sign({ sub: userInfo }, config.secret)
    res.status(201).json({ token, userInfo })
  }
})


app.post('/login', async (req, res) => {
  user = await User.findOne({ login: req.body.login, password: req.body.password })
  if (user) {
    let { password, ...userInfo } = user.toObject()
    const token = jwt.sign({ sub: userInfo }, config.secret)
    res.status(200).json({ token, userInfo })
  }
  else {
    res.status(404).json({
      err: "Incorrect login or password"
    })
  }
})

app.get('/hotchart', (req, res) => {
  fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart`, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
    .then(data => data.json())
    .then(data => {
      res.send(data);
    }).catch(err => { console.log(err) })
})


app.post('/profile', async (req, res) => {
  user = await User.findOne({ _id: req.body.id })
  if (user && req.body.password != null) {
    let updUser = User.findOneAndUpdate(
      { _id: req.body.id },
      { $set: { "login": req.body.login, "firstname": req.body.firstname, "lastname": req.body.lastname, "password": req.body.password } },
      { new: true }
    )
      .then((result) => {
        let { password, ...updUserInfo } = result.toObject()
        const token = jwt.sign({ sub: updUserInfo }, config.secret)
        res.status(200).json({ token, updUserInfo })
      })
    //let {password, ...userInfo} = user.toObject()
    //res.status(201).json({userInfo})
  }
  else {
    let updUser = User.findOneAndUpdate(
      { _id: req.body.id },
      { $set: { "login": req.body.login, "firstname": req.body.firstname, "lastname": req.body.lastname, } },
      { new: true }
    )
      .then((result) => {
        let { password, ...updUserInfo } = result.toObject()
        const token = jwt.sign({ sub: updUserInfo }, config.secret)
        res.status(200).json({ token, updUserInfo })
      })
  }
})


app.post('/favor', async (req, res) => {
  let type = 'favourites';
  let owner = req.body.owner;
  playlistManager(owner, type);
  if (await songAbsence(req.body.id) === false) {
      playlistTrack = await Playlist.findOne({ owner: req.body.owner, type : type, songs: await Track.findOne({ id: req.body.id }) })
      if (playlistTrack) {
        res.status(400).json({
          err: 'Track already in playlist'
        })
      }
      else {
        let track = await Track.findOne({id: req.body.id})
        let updPlaylist = Playlist.findOneAndUpdate(
          { owner: req.body.owner, type: type },
          { $push: { songs: track._id } }
        ).then((result) => {
          result.toObject()
          res.status(200).json(result)
        })
      }
    }
    else {
      let newTrack = new Track({ id: req.body.id, artist: req.body.artist, title: req.body.title, preview: req.body.preview, duration:req.body.duration })
      await newTrack.save();
      let updPlaylist = Playlist.findOneAndUpdate(
        { owner: req.body.owner, type: type },
        { $push: { songs: newTrack._id } }
      ).then((result) => {
        result.toObject()
        res.status(200).json(result)
      })
    }
  }
)


app.post('/perfavor', async (req, res) => {
  let favorTracks = await Playlist.findOne({ owner: req.body.owner, type: "favourites" })
  if (favorTracks) {
    let plstSongs = favorTracks.songs
    let userFavs = []
    for (let item of plstSongs) {
      let newItem = await Track.findOne({ _id: item })
      userFavs.push(newItem)
    } upload
    res.send(userFavs)
  }
  else {
    res.status(404).json({
      err: 'NO PLAYLIST'
    })
  }
})



app.post('/signup', async (req, res) => {
  user = await User.findOne({ login: req.body.login })
  if (user) {
    res.status(400).json({
      err: 'Login already exists'
    })
  }
  else {
    let newUser = new User(req.body)
    await newUser.save()
    let { password, ...userInfo } = newUser.toObject()
    const token = jwt.sign({ sub: userInfo }, config.secret)
    res.status(201).json({ token, userInfo })
  }
})


app.listen(4000, function () {
  console.log('Player app listening on port 4000!');
});




app.post('/upload', uploadTrack.single("file"), async (req, res) => {
  let type = 'uploads';
    let owner = req.body.field;
  playlistManager(owner, type);
  if (await songAbsence("id" + sha256File(req.file.path))) {
   // let newTrack = new Track({ id: "id" + sha256File(file.path), artist: getPart(file.originalname, 0), songname: getPart(file.originalname, 1), preview: file.path })
   let newTrack  = new Track({})
    newTrack.id = "id" + sha256File(req.file.path)
    newTrack.artist = getPart(req.file.originalname, 0)
    newTrack.title = getPart(req.file.originalname, 1)
    newTrack.preview = "http://127.0.0.1:8887/" + req.file.path.substr(35);
    await newTrack.save();
    await songToPlaylist(owner,type, newTrack._id)
  }
  else {
    res.status(400).json({
      err: 'Track already uploaded'
    })
  }
  res.json()
})


app.post('/peruploads', async (req, res) => {
  let uploadedTracks = await Playlist.findOne({ owner: req.body.owner, type: "uploads" })
  if (uploadedTracks) {
    let plstSongs = uploadedTracks.songs
    let userUploads = []
    for (let item of plstSongs) {
      let newItem = await Track.findOne({ _id: item })
      userUploads.push(newItem)
    }
    res.send(userUploads)
  }
  else {
    res.status(404).json({
      err: 'NO PLAYLIST'
    })
  }
})


app.post('/search', async (req, res) => {
let searchResults = await Track.find({ artist:  new RegExp(req.body.value, 'i')})
if(searchResults)
res.send(searchResults)
else{
  res.status(404).json({
    err:'NO SONGS'
  })
}
})


app.get('/recentuploads', async (req,res) => {
let sorted = await Track.find({id: /id/}).sort({_id:1})
if(sorted)
res.send(sorted)
else{
  res.status(404).json({
    err:'NO SONGS UPLOADED'
  })
}
})
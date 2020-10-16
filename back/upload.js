const IncomingForm = require('formidable').IncomingForm


function getPart(str,index) {
  str.includes('-') ? 
     str.split('-')[index] : str;
}

module.exports = function upload(req, res) {
  var form = new IncomingForm()

  form.on('file', async (field, file) => {
    let newTrack = new Track({id: "id"+file.Name, artist: getPart(file.Name, 0), songname: getPart(file.Name, 1), preview: file.path })
    await newTrack.save();
    console.log(newTrack)
  })
  form.on('end', () => {
    res.json()
  })
  form.parse(req)
}
import Clarifai from 'clarifai';


const app = new Clarifai.App({
    apiKey: "33df32321e0d49128fdae2efe0c57d97",
   });

export function handleApiCall (req, res) {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data)
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

export function handleImage (req, res, db) {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('unable to get entries'))
}


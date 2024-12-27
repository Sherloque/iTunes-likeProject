import {
    PLAY_SONG,
    PAUSE_SONG,
    STOP_SONG,
    UPDATE_TIME,
    SET_DURATION,
    GET_HOT_CHART,
    GET_FAVOURITES,
    GET_UPLOADS,
    UPLOAD_SONG,
    GET_SEARCH_RESULTS,
    GET_RECENT
  } from "./actionTypes";


export const getHotChart = chart => ({
    type: GET_HOT_CHART,
    payload: chart
})

export const getFavourites = faves => ({
    type: GET_FAVOURITES,
    payload: faves
})

export const getPersonalUploads = uploads => ({
    type: GET_UPLOADS,
    payload: uploads
})

export const upSong = file => ({
    type: UPLOAD_SONG,
    payload: file
})

export const getSearchResults = results => ({
    type: GET_SEARCH_RESULTS,
    payload: results
})

export const getRecentUploads = recent => ({
    type: GET_RECENT,
    payload: recent
})
  
  export const playSong = (preview, track) => ({
    type: PLAY_SONG,
    payload: { preview, track },
  });
  
  export const pauseSong = () => ({
    type: PAUSE_SONG,
  });
  
  export const stopSong = () => ({
    type: STOP_SONG,
  });
  
  export const updateTime = (currentTime) => ({
    type: UPDATE_TIME,
    payload: currentTime,
  });
  
  export const setDuration = (duration) => ({
    type: SET_DURATION,
    payload: duration,
  });



export const signUser = (login, password, firstname, lastname, navigate) => {
    return dispatch => {
        return fetch("/signup", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ login, password, firstname, lastname })
        })
            .then(res => res.json())
            .then(data => {
                if (data.err) {
                    alert('Login was already taken')
                } else {
                    dispatch({ type: 'REGISTERED' })
                    localStorage.setItem("token", data.token)
                    //dispatch(loginUser(data.userInfo))
                    navigate('/feed');
                }
            })
    }
}


export const changeUserInfo = (id, login, firstname, lastname, password) => {
    return dispatch => {
        return fetch("/profile", {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + localStorage.token,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({ id, login, firstname, lastname, password })
        })
            .then(res => res.json())
            .then(data => {
                if (data.message) {
                    console.log(data.message)
                    alert('Что то пошло не так')
                } else {
                    localStorage.setItem("token", data.token)
                    //dispatch(loginUser(data.updUserInfo))
                    alert('Информация успешно изменена')
                }
            })
    }
}

export const fetchHotChart = () => dispatch => {
    fetch('/hotchart', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    })
        .then(data => data.json())
        .then(data => { dispatch(getHotChart(data)) })
        .catch(err => { console.log(err) })
}


export const toFavourites = (owner, id, artist, title, preview) => dispatch => {
    fetch('/favor', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + localStorage.token,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({ owner, id, artist, title, preview })
    })
        .then(res => res.json())
        .then(data => {
            if (data.err) {
                console.log(data.err)
                alert('This sont is already favoured')
            } else {
                alert('Added to favourites')
            }
        })
}


export const fetchPersonalFavourites = (owner) => dispatch => {
    fetch('/perfavor', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + localStorage.token,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({ owner })
    })
        .then(data => data.json())
        .then(data => {
            if (data.err) {
                console.log(data.err)
            } else {
                dispatch(getFavourites(data))
            }
        })
}


export const fetchPersonalUploads = (owner) => dispatch => {
    fetch('/peruploads', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + localStorage.token,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({ owner })
    })
        .then(data => data.json())
        .then(data => {
            if (data.err) {
                console.log(data.err)
            } else {
                dispatch(getPersonalUploads(data))
            }
        })
}


export const fetchSearch = (value) => dispatch => {
    fetch('/search', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + localStorage.token,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({ value })
    })
        .then(data => data.json())
        .then(data => {
            if (data.err) {
                console.log(data.err)
            } else {
                dispatch(getSearchResults(data))
            }
        })
}


export const fetchRecentUploads = () => dispatch => {
    fetch('/recentuploads', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.token,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        }
    })
        .then(data => data.json())
        .then(data => { dispatch(getRecentUploads(data)) })
        .catch(err => { console.log(err) })
}
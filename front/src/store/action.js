export const getHotChart = chart => ({
    type: 'GET_HOT_CHART',
    payload: chart
})

export const getFavourites = faves => ({
    type: 'GET_FAVOURITES',
    payload: faves
})

export const getPersonalUploads = uploads => ({
    type: 'GET_UPLOADS',
    payload: uploads
})

export const loginUser = user => ({
    type: 'LOGIN_USER',
    payload: user
})

export const upSong = file => ({
    type: 'UPLOAD_SONG',
    payload: file
})

export const getSearchResults = results => ({
    type: 'GET_SEARCH_RESULTS',
    payload: results
})

export const getRecentUploads = fresh => ({
    type: 'GET_RECENT',
    payload: fresh
})

export const logUser = (login, password, navigate) => {
    return dispatch => {
        return fetch("/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({ login, password })
        })
            .then(res => res.json())
            .then(data => {
                if (data.err) {
                    alert('Неправильный логин или пароль')
                } else {
                    localStorage.setItem("token", data.token)
                    dispatch(loginUser(data.userInfo))
                    navigate('/feed');
                }
            })
    }
}


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
                console.log(data)
                if (data.err) {
                    alert('Login was already taken')
                } else {
                    dispatch({ type: 'REGISTERED' })
                    localStorage.setItem("token", data.token)
                    dispatch(loginUser(data.userInfo))
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
                    dispatch(loginUser(data.updUserInfo))
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


export const toFavourites = (owner, id, artist, songname, preview) => dispatch => {
    fetch('/favor', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + localStorage.token,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({ owner, id, artist, songname, preview })
    })
        .then(res => res.json())
        .then(data => {
            if (data.err) {
                console.log(data.err)
                alert('Песня уже в избранных!')
            } else {
                alert('Добавлена в избранные')
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
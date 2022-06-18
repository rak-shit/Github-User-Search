import axios from "axios"

export const getHeaders = () => ({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.REACT_APP_GITHUB_API_TOKEN}`
})

export const fetchGithubUsers = (name, page) => {
    return axios({
        url: 'https://api.github.com/search/users',
        method: 'GET',
        params: {
            q: name,
            page: page,
            per_page: 50
        },
        headers: getHeaders()
    })
}

export const getUserDetails = (url) => {
    return axios({
        url: url,
        method: 'GET',
        headers: getHeaders()
    })
}

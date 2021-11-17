const hostName = 'https://look-graphql-backend.herokuapp.com/graphql'
const hostNameForImage = 'https://look-graphql-backend.herokuapp.com'

function createElements(...array) {
    return array.map(el => {
        return document.createElement(el)
    })
}

async function axios(query, variables) {
    let response = await fetch(hostName, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query,
            variables: variables
        })
    })

    response = await response.json()
    let data = response.data

    return data
}


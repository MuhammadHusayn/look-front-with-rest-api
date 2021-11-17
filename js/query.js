const GET_USERS = `
query {
    users {
        userId
        username
        contact
    }
}
`

const GET_ORDERS = `
query GET_ORDERS($userId: ID) {
    orders (userId: $userId) {
        food {
            foodName
            foodImg
        }
        count
        user {
            username
        }
    }
}
`

const GET_FOODS = `
query {
    foods {
        foodId
        foodName
    }
}
`

const ADD_USER = `
mutation ADD_USER($username: String! $contact: String!) {
    addUser(username: $username contact:$contact) {
        status
    }
}
`

const ADD_ORDER = `
mutation ADD_ORDER ($foodId: Int! $userId: Int! $count: Int!) {
    addOrder(foodId: $foodId userId: $userId count: $count) {
        status
        message
        data
    }
}
`
const hostName = 'https://look-backend-rest.herokuapp.com'
const customersList = document.querySelector('.customers-list')
const ordersList = document.querySelector('.orders-list')
const clientId = document.querySelector('#clientId')
const userHeader = document.querySelector('#userHeader')
const userAddForm = document.querySelector('#userAdd')
const usernameInput = document.querySelector('#usernameInput')
const telephoneInput = document.querySelector('#telephoneInput')
const foodsSelect = document.querySelector('#foodsSelect')
const foodsForm = document.querySelector('#foodsForm')
const foodsCount = document.querySelector('#foodsCount')

function createElements(...array) {
	return array.map(el => {
		return document.createElement(el)
	})
}

async function renderUsers() {
	const response = await fetch(hostName + '/users')
	const users = await response.json()
	customersList.innerHTML = null
	for (let user of users) {
		const [li, span, a] = createElements('li', 'span', 'a')

		li.className = 'customer-item'
		span.className = 'customer-name'
		a.className = 'customer-phone'

		span.textContent = user.first_name
		a.textContent = '+' + user.telephone

		a.setAttribute('href', 'tel:' + '+' + user.telephone)

		li.append(span, a)
		customersList.append(li)

		li.onclick = () => {
			renderOrders(user.user_id)
			clientId.textContent = user.user_id
			userHeader.textContent = user.first_name
		}
	}
}

async function renderOrders(userId) {
	const response = await fetch(hostName + '/orders/' + userId)
	const orders = await response.json()
	ordersList.innerHTML = null
	for (let order of orders) {
		const [li, img, div, foodName, foodCount] = createElements('li', 'img', 'div', 'span', 'span')

		li.className = 'order-item'
		foodName.className = 'order-name'
		foodCount.className = 'order-count'

		img.src = hostName + order.food.food_img_link

		foodName.textContent = order.food.food_name
		foodCount.textContent = order.count

		div.append(foodName, foodCount)
		li.append(img, div)
		ordersList.append(li)
	}
}

async function renderFoods(userId) {
	const response = await fetch(hostName + '/foods')
	const foods = await response.json()

	for (let food of foods) {
		const [option] = createElements('option')
		option.value = food.food_id
		option.textContent = food.food_name

		foodsSelect.append(option)
	}
}

userAddForm.onsubmit = async event => {
	event.preventDefault()
	if (!usernameInput.value || !telephoneInput.value) return

	try {

		const response = await fetch(hostName + '/users', {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: usernameInput.value,
				phone: telephoneInput.value,
			})
		})

		usernameInput.value = null
		telephoneInput.value = null

		renderUsers()

	} catch (error) {
		alert(error.message)
	}

}

foodsForm.onsubmit = async event => {
	event.preventDefault()
	if (!clientId.textContent || !foodsCount.value) return
	try {

		const response = await fetch(hostName + '/orders', {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				userId: clientId.textContent,
				foodId: foodsSelect.value,
				count: foodsCount.value,
			})
		})

		foodsSelect.value = 1
		foodsCount.value = null

		renderOrders(clientId.textContent)

	} catch (error) {
		alert(error.message)
	}

}

renderUsers()
renderFoods()
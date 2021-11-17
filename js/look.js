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

async function renderUsers() {
	const { users } = await axios(GET_USERS)

	customersList.innerHTML = null
	for (let user of users) {
		const [li, span, a] = createElements('li', 'span', 'a')

		li.className = 'customer-item'
		span.className = 'customer-name'
		a.className = 'customer-phone'

		span.textContent = user.username
		a.textContent = '+' + user.contact

		a.setAttribute('href', 'tel:' + '+' + user.contact)

		li.append(span, a)
		customersList.append(li)

		li.onclick = () => {
			renderOrders(user.userId)
			clientId.textContent = user.userId
			userHeader.textContent = user.username
		}
	}
}

async function renderOrders(userId) {
	const { orders } = await axios(GET_ORDERS, { userId })

	ordersList.innerHTML = null
	for (let order of orders) {
		const [li, img, div, foodName, foodCount] = createElements('li', 'img', 'div', 'span', 'span')

		li.className = 'order-item'
		foodName.className = 'order-name'
		foodCount.className = 'order-count'

		img.src = hostNameForImage + order.food.foodImg.replace('.', '')

		foodName.textContent = order.food.foodName
		foodCount.textContent = order.count

		div.append(foodName, foodCount)
		li.append(img, div)
		ordersList.append(li)
	}
}

async function renderFoods(userId) {
	const { foods } = await axios(GET_FOODS)

	for (let food of foods) {
		const [option] = createElements('option')
		option.value = food.foodId
		option.textContent = food.foodName

		foodsSelect.append(option)
	}
}

userAddForm.onsubmit = async event => {
	event.preventDefault()
	if (!usernameInput.value || !telephoneInput.value) return

	try {

		const response = await axios(ADD_USER, {
			username: usernameInput.value,
			contact: telephoneInput.value,
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

		const response = await axios(ADD_ORDER, {
			userId: clientId.textContent,
			foodId: foodsSelect.value,
			count: foodsCount.value,
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
const container = document.getElementById('container')
const box = document.getElementById('canvas-box')
const canvas = document.getElementById('canvas')
const para = document.getElementById('para')
const textInput = document.getElementById('text-input')

const ctx = canvas.getContext('2d')
// const { width, height } = box.getBoundingClientRect()
canvas.width = 	2000	// width
canvas.height = 2000	// height


const mouse = { x: 0, y: 0 }
const mouseDownAt = { x: null, y: null }
const objectLastPosition = { x: null, y: null }
let isMouseMoving = false
let isMouseDown = false
let textInputActive = false
let textInputActiveIndex = null

canvas.addEventListener('mousemove', e => {
	isMouseMoving = true
	mouse.x = e.layerX
	mouse.y = e.layerY
	para.innerHTML = `Mouse coordinates : (${mouse.x},${mouse.y})`
})

canvas.addEventListener('mousedown', e => {
	isMouseDown = true
	mouseDownAt.x = mouse.x
	mouseDownAt.y = mouse.y
	checkClickOnAllObjects()
})

canvas.addEventListener('mouseup', e => {
	isMouseDown = false
	mouseDownAt.x = null
	mouseDownAt.y = null
})

canvas.addEventListener('dblclick', e => {
	checkDoubleClickOnAllObjects()
})

canvas.addEventListener('dragover', e => {
	e.preventDefault()
})

canvas.addEventListener('drop', e => {
	e.preventDefault()
	const shape = e.dataTransfer.getData('shape')
	const [x, y] = [e.layerX, e.layerY]
	if (shape === 'rectangle') {
		objects.push(new Rectangle(x-50, y-50))
	} else if (shape === 'circle') {
		objects.push(new Circle(x-50, y-50))
	}
})

document.addEventListener('keyup', e => {
	switch(e.key) {
		case 'Delete':
			objects.forEach((object, i) => {
				if (object.isSelected) 
					objects.splice(i, 1)
			})
			break
		default:
			break 
	}
})

textInput.addEventListener('mousedown', e => e.stopPropagation())
textInput.addEventListener('keydown', e => {
	if (e.key === 'Enter') {
		hideTextInput()
	}
})


const objects = [
	new Circle(150, 150),
	new Rectangle(250, 250),
]


function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)

	checkHoverOverAllObjects()

	moveSelectedObjectOnDrag()

	drawAllObjects()

	isMouseMoving = false
	requestAnimationFrame(animate)
}

animate()


function drawAllObjects() {
	for(let i=0; i<objects.length; i++) {
		objects[i].draw()
	}
}

function checkHoverOverAllObjects() {
	let gotThatObject = false

	for(let i=objects.length-1; i>=0; i--) {
		if (!gotThatObject && objects[i].isHovering(mouse)) {
			objects[i].isHovered = true
			gotThatObject = true
		} else {
			objects[i].isHovered = false
		}
	}
}

function checkClickOnAllObjects() {
	let gotThatObject = false

	for(let i=objects.length-1; i>=0; i--) {
		if (!gotThatObject && objects[i].isHovering(mouse)) {
			objects[i].isSelected = true
			gotThatObject = true

			objectLastPosition.x = objects[i].x
			objectLastPosition.y = objects[i].y

			const tempObject = objects.splice(i, 1)[0]
			objects.push(tempObject)
		} else {
			objects[i].isSelected = false
		}
	}

	hideTextInput()
}

function moveSelectedObjectOnDrag() {
	let index = null

	objects.forEach((object, i) => {
		if (object.isHovered) 
			index = i
	})

	if (index !== null && isMouseDown) {
		const dx = mouseDownAt.x - objectLastPosition.x
		const dy = mouseDownAt.y - objectLastPosition.y

		objects[index].x = mouse.x - dx
		objects[index].y = mouse.y - dy
	}
}

function checkDoubleClickOnAllObjects() {
	for(let i=objects.length-1; i>=0; i--) {
		if (objects[i].isSelected) {
			textInputActive = true
			textInputActiveIndex = i
			textInput.style.display = 'block'
			textInput.focus()
			textInput.value = objects[i].text
			textInput.style.top = `${objects[i].y}px`
			textInput.style.left = `${objects[i].x}px`
		}
	}
}

function hideTextInput() {
	if (textInputActive) {
		textInput.style.display = 'none'
		textInputActive = false
		objects[textInputActiveIndex].text = textInput.value.trim()
		textInputActive = null
	}
}

const circle = document.getElementById('circle')

circle.addEventListener('dragstart', e => {
	// console.log(e)
	e.dataTransfer.setData('shape', 'circle')
})

function Circle(x, y, radius=55, fillColor='#CEE5D0', strokeColor='#94B49F') {
	this.x = x
	this.y = y
	this.shape = 'circle'
	this.radius = radius
	this.fillColor = fillColor
	this.strokeColor = strokeColor
	this.isHovered = false
	this.isSelected = false
	this.text = 'Circle Text'

	this.draw = () => {
		ctx.fillStyle = this.fillColor
		ctx.beginPath()
		ctx.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, 2*Math.PI)
		ctx.fill()
		ctx.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, 2*Math.PI)
		ctx.strokeStyle = this.isSelected ? '#1F4690' : this.isHovered ? '#6E85B7' : this.strokeColor
		ctx.stroke()

		ctx.font = '1rem sans-serif'
		ctx.textAlign = 'center'
		ctx.textBaseline = 'middle'
		ctx.fillStyle = 'black'
		ctx.fillText(this.text, this.x + this.radius, this.y + this.radius, 2*this.radius)
	}

	this.isHovering = (mouse) => {
		const { x, y } = mouse

		const distance = Math.hypot((this.x + this.radius - x), (this.y + this.radius - y))

		if (distance <= radius) 
			return true
		else 
			return false
	}
}

const rect = document.getElementById('rect')

rect.addEventListener('dragstart', e => {
	// console.log(e)
	e.dataTransfer.setData('shape', 'rectangle')
})

function Rectangle(x, y, width=100, height=100, fillColor='#CEE5D0', strokeColor='#94B49F') {
	this.x = x
	this.y = y
	this.shape = 'rectangle'
	this.width = width
	this.height = height
	this.fillColor = fillColor
	this.strokeColor = strokeColor
	this.isHovered = false
	this.isSelected = false
	this.text = 'Box Text'

	this.draw = () => {
		ctx.fillStyle = this.fillColor
		ctx.fillRect(this.x, this.y, this.width, this.height)
		ctx.strokeStyle = this.isSelected ? '#1F4690' : this.isHovered ? '#6E85B7' : this.strokeColor
		ctx.strokeRect(this.x, this.y, this.width, this.height)

		ctx.font = '1rem sans-serif'
		ctx.textAlign = 'center'
		ctx.textBaseline = 'middle'
		ctx.fillStyle = 'black'
		ctx.fillText(this.text, this.x + this.width/2, this.y + this.height/2, this.width)
	}

	this.isHovering = (mouse) => {
		const { x, y } = mouse

		const [x1, x2, y1, y2] = [this.x, this.x + this.width, this.y, this.y + this.height]

		if (x1 <= x && x <= x2 && y1 <= y && y <= y2) 
			return true
		else 
			return false
	}
}

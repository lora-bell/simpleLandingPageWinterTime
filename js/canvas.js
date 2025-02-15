const COLORS = ["197, 212, 250", "177, 198, 250", "144, 169, 232", "126, 160, 247", "116, 153, 247"]

function generateFromTo(min, max){
    return (Math.random() * (max - min) + min).toFixed()
}

class Bubble{
    constructor(canvas) {
        this.canvas = canvas
        this.getCanvasSize()
        this.init()
    }

    getCanvasSize(){
        this.canvasWidth = this.canvas.clientWidth;
        this.canvasHeight = this.canvas.clientHeight;
    }

    init(){
        this.color = COLORS[generateFromTo(0, COLORS.length - 1)]
        this.size = generateFromTo(1, 3)
        this.alpha = generateFromTo(4, 6) / 10
        this.blur = generateFromTo(5, 9)
        this.translateX = generateFromTo(0, this.canvasWidth)
        this.translateY = generateFromTo(0, this.canvasHeight)
        this.speed = generateFromTo(20, 40)
        this.moveX = generateFromTo(-5, 5) / this.speed
        this.moveY = generateFromTo(5, 10) / this.speed
    }

    move(){
        this.translateX = this.translateX - this.moveX
        this.translateY = this.translateY + this.moveY
        if(this.translateY > this.canvasHeight || this.translateX < 0 || this.translateX > this.canvasWidth){
            this.init()
            this.translateY = 0
        }
    }
}

class CanvasBackground{
    constructor(id){
        this.canvas = document.getElementById(id)
        this.context = this.canvas.getContext("2d")
        this.dpr = window.devicePixelRatio
    }

    start(){
        this.canvasSize()
        this.generateBabbles()
        this.animate()
    }

    canvasSize(){
        this.canvas.width = this.canvas.offsetWidth * this.dpr
        this.canvas.height = this.canvas.offsetHeight * this.dpr
        this.context.scale(this.dpr, this.dpr)
    }

    generateBabbles(){
        this.bubbleList = []
        this.bubbleCount = Math.floor(this.canvas.width / 15)
        for(let i = 1; i <= this.bubbleCount; i++){
            this.bubbleList.push(new Bubble(this.canvas))
        }
    }

    animate(){
        this.context.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight)
        this.bubbleList.forEach((item) => {
            item.move()
            this.context.translate(item.translateX, item.translateY)
            this.context.beginPath()
            this.context.shadowBlur = item.blur;
            this.context.shadowColor = `rgb(${item.color})`
            this.context.arc(0, 0, item.size, 0, 2 * Math.PI)
            this.context.fillStyle = `rgba(${item.color}, ${item.alpha})`;
            this.context.fill()
            this.context.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)
        })
        requestAnimationFrame(this.animate.bind(this))
   }
}

const canvasBackgroundAbout = new CanvasBackground("about_canvas")
canvasBackgroundAbout.start()

const canvasBackgroundForm = new CanvasBackground("form_canvas")
canvasBackgroundForm.start()

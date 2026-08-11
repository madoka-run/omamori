import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["phase", "flowers", "startButton"]
    static values = {inhale: Number, hold: Number, exhale: Number}

    MAX_CYCLES = 5

    connect() {
        this.flowerEmojis = ["🌸", "🌷", "🌹", "🌺", "🌻", "🌼"]

        this.phases = [
            {type: "inhale", label: "秒吸って", seconds: this.inhaleValue },
            {type: "hold", label: "秒止めて", seconds: this.holdValue },
            {type: "exhale", label: "秒吐いて", seconds: this.exhaleValue },
        ]

        this.currentPhaseIndex = 0
        this.currentFlowers = []
        this.cycleCount = 0
    }

    start(){
        if(this.timer)return

        this.startButtonTarget.hidden = true
        this.startPhase()
    }

    startPhase(){
        const phase = this.phases[this.currentPhaseIndex]
        this.phaseTarget.textContent = `${phase.seconds}${phase.label}`

        if (phase.type === "inhale") {
            this.currentFlowers = []
            this.flowersTarget.textContent = ""
        }    

        let count = 0

        this.timer = setInterval(() => {
            count++

            if(phase.type === "inhale"){
                this.currentFlowers.push(this.flowerEmojis[count-1])
                this.flowersTarget.textContent = this.currentFlowers.join("")
            } else if (phase.type === "exhale"){
                this.currentFlowers.pop()
                this.flowersTarget.textContent = this.currentFlowers.join("")
            } else if (phase.type === "hold") {
                this.flowersTarget.textContent = this.currentFlowers.join("") + "\n" + "🫧".repeat(count)
            }
    
            if(count === phase.seconds) {
                clearInterval(this.timer)
                this.goToNextPhase()
            }
        },1000)
    }

    goToNextPhase() {
        const isLastPhaseOfCycle = this.currentPhaseIndex === this.phases.length - 1
        if (isLastPhaseOfCycle){
            this.cycleCount++
        }

        if(this.cycleCount >= this.MAX_CYCLES) {
            this.finish()
            return
        }

        this.currentPhaseIndex = (this.currentPhaseIndex + 1) % this.phases.length
        this.startPhase()
    }

    finish() {
        this.phaseTarget.textContent = "呼吸法が終わりました"
        this.flowersTarget.textContent = ""
    }
}
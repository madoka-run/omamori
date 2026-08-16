import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["phase", "startButton", "choices", "leaf"]
    static values = {inhale: Number, hold: Number, exhale: Number, anxietyLogId: String}

    MAX_CYCLES = 5

    connect() {
        console.log("breathing controller connected")

        this.phases = [
            {type: "inhale", label: "秒吸って", icon: "↑", seconds: this.inhaleValue },
            {type: "hold", label: "秒止めて", icon: "■", seconds: this.holdValue },
            {type: "exhale", label: "秒吐いて", icon: "↓", seconds: this.exhaleValue },
        ]

        this.currentPhaseIndex = 0
        this.cycleCount = 0
    }

    start() {
        console.log("start clicked")

        if (this.timer) return

        this.startButtonTarget.hidden = true
        this.startPhase()
    }

    restart() {
        this.choicesTarget.hidden = true
        this.currentPhaseIndex = 0
        this.cycleCount = 0
        this.startPhase()
    }

        startPhase() {
        const phase = this.phases[this.currentPhaseIndex]
        this.phaseTarget.innerHTML = `${phase.icon} <span class="phase-number">${phase.seconds}</span>${phase.label}`

        if (phase.type === "inhale" || phase.type === "exhale") {
            const staggerDuration = phase.seconds / this.leafTargets.length

            this.leafTargets.forEach((leaf, index) => {
                leaf.style.transitionDuration = `${staggerDuration}s`
                leaf.style.transitionDelay = `${staggerDuration * index}s`
                leaf.style.opacity = phase.type === "inhale" ? 1 : 0
            })
        }

        let count = 0

        this.timer = setInterval(() => {
            count++

            if (count === phase.seconds) {
                clearInterval(this.timer)
                this.goToNextPhase()
            }
        }, 1000)
    }


    goToNextPhase() {
        const isLastPhaseOfCycle = this.currentPhaseIndex === this.phases.length - 1

        if (isLastPhaseOfCycle) {
            this.cycleCount++
        }

        if (this.cycleCount >= this.MAX_CYCLES) {
            this.finish()
            return
        }

        this.currentPhaseIndex = (this.currentPhaseIndex + 1) % this.phases.length
        this.startPhase()
    }

    finish() {
        this.phaseTarget.textContent = "呼吸法が終わりました"
        this.choicesTarget.hidden = false
    }
}

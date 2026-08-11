import { Controller} from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["minutes"]
    static values = { startedAt: String }

    connect() {
        this.update()
        this.timer = setInterval (() => {
            this.update()
        }, 1000)
    }

    disconnect() {
        clearInterval(this.timer)
    }

    update() {
        const startedAt = new Date(this.startedAtValue)
        const now = new Date()
        const elapsedSeconds = Math.floor((now - startedAt) / 1000)
        const elapsedMinutes = Math.floor(elapsedSeconds / 60)

        this.minutesTarget.textContent = elapsedMinutes
    }
}
import { Controller} from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["hoursWrapper", "hours", "minutes", "seconds", "display"]
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
        const hours = Math.floor(elapsedSeconds / 3600)
        const minutes = Math.floor((elapsedSeconds % 3600) / 60)
        const seconds = elapsedSeconds % 60

        this.hoursTarget.textContent = hours
        this.minutesTarget.textContent = minutes
        this.secondsTarget.textContent = seconds
        this.hoursWrapperTarget.hidden = hours === 0
    }

    toggle() {
        this.displayTarget.hidden = !this.displayTarget.hidden
    }
}

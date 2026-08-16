import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["detail", "backdrop"]

    toggle(event) {
        const clickedDetail = event.currentTarget.nextElementSibling
        const willOpen = clickedDetail.hidden

        this.detailTargets.forEach((detail) => {
            detail.hidden = detail === clickedDetail ? !detail.hidden : true
        })

        this.backdropTarget.hidden = !willOpen
    }

    closeAll() {
        this.detailTargets.forEach((detail) => { detail.hidden = true })
        this.backdropTarget.hidden = true
    }
}


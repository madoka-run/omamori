import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["detail"]

    toggle() {
        this.detailTarget.hidden = !this.detailTarget.hidden
    }
}
export class Day {
    constructor(props) {
        this.index = props.index;
				this.day = props.day;
				this.prevDay = props.prevDay;

				this.row = this.row()
    }

    newPositive() {
      return this.prevDay ? this.day.positive - this.prevDay.row.positive : this.day.positive
    }

    totalRecovered() {
			return this.prevDay ? this.prevDay.row.totalRecovered + this.day.recovered : 0
		}

		prevActiveInfected() {
			return this.prevDay ? this.prevDay.row.activeInfected : 0
		}

		activeInfected() {
			return this.day.positive - (this.totalRecovered() + this.day.death)
		}

		infectionRate() {
			return this.prevDay ? Math.round(100 * (1 + this.newPositive() / this.prevDay.row.activeInfected)) / 100 : null
		}

		date() {
			let dateString = this.day.date.toString()

			let date = new Date(dateString.substring(0, 4)+'-'+dateString.substring(4, 6)+'-'+dateString.substring(6, 8))

			var options = { year: 'numeric', month: 'long', day: 'numeric' };

			return date.toLocaleDateString("en-US", options)
		}

		row() {
			return Object.assign(this.day, {
				prevActiveInfected: this.prevActiveInfected(),
				newPositive: this.newPositive(),
				totalRecovered: this.totalRecovered(),
				activeInfected: this.activeInfected(),
				infectionRate: this.infectionRate(),
				date: this.date()
			})
		}
}
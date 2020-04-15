import axios from 'axios'
import moment from 'moment'

class CoronaCache
{
 	constructor(props) {
		if (props.callback) {
			this.callback = props.callback
		}

		this.setEarliestDate()
		this.loadCachedDays()

		this.valid = false
		if (!this.valid)
		{
			this.buildCache()
		}
 	}

 	setEarliestDate() {
			this.earliestCacheDate = moment().subtract(3, 'hours').toDate()
 	}

 	loadCachedDays()
 	{
 		let cachedData = localStorage.getItem('coronadata')

 	 	if (!cachedData) {
			this.valid = false
			return false
 	 	}
		
		this.coronaData = JSON.parse(cachedData)
		let cacheDate = this.coronaData.cacheTimestamp

 	  if (cacheDate < this.earliestCacheDate) {
			this.valid = false
			return
 	  }

		this.callback(this.coronaData)
		this.valid = true
 	}

	buildCache() {
		axios.get('https://covidtracking.com/api/us/daily')
			.then(response => {
				this.coronaData = { cacheTimestamp: Date.now(), data: response.data}
				localStorage.setItem('coronadata', JSON.stringify(this.coronaData))
				this.callback(this.coronaData)		
			})
	}
}

export default CoronaCache
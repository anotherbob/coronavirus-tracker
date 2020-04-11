import axios from 'axios'

class CoronaCache
{
 	constructor(props) {
		if (props.callback) {
			this.callback = props.callback
		}

		this.setDate()
		this.loadCachedDays()

		if (!this.valid)
		{
			this.buildCache()
		}
 	}

 	setDate() {
		console.log('setDate')
 	 	let date = new Date();
 	 	let maxCacheAge = (0 === date.getDay()) ? -2 : -1
 	 	date.setDate(date.getDate() - maxCacheAge)

 	 	this.earliestCacheDate = parseInt(date.getFullYear() + ("0"+(date.getMonth()+1)).slice(-2) + ("0" + date.getDate()).slice(-2))
 	}

 	loadCachedDays()
 	{
 		let cachedData = localStorage.getItem('coronadata')

 	 	if (!cachedData) {
			this.valid = false
			return false
 	 	}
			
		this.coronaData = JSON.parse(cachedData)
		let cacheDate = this.coronaData.lastDay

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
				this.coronaData = { cacheDate: Date.now(), data: response.data}
				localStorage.setItem('coronadata', JSON.stringify(this.coronaData))
				this.callback(this.coronaData)		
			})
	}
}

export default CoronaCache
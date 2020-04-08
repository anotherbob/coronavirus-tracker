import axios from 'axios'

class CoronaCache
{
 	constructor(props) {

		console.log('constructor')
		if (props.callback) {
			this.callback = props.callback
		}

		this.setDate()
		this.loadCachedDays()
// this.valid = false
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
		console.log('loadCachedDays')
 	 	let cachedData = localStorage.getItem('coronadata')

 	 	let coronaData = false

 	 	if (!cachedData) {
			this.valid = false
			return false
 	 	}
			
			// console.log('cachedData', cachedData)
		this.coronaData = JSON.parse(cachedData)
		let cacheAge = coronaData.lastDay

 	  if (cacheAge < this.earliestCacheDate) {
			console.log('cache ages', [cacheAge, this.earliestCacheDate])
			this.valid = false
			return
 	  }

		this.callback(this.coronaData)
		this.valid = true
 	}

	buildCache() {
		console.log('buildCache')
		axios.get('https://covidtracking.com/api/us/daily')
			.then(response => {
				this.coronaData = { lastDay: response.data[0].date, data: response.data}
				localStorage.setItem('coronadata', JSON.stringify(this.coronaData))
				this.callback(this.coronaData)		
			})
	}
}

export default CoronaCache
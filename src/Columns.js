import lodash from 'lodash'

export const columnKeys = [
	"states",
	"positive",
	"negative",
	"pending",
	"hospitalizedCurrently",
	"hospitalizedCumulative",
	"inIcuCurrently",
	"inIcuCumulative",
	"onVentilatorCurrently",
	"onVentilatorCumulative",
	"recovered",
	"death",
	"hospitalized",
	"total",
	"totalTestResults",
	"posNeg",
	"deathIncrease",
	"hospitalizedIncrease",
	"negativeIncrease",
	"positiveIncrease",
	"totalTestResultsIncrease",
	"prevActiveInfected",
	"newPositive",
	"totalRecovered",
	"activeInfected",
	"infectionRate"
];

export const columnsMap = columnKeys.map(function (value) {
		return {"value" : value, "label": lodash.startCase(value)}
	}
)

let tempObjectMap = {}
export const columnsObjectMap = columnKeys.forEach(function (value) {
	tempObjectMap[value] = lodash.startCase(value)
})

export const objectMap = tempObjectMap

export const columnLabels = columnKeys.map(function (value) {
	return lodash.startCase(value)
}
)

export default columnsMap

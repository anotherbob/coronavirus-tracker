import React, { Component } from 'react'
import './Spreadsheet.css'
import { Table } from 'react-bootstrap'
import { Day } from './Day.js'
import CoronaCache from './CoronaCache.js'

class Spreadsheet extends Component {
  constructor(props) {
    super(props)
    this.state = {days:[], isFetching: false}
  }

	componentDidMount() {
    console.log('Spreadsheet componentDidMount')
    this.setState({
      days: [],
      meta: {},
      hasDays: false,
      isFetching: true
    })

    new CoronaCache({callback: this.setData.bind(this)})
  }

  componentDidUpdate(prevProps) {
    if (this.props.days !== prevProps.days)
      this.setState()
  }

  shouldComponentUpdate(props) {
    return true
  }

  setData(days) {
    days = this.formatData(days.data)
    this.setState({ days: days, isFetching: false, hasDays: true})
  }

  formatData(days)
  {
    var recovered = 0;
    var prevActivelyInfected = 0
    var prevDay = null
    days.reverse().map((day, i) => {
      let dayObject = new Day({ index: i, day: day, prevDay: prevDay  })
      days[i] = dayObject.row
      prevDay = dayObject
    })

    return days
  }

  render() {
    const { days } = this.state

		return (
      <div className="Spreadsheet-container">
        <script>var data = {JSON.stringify(days)}</script>
        <Table striped bordered hover className="Spreadsheet">
          <thead className="Spreadsheet-header">
            <tr>
              <th className="Date">Date</th>
              <th className="Confirmed">Confirmed</th>
              <th className="NewInfected">New Infected</th>
              <th className="Recovered">Recovered</th>
              <th className="TotalDead">Dead</th>
              <th className="TotalRecovered">Total Recovered</th>
              <th className="Dead">Total Dead</th>
              <th className="ActiveInfected">Active Infected</th>
              <th className="InfectionRate" title="Non-scientific!">*Infection rate</th>
            </tr>
          </thead>
          <tbody className="Spreadsheet-body">
            {days.reverse().map((day, i) =>
              <tr key={i} keyname={day.idx}>
                <td className="Date" >{day.date}</td>
                <td className="Confirmed" >{day.positive.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</td>
                <td className="NewInfected" >{day.newPositive.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</td>
                <td className="Recovered" >{day.recovered > 0 ? day.recovered.toLocaleString(navigator.language, { minimumFractionDigits: 0 }) : ''}</td>
                <td className="TotalDead" >{day.deathIncrease > 0 ? day.deathIncrease.toLocaleString(navigator.language, { minimumFractionDigits: 0 }) : ''}</td>
                <td className="TotalRecovered" >{day.totalRecovered > 0 ? day.totalRecovered.toLocaleString(navigator.language, { minimumFractionDigits: 0 }) : ''}</td>
                <td className="Dead" >{day.death > 0 ? day.death.toLocaleString(navigator.language, { minimumFractionDigits: 0 }) : ''}</td>
                <td className="ActiveInfected" >{day.activeInfected.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</td>
                <td className="InfectionRate">{day.infectionRate}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
		)
  }		
}
export default Spreadsheet;
  
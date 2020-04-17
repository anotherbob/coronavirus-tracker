import React, { Component } from 'react'
import './Spreadsheet.css'
import { Table } from 'react-bootstrap'
import { Day } from './Day.js'
import CoronaCache from './CoronaCache.js'
import Modal from './Modal.js'
import {Button} from 'react-bootstrap'
import ModalChart from './ModalChart.js'

class Spreadsheet extends Component {
  constructor(props) {
    super(props)
    this.state = {days:[], isFetching: false}
  }

	componentDidMount() {
    this.setState({
      days: [],
      meta: {},
      hasDays: false,
      isFetching: true,
      activeDay: false,
			isOpen: false,
			modalChartIsOpen: false
    })

    new CoronaCache({callback: this.setData.bind(this)})
  }

  toggleModal = event => {
    this.setState({
      activeDay: this.state.days[event.currentTarget.dataset.id],
      isOpen: !this.state.isOpen
    });
  }

	toggleModalChart = event => {
		this.setState({modalChartIsOpen: !this.state.modalChartIsOpen})
	}

  componentDidUpdate(prevProps) {
    if (this.props.days !== prevProps.days)
      this.setState()
  }

  state = {
    isShowingModal: false,
  }
  handleClick = () => this.setState({isShowingModal: true})
  handleClose = () => this.setState({isShowingModal: false})

  shouldComponentUpdate(props) {
    return true
  }

  setData(days) {
    days = this.formatData(days.data)
    this.setState({ days: days, isFetching: false, hasDays: true, isOpen: false, activeDay: false})
  }

  formatData(days) {
    var prevDay = null
    days.reverse().forEach((day, i) => {
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
				<p><Button variant="primary" onClick={this.toggleModalChart}>Chart</Button></p>
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
              <tr key={i} keyname={day.idx} onClick={this.toggleModal} data-id={day.index}>
                <td className="Date" >
                  {day.date}
                </td>
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
        <Modal show={this.state.isOpen} onClose={this.toggleModal} day={this.state.activeDay} />
				<ModalChart show={this.state.modalChartIsOpen} onClose={this.toggleModalChart} days={days} />
      </div>
		)
  }
}
export default Spreadsheet;
  
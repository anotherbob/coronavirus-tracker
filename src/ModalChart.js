import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import Select from 'react-select'
import {Line} from 'react-chartjs-2'
import lodash from 'lodash'
import { columnKeys } from './Columns.js'

class ModalChart extends React.Component {
	dataPoints() {
		let newArray = []
		
		columnKeys.forEach(function (value) {
				newArray.push({"value" : value, "label": lodash.startCase(value)})
			}
		)
		return newArray
	}

	componentDidMount() {
    this.setState({
			endDate: moment().toDate(),
			startDate: moment().subtract(1, 'month').toDate(),
			selectedOption: []
		})
  }

	isChartValid () {
		return (this.state.selectedOption && this.state.selectedOption.length > 0)
	}

	changeStartDate = date => {
    this.setState({
      startDate: date
    });
	};

	changeEndDate = date => {
    this.setState({
      endDate: date
    });
	};

	handleSelectChange = selectedOption => {
    this.setState({ selectedOption: selectedOption });
	};
	
	getDateRange() {
		let startDate = this.state.startDate
		let currentDate = new Date(startDate)
		let endDate = this.state.endDate

		let dates = []
		while (currentDate < endDate) {
			currentDate.setTime(currentDate.getTime() + (24 * 60 * 60 * 1000))
			dates.push(new Date(currentDate))
		}

		return dates
	}

	getLabels() {
		let dates = this.getDateRange()
		let dateLabels = []
		
		dates.forEach((date) => {
			dateLabels.push(moment(date).format("MMM Do"))
		})

		return dateLabels
	}

	getDatasets() {
		let selectedOption = this.state.selectedOption
		let dates = this.getDateRange()
		let records = this.props.days

		let datasets = []

		if (!selectedOption)
		{
			this.valid = false
			return
		}
		
		let colors = 
		// Blue colors
		['#B0E0E6','#ADD8E6','#87CEFA','#87CEEB','#00BFFF','#B0C4DE','#1E90FF','#6495ED','#4682B4','#4169E1','#0000FF','#0000CD','#00008B','#000080','#191970','#7B68EE','#6A5ACD','#483D8B',
		// Red colors
		'#FFA07A','#FA8072','#E9967A','#F08080','#CD5C5C','#DC143C','#B22222','#FF0000','#8B0000',
		// Green
		'#7CFC00','#7FFF00','#32CD32','#00FF00','#228B22','#008000','#006400','#ADFF2F','#9ACD32','#00FF7F','#00FA9A','#90EE90','#98FB98','#8FBC8F','#3CB371','#2E8B57','#808000','#556B2F','#6B8E23',
		// Orange colors
		'#FF7F50','#FF6347','#FF4500','#FFD700','#FFA500','#FF8C00',
		// Yellow colors
		'#FFFFE0','#FFFACD','#FAFAD2','#FFEFD5','#FFE4B5','#FFDAB9','#EEE8AA','#F0E68C','#BDB76B','#FFFF00',
		// Cyan colors
		'#E0FFFF','#00FFFF','#00FFFF','#7FFFD4','#66CDAA','#AFEEEE','#40E0D0','#48D1CC','#00CED1','#20B2AA','#5F9EA0','#008B8B','#008080',
		// Pink colors
		'#FFC0CB','#FFB6C1','#FF69B4','#FF1493','#DB7093','#C71585',
		// Gray colors
		'#DCDCDC','#D3D3D3','#C0C0C0','#A9A9A9','#808080','#696969','#778899','#708090','#2F4F4F','#000000',
		// Brown colors
		'#FFF8DC','#FFEBCD','#FFE4C4','#FFDEAD','#F5DEB3','#DEB887','#D2B48C','#BC8F8F','#F4A460','#DAA520','#CD853F','#D2691E','#8B4513','#A0522D','#A52A2A','#800000',
		// Purple colors
		'#E6E6FA','#D8BFD8','#DDA0DD','#EE82EE','#DA70D6','#FF00FF','#FF00FF','#BA55D3','#9370DB','#8A2BE2','#9400D3','#9932CC','#8B008B','#800080','#4B0082']

		selectedOption.forEach((option) => {
			let color = lodash.sample(colors)
			let dataset = {
				type: 'line',
				label: option.label,
				fill: false,
				borderColor: color,
				backgroundColor: color,
				pointBorderColor: color,
				pointBackgroundColor: color,
				pointHoverBackgroundColor: color,
				pointHoverBorderColor: color,
				data: []
			}
		
			let data = []
			dates.forEach((date) => {
				let dateString = moment(date).format('LL')
				records.forEach((record) => {
					if (record.date === dateString) {
						data.push(record[option.value])
					}
				})
			})
			dataset.data = data

			datasets.push(dataset)
		})

		return datasets
	}

  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
		}

		const { selectedOption } = this.state
	
		const selectOptions = this.dataPoints()

    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50
    };

    // The modal "window"
    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      minHeight: '98%',
      margin: '0 auto',
      padding: 30
    };

		const selectStyle = {
			display: "inline",
			float: "left",
			clear: "none",
			width: 400
		}

		const chartSelectionLine = {
			clear: "both",
			width: "100%",
			height: "40px",
			padding: "8px",
			textAlign: "left"
		}

		const footerStyle = {
			width: '100%',
			textAlign: 'right'
		}

		const data = {
			labels: this.getLabels(),
			datasets: this.getDatasets()
		}

		return (
      <div className="backdrop" style={backdropStyle}>
        <div className="modal-container " style={modalStyle}>
				{ this.props.show 
					? 
						<div>
							<div className="chartContainer">
								{this.isChartValid() ? <Line data={data} /> : ''}
							</div>
							<div className="chartSelectionsContainer">
								<div style = {chartSelectionLine}>Range: <DatePicker selected={this.state.startDate} onChange={this.changeStartDate} /> to <DatePicker selected={this.state.endDate} onChange={this.changeEndDate} /></div>
								<div style={chartSelectionLine}>
									<div style={selectStyle}>
										<Select
											value={selectedOption}
											onChange={this.handleSelectChange}
											options={selectOptions}
											isMulti={true}
											placeholder="Choose chart values"
										/>
									</div>
								</div>
							</div>
						</div>
					: '' }
					<div className="footer" style={footerStyle}>
						<button onClick={this.props.onClose}>Close</button>
					</div>
        </div>
      </div>
    )
  }
}

ModalChart.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
	days: PropTypes.array
}

export default ModalChart
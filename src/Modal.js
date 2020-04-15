import React from 'react'
import { Table } from 'react-bootstrap'
import PropTypes from 'prop-types'
import lodash from 'lodash'

// lifted from https://daveceddia.com/open-modal-in-react/
class Modal extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
		}
		
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
      maxWidth: 500,
      minHeight: 300,
      margin: '0 auto',
      padding: 30
    };

    return (
      <div className="backdrop" style={backdropStyle} onClick={this.props.onClose}>
        <div className="modal-container " style={modalStyle}>
				{ this.props.show 
					? 
						<div>
							{this.props.day.date}
							<Table className="DialogTable" striped bordered hover>
								<tbody>
								{
									Object.keys(this.props.day.formattedNumbers).map((key) =>
										<tr>
											<th>{lodash.startCase(key)}</th>
											<td>{
												this.props.day.formattedNumbers[key].length > 0 
												? this.props.day.formattedNumbers[key] 
												: this.props.day[key] 
													? this.props.day[key].toLocaleString(navigator.language, { minimumFractionDigits: 0 }) 
													: ''}
											</td>
										</tr>
									)
								}
								</tbody>
							</Table>
						</div>
					: '' }
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;
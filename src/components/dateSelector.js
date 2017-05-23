import React , {Component} from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import SlotSelector from './slotSelector';

class DateSelector extends Component {

	constructor(props){
		super(props);

		let firstDay = moment();
		let secondDay = moment(firstDay).add('days',1);
		let thirdDay = moment(secondDay).add('days',1);

		this.state = {
			startDate : moment(),
			firstDay : firstDay.toString(),
			secondDay: secondDay.toString(),
			thirdDay: thirdDay.toString()
		};
	}

	handleChange = (date) => {

		let firstDay = moment(date);
		let secondDay = moment(firstDay).add('days',1);
		let thirdDay = moment(secondDay).add('days', 1);

		this.child.reset();

	    this.setState({
	      startDate: date,
	      firstDay: firstDay.toString(),
	      secondDay: secondDay.toString(),
	      thirdDay: thirdDay.toString()
	    });
  	}

  	slots_data = (numberOfSlots, slotStartTime, slotEndTime) => {
  		this.props.selected_date_data(numberOfSlots, slotStartTime, slotEndTime, this.state.startDate.format("YYYY-MM-DD").toString());
  	}


  	render() {

  		return(
			<div>
			<DatePicker
        		selected={this.state.startDate}
        		onChange={this.handleChange.bind(this)}
        		dateFormat="DD/MM/YYYY"
        		todayButton={"Today"}
        		minDate={moment()}
        		withPortal
        		peekNextMonth
    			showMonthDropdown
    			showYearDropdown
    			dropdownMode="select"
    		/>

    		<SlotSelector first_day = {this.state.firstDay} second_day = {this.state.secondDay} third_day = {this.state.thirdDay} onRef={ref => (this.child = ref)} slots_data = {this.slots_data} />
			</div>	
		)
	}
}

export default DateSelector;
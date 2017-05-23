import React , {Component} from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import SlotSelector from './slotSelector';

class DateSelector extends Component {

	constructor(props){
		super(props);

		var firstDay = moment();
		var secondDay = moment(firstDay).add('days',1);
		var thirdDay = moment(secondDay).add('days',1);

		this.state = {
			startDate : moment(),
			firstDay : firstDay.toString(),
			secondDay: secondDay.toString(),
			thirdDay: thirdDay.toString()
		};
	}

	handleChange = (date) => {

		var firstDay = moment(date);
		var secondDay = moment(firstDay).add('days',1);
		var thirdDay = moment(secondDay).add('days', 1);

		this.child.reset();

	    this.setState({
	      startDate: date,
	      firstDay: firstDay.toString(),
	      secondDay: secondDay.toString(),
	      thirdDay: thirdDay.toString()
	    });
  	}

  	slots_data = (data) => {
  		
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
        		// isClearable={true}
    		/>

    		<SlotSelector first_day = {this.state.firstDay} second_day = {this.state.secondDay} third_day = {this.state.thirdDay} onRef={ref => (this.child = ref)} slots_data = {this.slots_data} />
			</div>	

		)
	}
}

export default DateSelector;
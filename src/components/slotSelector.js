import React , {Component} from 'react';
import { Icon, Table, Button } from 'semantic-ui-react';

class SlotSelector extends Component {

	constructor(props){
		super(props);

		let isSelected = [];
		let iconName = [];
		for(var i=0; i<9; i++){
			isSelected[i] = 0;
			iconName[i] = "genderless";
		}
		this.state = {
			isSelected : isSelected,
			iconName : iconName,
			number_of_slots_selected : 0,
			starting_slot: "",
			ending_slot: "",
			starting_slots_date_time: "",
			ending_slots_date_time: ""
		}	
	}

	componentDidMount() {
    this.props.onRef(this)
  	}
  	componentWillUnmount() {
    this.props.onRef(null)
  	}

	reset = () => {
		console.log(" reset ....");
		let s = this.state.isSelected.slice();
		let name = this.state.iconName.slice();
		for(var i=0; i<9; i++){
			s[i] = 0;
			name[i] = "genderless";
		}
		this.setState({isSelected:s , iconName: name, number_of_slots_selected: 0, starting_slot: "", ending_slot: "",
					  starting_slots_date_time: "", ending_slots_date_time: ""});

		this.props.slots_data(0 , "" , "");

	}

	dayClick = (data,key) => {
		
		let s = this.state.isSelected.slice();
		let name = this.state.iconName.slice();
		let next_key;
		let found = 0;
		let number_of_slots_selected = this.state.number_of_slots_selected;
		let starting_slot = this.state.starting_slot;
		let ending_slot = this.state.ending_slot;


		if(s[key] == 0){	
		 	s[key] = 1;
		 	number_of_slots_selected = number_of_slots_selected + 1;
		 	name[key] = "checkmark";
		 	
		 	
		 	if(s[key-1] != 1 && s[key+1] != 1) {
		 		for(var i=0; i<key; i++){
		 			if(s[i] == 1) {
		 				next_key = i;
		 				found = 1;
		 				
		 			}
		 		}
		 		if(found == 0) {
		 			for(var i=key+1; i<9; i++){
		 				if(s[i] == 1) {
		 					next_key = i;
		 					found = 1;
		 					
		 				}
		 			}
		 		}
		 		if(next_key < key) {
		 			for(i=next_key+1; i<key ; i++){
		 				s[i] = 1;
		 				number_of_slots_selected = number_of_slots_selected + 1;
		 				name[i] = "checkmark";
		 			}
		 		} else {
		 			for(i=key+1; i<next_key; i++){
		 				s[i] = 1;
		 				number_of_slots_selected = number_of_slots_selected + 1;
		 				name[i] = "checkmark";
		 			}
		 		}
		 	}
		} else {
			if(s[key+1] == 1 && s[key-1] == 1){
				for(var i=0 ; i<9; i++){
					s[i] = 0;
					number_of_slots_selected = 0;
					name[i] = "genderless";
					
				}
			} else {
				s[key] = 0;
				number_of_slots_selected = number_of_slots_selected - 1;
				name[key] = "genderless";
			}
		}
		
		let days = [];
		let slots_time = ['8AM-11AM', '12PM-7PM', '8PM-7AM','8AM-11AM', '12PM-7PM', '8PM-7AM','8AM-11AM', '12PM-7PM', '8PM-7AM'];
		for(var i=0; i<9; i++){
			if(i<3){
				days[i] = this.props.first_day.substring(4,11);
			} else if(i>=3 && i<6) {
				days[i] = this.props.second_day.substring(4,11);
			} else {
				days[i] = this.props.third_day.substring(4,11);
			}
		}

		var flag = 0;
		for(var i=0; i<9; i++){
			if(s[i] == 1){
				flag = 1;
			}
		}

		if(flag == 1){
			var i=0;
			while(i<9){
				if(s[i] == 1){
					starting_slot = i;
					break;
				}
				i++;
			}
			var i=8
			while(i>=0){
				if(s[i] == 1){
					ending_slot = i;
					break;
				}
				i--;
			}
		} else {
			starting_slot = "";
			ending_slot = "";
		}
		

		let starting_slots_date_time = days[starting_slot] + slots_time[starting_slot];
		let ending_slots_date_time = days[ending_slot] + slots_time[ending_slot];
		this.setState({isSelected: s , iconName: name, number_of_slots_selected: number_of_slots_selected, 
			starting_slot:starting_slot, ending_slot:ending_slot, starting_slots_date_time: starting_slots_date_time,
			ending_slots_date_time: ending_slots_date_time});

		this.props.slots_data(number_of_slots_selected, starting_slots_date_time, ending_slots_date_time);
			
	}

	render(props){

		let firstDateString = this.props.first_day;
		let secondDateString = this.props.second_day;
		let thirdDateString = this.props.third_day;
		let first_day = firstDateString.substring(4,11);
		let second_day = secondDateString.substring(4,11);
		let third_day = thirdDateString.substring(4,11);		

		return(
			<div>
			<br/>
			<Table celled structured>
			    <Table.Header>
			        <Table.Row>
			          <Table.HeaderCell textAlign='center' rowSpan='2'>Select Slots</Table.HeaderCell>
			          <Table.HeaderCell textAlign='center' rowSpan='2'>Morning 8 AM - 11 AM</Table.HeaderCell>
			          <Table.HeaderCell textAlign='center' rowSpan='2'>Day 12 PM - 7 PM</Table.HeaderCell>
			          <Table.HeaderCell textAlign='center' rowSpan='2'>Night 8 PM - 7 AM</Table.HeaderCell>
			        </Table.Row>
			    </Table.Header>

			    <Table.Body>
			        <Table.Row>
			          	<Table.Cell textAlign='center' rowSpan="1">{first_day}</Table.Cell>
			          	<Table.Cell textAlign='center' onClick={() => this.dayClick(0,0)}>
			            	<Icon color='orange' name={this.state.iconName[0]} size='large' />
			          	</Table.Cell>
			          	<Table.Cell textAlign='center' onClick={() => this.dayClick(0,1)}>
			            	<Icon color='teal' name={this.state.iconName[1]} size='large' />
			          	</Table.Cell>
			          	<Table.Cell textAlign='center' onClick={() => this.dayClick(0,2)}>
			            	<Icon color='purple' name={this.state.iconName[2]} size='large' />
			          	</Table.Cell>
			        </Table.Row>
			        <Table.Row>
			          	<Table.Cell textAlign='center' rowSpan="1">{second_day}</Table.Cell>
			          	<Table.Cell textAlign='center' onClick={() => this.dayClick(1,3)}>
			            	<Icon color='orange' name={this.state.iconName[3]} size='large' />
			          	</Table.Cell>
			          	<Table.Cell textAlign='center' onClick={() => this.dayClick(1,4)}>
			            	<Icon color='teal' name={this.state.iconName[4]} size='large' />
			          	</Table.Cell>
			          	<Table.Cell textAlign='center' onClick={() => this.dayClick(1,5)}>
			            	<Icon color='purple' name={this.state.iconName[5]} size='large' />
			          	</Table.Cell>
			        </Table.Row>
			        <Table.Row>
			          	<Table.Cell textAlign='center' rowSpan="1">{third_day}</Table.Cell>
			          	<Table.Cell textAlign='center' onClick={() => this.dayClick(2,6)}>
			            	<Icon color='orange' name={this.state.iconName[6]} size='large' />
			          	</Table.Cell>
			          	<Table.Cell textAlign='center' onClick={() => this.dayClick(2,7)}>
			            	<Icon color='teal' name={this.state.iconName[7]} size='large' />
			          	</Table.Cell>
			          	<Table.Cell textAlign='center' onClick={() => this.dayClick(2,8)}>
			            	<Icon color='purple' name={this.state.iconName[8]} size='large' />
			          	</Table.Cell>
			        </Table.Row>
			    </Table.Body>
			</Table>
			</div>
		)
	}
}

export default SlotSelector;
import React , {Component} from 'react';
import ReactDOM from 'react-dom';
import { Grid, Image, Button } from 'semantic-ui-react';
import moment from 'moment';
import CitySearch from './components/citySearch';
import DateSelector from './components/dateSelector';
import GuestSelector from './components/guestSelector';


class App extends Component {

	constructor(props){
		super(props);
		this.state = {
			search_city : "Delhi",
			guests_total : "",
			rooms_total : "",
			slots_selected : "",
			starting_slot: "",
			ending_slot:"",
			check_in_date: moment().format("YYYY-MM-DD").toString()
		}
	}

	city_search = (data) => {
		this.setState({search_city: data});
	}

	room_guest = (rc, gc) => {
		this.setState({rooms_total: rc, guests_total: gc});
	}

	selected_date = (numberOfSlots, slotsStartTime, slotsEndTime, checkInDate) => {
		this.setState({slots_selected: numberOfSlots, starting_slot: slotsStartTime,
						ending_slot: slotsEndTime, check_in_date: checkInDate});
	}

	search = () => {
		if(this.state.slots_selected) {
			alert("Perform POST request with following parameters \n\n"+
				"1) City : "+ this.state.search_city +"\n"+
				"2) Selected Date : "+ this.state.check_in_date+ "\n"+
				"3) Starting Slot : "+ this.state.starting_slot+ "\n"+
				"4) Ending Slot : "+ this.state.ending_slot +"\n"+
				"5) Number of Slots : "+this.state.slots_selected+ "\n"+
				"6) Number of Guests : "+this.state.guests_total+"\n"+
				"7) Number of Rooms : "+this.state.rooms_total);
		} else {
			alert("Select slots for searching ... ");
		}
	}
	
	render(){
		return(
		<div>
			<Grid celled>
			    <Grid.Row>
			      	<Grid.Column width={5}>
			      	<Image src='./src/images/logo_opt_gray.png' />
			        <br/>
			        <CitySearch search_data = {this.city_search}/>
			        <br/>
			        <GuestSelector room_guest_data = {this.room_guest} />
			     	<br/>
			     	<Button color='orange' fluid onClick={() => this.search()}> Search </Button>
			      	</Grid.Column>
			      	<Grid.Column width={11}>
			        <DateSelector selected_date_data = {this.selected_date} />
			      	</Grid.Column>
			    </Grid.Row>
			</Grid>	
		</div>
		)
	}	
}

ReactDOM.render(<App />, document.querySelector('.container'));

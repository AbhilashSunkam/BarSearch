import React , {Component} from 'react';
import ReactDOM from 'react-dom';
import { Grid, Image, Button } from 'semantic-ui-react';

import CitySearch from './components/citySearch';
import DateSelector from './components/dateSelector';
import GuestSelector from './components/guestSelector';


class App extends Component {

	constructor(props){
		super(props);
		this.state = {
			search_city : "",
			guests_total : "",
			rooms_total : "",
			slots_selected : "",
			starting_slot: "",
			ending_slot:"",
			check_in_date: ""
		}
	}

	city_search = (data) => {
		this.setState({search_city: data});
	}

	room_guest = (rc, gc) => {
		this.setState({rooms_total: rc, guests_total: gc});
	}

	selected_date = (numberOfSlots, slotsStartTime, slotsEndTime) => {
		this.setState({slots_selected: numberOfSlots, starting_slot: slotsStartTime,
						ending_slot: slotsEndTime});
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
			     	<Button color='orange' fluid onClick={() => this.search}> Search </Button>
			      	</Grid.Column>
			      	<Grid.Column width={11}>
			        <DateSelector selected_date_data = {this.selected_date} />
			      	</Grid.Column>
			    </Grid.Row>
			</Grid>
			<p>City {this.state.search_city} </p>
			<p>Guests {this.state.guests_total} </p>
			<p>Rooms {this.state.rooms_total} </p>
			<p>No of slots {this.state.slots_selected} </p>
			<p>starting_slot {this.state.starting_slot} </p>
			<p>ending_slot {this.state.ending_slot} </p>
			<p>Check in Date {this.state.check_in_date} </p>
		</div>
		)
	}	
}

ReactDOM.render(<App />, document.querySelector('.container'));

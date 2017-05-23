import React , {Component} from 'react';
import { Icon, Button , Grid} from 'semantic-ui-react'

class GuestSelector extends Component {

	constructor(props){
		super(props);
		this.state = {
			room : 1,
			guest : 1
		}
		this.props.room_guest_data(this.state.room, this.state.guest);
	}

	incRoomCount = () => {
		let room_count = this.state.room;
		let guest_count = this.state.guest;
		if(room_count == guest_count) {
			room_count = room_count + 1;
			guest_count = guest_count + 1;
		} else {
			room_count = room_count + 1;
		}
		this.setState({room : room_count, guest: guest_count});
		this.props.room_guest_data(room_count, guest_count);
	}

	decRoomCount = () => {
		let room_count = this.state.room;
		let guest_count = this.state.guest;
		let max_guest ;
		if(room_count > 1) {
			room_count = room_count - 1;
			max_guest = room_count * 2;
			if(guest_count > max_guest) {
				guest_count = max_guest;
			}
		this.setState({room: room_count, guest: guest_count});
		this.props.room_guest_data(room_count, guest_count);
		}
	}

	incGuestCount = () => {
		let room_count = this.state.room;
		let guest_count = this.state.guest;
		let max_guest = room_count * 2;
		if(guest_count == max_guest){
			room_count = room_count+1;
			guest_count = guest_count+1;
		} else if (guest_count < max_guest) {
			guest_count = guest_count+1;
		} else {
			guest_count = guest_count+1;
			room_count = room_count+1;
		}
		this.setState({room: room_count, guest: guest_count});
		this.props.room_guest_data(room_count, guest_count);
	}

	decGuestCount = () => {
		let room_count = this.state.room;
		let guest_count = this.state.guest;
		let max_guest = room_count * 2;
		let min_room;
		if(guest_count > 1){
			if(room_count == guest_count){
				room_count = room_count - 1;
				guest_count = guest_count - 1;
			} else {
				guest_count = guest_count - 1;
				min_room = Math.ceil(guest_count/2);
				if(room_count > min_room){
					room_count = min_room;
				}
			}
		}
		this.setState({room: room_count, guest: guest_count});
		this.props.room_guest_data(room_count, guest_count);
	}

	render(){
		return (
			<div>
				<Button.Group fluid>
				<Button color='vk'>Rooms</Button>
    			<Button>{this.state.room}</Button>
    			<Button color='vk' onClick = {() => this.incRoomCount()}>
    				<Icon size='small' name="add" />
    			</Button>
    			<Button color='vk' onClick = {() => this.decRoomCount()}>
    				<Icon size='small' name="minus" />
    			</Button>
  				</Button.Group>
  				<br/><br/>
  				<Button.Group fluid>
				<Button color='vk'>Guests</Button>
    			<Button>{this.state.guest}</Button>
    			<Button  color='vk' onClick = {() => this.incGuestCount()}>
    				<Icon size='small' name="add" />
    			</Button>
    			<Button  color='vk' onClick = {() => this.decGuestCount()}>
    				<Icon size='small' name="minus" />
    			</Button>
  				</Button.Group>
			</div>
		)
	}
}

export default GuestSelector;
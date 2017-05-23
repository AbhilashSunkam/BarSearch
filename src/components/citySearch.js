import React , {Component} from 'react';
import { Dropdown } from 'semantic-ui-react';

const options = [
					{key:'dl',value:'Delhi',text:'Delhi'}, 
					{key:'bl',value:'Bangalore',text:'Bangalore'}, 
					{key:'mum',value:'Mumbai',text:'Mumbai'}, 
					{key:'kol',value:'Kolkata',text:'Kolkata'}, 
					{key:'gur',value:'Gurgaon',text:'Gurgaon'}, 
					{key:'pun',value:'Pune',text:'Pune'}
				];

class CitySearch extends Component{

	constructor(props){
		super(props);
		this.state = {
			value : "Delhi"
		}
		
	}

	change = (e, data) => {
		
		this.setState({value: data.value})	
		this.props.search_data(data.value);	
	}

	render() {
		return(
			<div>
			<Dropdown defaultValue='Delhi' fluid placeholder='Select City' onChange={this.change.bind(this)} search selection options={options}/>
			</div>
		)
	}
}

export default CitySearch;

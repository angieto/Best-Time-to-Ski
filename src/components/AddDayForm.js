import { PropTypes, Component } from 'react'

const resorts = [
	"Alpental",
	"Alta Crystal",
	"Stevens Pass", 
	"Summit at Snoqualmie",
	"Summit West at Snoqualmie", 
	"Summit Nordic Center",
	"Summit Central at Snoqualmie Summit",
	"Sugar Bowl"
]

// create an autocomplete list of resorts
class Autocomplete extends Component {
	// methods
	// get ref's value
	get value() {
		return this.refs.inputResort.value
	}
	// set ref's value
	set value(input) {
		this.refs.inputResort.value = input
	}

	render() {
		return (
			<div>
				<input type="text" 
					   list="resorts" 
					   ref="inputResort" />
				<datalist id="resorts">
					{this.props.options.map(
						(opt, i) => <option key={i}>{opt}</option>
					)}
				</datalist>
			</div>
		)
	}
}

export const AddDayForm = ({ resort, 
							 date, 
							 powder, 
							 backcountry,
							 onNewDay }) => {
	
	let _resort, _date, _powder, _backcountry
	
	const submit = (e) => {
		e.preventDefault()
		onNewDay({
			resort: _resort.value,
			date: _date.value,
			powder: _powder.checked,
			backcountry: _backcountry.checked
		})
		 _resort.value = ""
		 _date.value = ""
		 _powder.checked = false
		 _backcountry.checked = false

	}

	return (
		<form onSubmit={submit} className="add-day-form">

			<label htmlFor="resort">Resort Name</label>
			{/* render Autocomplete component */}
			<Autocomplete options={resorts} ref={input => _resort = input} />

			<label htmlFor="date">Date</label>
			<input id="date" 
				   type="date" 
				   required 
				   defaultValue={date}
				   ref={input => _date = input}/>

			<div>
				<input id="powder" 
					   type="checkbox" 
					   defaultChecked={powder}	
					   ref="powder"
					   ref={input => _powder = input}/>
				<label htmlFor="powder">Powder Day</label>
			</div>

			<div>	
				<input id="backcountry" 
					   type="checkbox"
					   defaultChecked={backcountry} 
					   ref="backcountry"
					   ref={input => _backcountry = input}/>
				<label htmlFor="backcountry">
					Backcountry Day
				</label>
			</div>
			<button>Add Day</button>
		</form>
	)
}

AddDayForm.defaultProps = {
	resort: "Bellevue",
	date: "2018-11-16",
	powder: true,
	backcountry: false
}


AddDayForm.propTypes = {
	resort: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	powder: PropTypes.bool.isRequired,
	backcountry: PropTypes.bool.isRequired
}
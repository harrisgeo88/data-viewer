import React, { Component } from 'react';
import * as _ from 'lodash'
import Dropzone from 'react-dropzone'

class App extends Component {

	state = {
		data: null,
		clicked: {}
	}

	click = (href, i) => {
		let {clicked} = this.state
		clicked[i] = true
		this.setState({clicked})
		window.open(href, '_blank')
	}

	reset = () => {
		this.setState({
			data: null
		})
	}

	onDrop = (files) => {
		const reader = new FileReader()
		reader.onload = () => {
			const fileAsBinaryString = reader.result
			this.setState({
				data: JSON.parse(fileAsBinaryString)
			})
		}
		reader.onabort = () => console.log('file reading was aborted')
		reader.onerror = () => console.log('file reading has failed')
		reader.readAsBinaryString(files[0])
	}

	renderDropzone = () => {
		if (!_.size(this.state.data)) {
			return <Dropzone className='dropzone' onDrop={this.onDrop} accept='.json'>
				<h2>Add JSON</h2>
				<p>Click or drop file here to upload.</p>
			</Dropzone>
		}
	}

	renderHouses = () => {
		let {data, clicked} = this.state
		if (_.size(data)) {
			return<div>
				<button onClick={this.reset}>Reset</button>
				<br/>
				{_.map(data, (d, i) => {
					let {title, description, href, img} = d
					return <div key={i} className={'entry' + (clicked[i] === true ? ' clicked' : '')} onClick={() => this.click(href, i)}>
						<img src={img} alt='entry'/>
						<h2 className='title'>{i+1}. {title}<small className='subtitle'>{description}</small></h2>
					</div>
				})}
			</div>
		}
	}
	
	
	render() {
		return <div className="App">
			{this.renderHouses()}
			{this.renderDropzone()}
		</div>
	}
}

export default App;

import React, { Component } from 'react';
import * as _ from 'lodash'
import Dropzone from 'react-dropzone'
import {Menu, Grid, Segment, Icon, Container} from 'semantic-ui-react'

class App extends Component {

	state = {
		data: null,
		file: '',
		clicked: {}
	}

	click = (href, i) => {
		let {clicked} = this.state
		clicked[i] = true
		this.setState({clicked})
		window.open(href, '_blank')
	}

	reset = () => {
		this.setState({data: null})
	}

	onDrop = (files) => {
		const reader = new FileReader()
		reader.onload = () => {
			const fileAsBinaryString = reader.result
			this.setState({
				data: JSON.parse(fileAsBinaryString),
				file: files[0].name
			})
		}
		reader.onabort = () => console.log('file reading was aborted')
		reader.onerror = () => console.log('file reading has failed')
		reader.readAsBinaryString(files[0])
	}

	renderDropzone = () => {
		if (!_.size(this.state.data)) {
			return <Dropzone className='dropzone' onDrop={this.onDrop} accept='.json'>
				<Segment padded='very' textAlign='center' secondary>
					<h1>Drag and drop JSON File Here to Upload</h1>
					<p>or click to open window.</p>
					<Icon name='cloud upload' size='huge' />
				</Segment>
			</Dropzone>
		}
	}

	renderHouses = () => {
		let {data, clicked} = this.state
		if (_.size(data)) {
			return <Grid columns={2} divided>
				<Grid.Row stretched>
					{_.map(data, (d, i) => {
						let {title, description, href, img} = d
						return <Grid.Column key={i} className={clicked[i] === true ? 'clicked' : ''} onClick={() => this.click(href, i)}>
							<h2 className='title'>{i+1}.{title}<small className='subtitle'>{description}</small></h2>
							<img src={img} alt='entry'/>
							<br/><br/><br/><br/><br/>
						</Grid.Column>
					})}
				</Grid.Row>
			</Grid>
		}
	}

	renderNavbar = () => {
		let {data, file} = this.state

		return <Menu className='fixed' id='navbar'>
			<Menu.Item header>Data viewer</Menu.Item>
			{file !== '' && <Menu.Item active={true}>{file}</Menu.Item>}
			<Menu.Menu position='right'>
				{data && <Menu.Item onClick={this.reset}>Reset</Menu.Item>}
			</Menu.Menu>
		</Menu>
	}

	render() {
		return <Container>
			{this.renderNavbar()}
			{this.renderHouses()}
			{this.renderDropzone()}
		</Container>
	}
}

export default App;

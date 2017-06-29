import React, { Component } from 'react'
import PropTypes from 'prop-types'

import FontIcon from 'material-ui/FontIcon'
import RaisedButton from 'material-ui/RaisedButton'
import {Tabs, Tab} from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'

import ChipInput from 'material-ui-chip-input'

import NoteAsMarkdown from 'components/NoteAsMarkdown'

class NoteForm extends Component {
  state = {
    title: '',
    tags: [],
    body: ''
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      title: newProps.title,
      tags: newProps.tags,
      body: newProps.body,
    })
  }

  handleAddTag = (tag) => {
    this.setState({tags: [...this.state.tags, tag]})
  }

  handleDeleteTag = (tag, index) => {
    let tags = [...this.state.tags]
    tags.splice(index, 1)
    this.setState({tags})
  }

  handleSave = () => {
    return this.props.onSave(this.state)
  }

  render() {
    const inputRowStyle = {
      marginTop: '25px'
    }
    return (
      <div>
        <div style={inputRowStyle}>
          <TextField
            fullWidth={true}
            floatingLabelText="Title"
            value={this.state.title}
            onChange={(e, value) => this.setState({'title': value})}
          />
        </div>
        <div style={inputRowStyle}>
          <Tabs>
            <Tab
              icon={<FontIcon color={'black'} className="material-icons">edit</FontIcon>}
            >
              <TextField
                fullWidth={true}
                floatingLabelText="Note"
                value={this.state.body}
                onChange={(e, value) => this.setState({'body': value})}
                multiLine={true}
                rows={8}
                rowsMax={8}
              />
            </Tab>
            <Tab

              icon={<FontIcon color={'black'} className="material-icons">remove_red_eye</FontIcon>}
            >
              <div style={{height: '192px', marginTop: '36px', overflowY: 'scroll'}}>
                <NoteAsMarkdown source={this.state.body}/>
                </div>
            </Tab>
          </Tabs>
        </div>
        <div style={inputRowStyle}>
          <ChipInput
            fullWidth={true}
            floatingLabelText="Tags"
            value={this.state.tags}
            onRequestAdd={tag => this.handleAddTag(tag)}
            onRequestDelete={(tag, index) => this.handleDeleteTag(tag, index)}
          />
        </div>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <RaisedButton primary={true} label="save" onTouchTap={this.handleSave} />
        </div>
      </div>
    )
  }
}

NoteForm.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  onSave: PropTypes.func.isRequired
}

export default NoteForm

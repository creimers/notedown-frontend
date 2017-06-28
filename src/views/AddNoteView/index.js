import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import ChipInput from 'material-ui-chip-input'
import { withRouter } from 'react-router-dom'


class AddNoteView extends Component {

  state = {
    title: '',
    tags: [],
    body: ''
  }

  handleAddTag = (tag) => {
    this.setState({tags: [...this.state.tags, tag]})
  }

  handleDeleteTag = (tag, index) => {
    let tags = [...this.state.tags]
    tags.splice(index, 1)
    this.setState({tags})
  }

  saveNote = async () => {
    // TODO
    this.props.history.push('/notes')
  }

  render() {
    return (
      <div>
        <h1>AddNoteView</h1>
        <div>
          <TextField
            floatingLabelText="Title"
            value={this.state.title}
            onChange={(e, value) => this.setState({'title': value})}
          />
        </div>
        <div>
          <TextField
            floatingLabelText="Note"
            value={this.state.body}
            onChange={(e, value) => this.setState({'body': value})}
            multiLine={true}
            rows={4}
            rowsMax={6}
          />
        </div>
        <div>
          <ChipInput
            floatingLabelText="Tags"
            value={this.state.tags}
            onRequestAdd={tag => this.handleAddTag(tag)}
            onRequestDelete={(tag, index) => this.handleDeleteTag(tag, index)}
          />
        </div>
        <div>
          <RaisedButton primary={true} label="save" onTouchTap={this.saveNote} />
        </div>
      </div>
    )
  }
}


export default withRouter(AddNoteView)

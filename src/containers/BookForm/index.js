import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import {
  Grid,
  Well,
  Panel,
  Image,
  FormControl,
  FormGroup,
  ControlLabel,
  Button,
  Row,
  Col
} from 'react-bootstrap'

import * as BookFormActionCreators from './actions'
import * as BooksActionCreators from '../BookList/actions'

class BookForm extends Component {
  static propTypes = {
    books: PropTypes.arrayOf(PropTypes.object).isRequired,

    postBook: PropTypes.func.isRequired,
    deleteBook: PropTypes.func.isRequired
  }

  constructor () {
    super()

    this.state = {
      selectedBookId: '',

      imageFile: '',
      imagePreviewUrl: ''
    }

    this.onSaveClick = this.onSaveClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onDeleteClick = this.onDeleteClick.bind(this)
    this.resetForm = this.resetForm.bind(this)
  }

  componentDidMount () {
    // Dispatch an action
    this.props.getBooks()
  }

  onSaveClick () {
    const data = new FormData()

    const book = {
      title: this.title.value,
      description: this.description.value,
      price: this.price.value
    }

    const image = this.state.imageFile

    data.append('image', image)
    data.append('book', JSON.stringify(book))

    this.props.postBook(data)
  }

  onDeleteClick = () => {
    this.props.deleteBook(this.state.selectedBookId)
  }

  resetForm () {
    this.props.resetBookForm()

    this.title.value = ''
    this.description.value = ''
    this.price.value = ''

    this.setState({
      imageFile: '',
      imagePreviewUrl: ''
    })
  }

  handleChange = (event) => {
    this.setState({ selectedBookId: event.target.value })
  }

  handleImageChange = (event) => {
    const reader = new FileReader()
    const file = event.target.files[0]

    if (file !== undefined) {
      reader.onloadend = () => {
        this.setState({
          imageFile: file,
          imagePreviewUrl: reader.result })
      }

      reader.readAsDataURL(file)
    } else {
      this.setState({
        imageFile: '',
        imagePreviewUrl: '' })
    }
  }

  render () {
    const booksList = this.props.books.map(book => (
      <option key={book.id} value={book.id}>{book.id} - {book.title}</option>
    ))

    const { imagePreviewUrl } = this.state
    let $imagePreview = null
    if (imagePreviewUrl) {
      $imagePreview = (<Image responsive src={imagePreviewUrl} />)
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>)
    }

    return (
      <Grid>
        <Well>
          <Row>
            <Col xs={12}>
              <Panel>
                <FormGroup controlId="title">
                  <ControlLabel>Title</ControlLabel>
                  <FormControl
                    type="text"
                    placeholder="Title"
                    inputRef={(ref) => { this.title = ref }}
                  />
                </FormGroup>
                <FormGroup controlId="description">
                  <ControlLabel>Description</ControlLabel>
                  <FormControl
                    type="text"
                    placeholder="Description"
                    inputRef={(ref) => { this.description = ref }}
                  />
                </FormGroup>
                <FormGroup controlId="price">
                  <ControlLabel>Price</ControlLabel>
                  <FormControl
                    type="text"
                    placeholder="Price"
                    inputRef={(ref) => { this.price = ref }}
                  />
                </FormGroup>
                <Row>
                  <FormGroup controlId="image">
                    <Col xs={6}>
                      <ControlLabel>Image</ControlLabel>
                      <FormControl
                        type="file"
                        label="Image"
                        onChange={e => this.handleImageChange(e)}
                        inputRef={(ref) => { this.image = ref }}
                      />
                    </Col>
                    <Col xs={6}>
                      {$imagePreview}
                    </Col>
                  </FormGroup>
                </Row>
                <hr />
                <Button
                  bsStyle={(!this.props.saveButton.style) ? ('primary') : (this.props.saveButton.style)}
                  onClick={(this.props.bookForm.isBookSaved) ? (this.resetForm) : (this.onSaveClick)}
                >
                  {this.props.saveButton.text}
                </Button>
              </Panel>
              <Panel style={{ marginTop: '25px' }}>
                <FormGroup controlId="formControlsSelect">
                  <ControlLabel>Select a book to delete</ControlLabel>
                  <FormControl onChange={this.handleChange} componentClass="select" placeholder="select">
                    <option value="select">select</option>
                    {booksList}
                  </FormControl>
                </FormGroup>
                <Button bsStyle="danger" onClick={this.onDeleteClick}>Delete</Button>
              </Panel>
            </Col>
          </Row>
        </Well>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  books: state.books,
  bookForm: state.bookForm,
  saveButton: state.bookForm.saveButton,
  router: state.router
})

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getBooks: BooksActionCreators.getBooks,
    postBook: BooksActionCreators.postBook,
    deleteBook: BooksActionCreators.deleteBook,

    resetBookForm: BookFormActionCreators.resetBookForm
  },
  dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(BookForm)

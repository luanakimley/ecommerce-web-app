import React from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { Form, Button, InputGroup } from "react-bootstrap";
import Swal from "sweetalert2";
import { XLg } from "react-bootstrap-icons";
import axios from "axios";
import { Trash } from "react-bootstrap-icons";
import {
  SERVER_HOST,
  CATEGORIES,
  COLOURS,
} from "../../config/global_constants.js";

class EditProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      price: "",
      description: "",
      categories: [],
      selectedCategory: "",
      stock: "",
      colours: [],
      photos: [],
      selectedColours: "",
      selectedFiles: null,
      redirectToHome: false,
    };
  }

  componentDidMount() {
    axios.defaults.withCredentials = true;

    axios
      .get(`${SERVER_HOST}/products/${this.props.match.params.id}`, {
        headers: { authorization: localStorage.token },
      })
      .then((res) => {
        if (res.data) {
          if (res.data.errorMessage) {
            console.log(res.data.errorMessage);
          } else {
            this.setState({
              productName: res.data.productName,
              price: res.data.price,
              description: res.data.description,
              categories: res.data.categories,
              stock: res.data.stock,
              colours: res.data.colours,
              photos: res.data.photos,
            });

            res.data.photos.map((photo) => {
              return axios
                .get(`${SERVER_HOST}/products/photo/${photo.filename}`)
                .then((res) => {
                  if (res.data) {
                    if (res.data.errorMessage) {
                      console.log(res.data.errorMessage);
                    } else {
                      document.getElementById(
                        photo._id
                      ).src = `data:;base64,${res.data.image}`;
                    }
                  } else {
                    console.log("Record not found");
                  }
                });
            });
          }
        } else {
          console.log(`Product not found`);
        }
      });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFileChange = (e) => {
    this.setState({ selectedFiles: e.target.files });
  };

  addCategory = (e) => {
    if (
      this.state.selectedCategory !== "" &&
      !this.state.categories.includes(this.state.selectedCategory)
    ) {
      this.setState({
        categories: [...this.state.categories, this.state.selectedCategory],
      });
    }
  };

  removeCategory = (e) => {
    this.setState({
      categories: this.state.categories.filter(
        (g) => g !== e.currentTarget.dataset.id
      ),
    });
  };

  addColour = (e) => {
    if (
      this.state.selectedColours !== "" &&
      !this.state.colours.includes(this.state.selectedColours)
    ) {
      this.setState({
        colours: [...this.state.colours, this.state.selectedColours],
      });
    }
  };

  removeColour = (e) => {
    this.setState({
      colours: this.state.colours.filter(
        (g) => g !== e.currentTarget.dataset.id
      ),
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    axios.defaults.withCredentials = true;

    let formData = new FormData();

    formData.append("productName", this.state.productName);
    formData.append("price", this.state.price);
    formData.append("description", this.state.description);
    for (let i = 0; i < this.state.categories.length; i++) {
      formData.append("categories", this.state.categories[i]);
    }
    formData.append("stock", this.state.stock);
    for (let i = 0; i < this.state.colours.length; i++) {
      formData.append("colours", this.state.colours[i]);
    }

    if (this.state.selectedFiles !== null) {
      for (let i = 0; i < this.state.selectedFiles.length; i++) {
        formData.append("productPhotos", this.state.selectedFiles[i]);
      }
    } else {
      for (let i = 0; i < this.state.photos.length; i++) {
        formData.append("productPhotos", JSON.stringify(this.state.photos[i]));
      }
    }

    axios
      .put(`${SERVER_HOST}/products/${this.props.match.params.id}`, formData, {
        headers: { authorization: localStorage.token },
      })
      .then((res) => {
        if (res.data) {
          if (res.data.errorMessage) {
            console.log(res.data.errorMessage);
            Swal.fire({
              title: "Product not updated",
              text: res.data.errorMessage,
              icon: "error",
              confirmButtonColor: "#123c69",
              showConfirmButton: true,
            });
          } else {
            console.log("Product updated");
            Swal.fire({
              title: "Product updated",
              text: "The product details have been updated.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            this.setState({ redirectToHome: true });
          }
        } else {
          console.log("Product not updated");
          Swal.fire({
            title: "Product not updated",
            text: "Make sure that data is valid.",
            icon: "error",
            confirmButtonColor: "#123c69",
            showConfirmButton: true,
          });
        }
      });
  };

  validateProductName() {
    return this.state.productName !== "";
  }

  validatePrice() {
    return this.state.price > 0;
  }

  validateDescription() {
    return this.state.description !== "";
  }

  validateCategories() {
    return (
      this.state.categories.length !== 0 && this.state.categories !== undefined
    );
  }

  validateStock() {
    return this.state.stock >= 0;
  }

  validateColours() {
    return this.state.colours.length !== 0 && this.state.colours !== undefined;
  }

  validate() {
    return {
      productName: this.validateProductName(),
      price: this.validatePrice(),
      description: this.validateDescription(),
      categories: this.validateCategories(),
      stock: this.validateStock(),
      colours: this.validateColours(),
    };
  }

  render() {
    console.log(JSON.stringify(this.state.photos[0]));
    console.log(this.state.selectedFiles);

    const formInputsState = this.validate();
    const inputsAreAllValid = Object.keys(formInputsState).every(
      (index) => formInputsState[index]
    );

    let productNameError = "";
    let priceError = "";
    let descriptionError = "";
    let categoriesError = "";
    let stockError = "";
    let coloursError = "";

    if (!this.validateProductName()) {
      productNameError = (
        <p className="text-danger mt-2">Product name is required.</p>
      );
    }
    if (!this.validateDescription()) {
      descriptionError = (
        <p className="text-danger mt-2">Product description is required.</p>
      );
    }
    if (!this.validatePrice()) {
      priceError = (
        <p className="text-danger mt-2">Price must be a positive number.</p>
      );
    }
    if (!this.validateCategories()) {
      categoriesError = (
        <p className="text-danger mt-2">Choose at least 1 category.</p>
      );
    }
    if (!this.validateStock()) {
      stockError = (
        <p className="text-danger mt-2">Stock must be a positive number.</p>
      );
    }
    if (!this.validateColours()) {
      coloursError = (
        <p className="text-danger mt-2">Choose at least 1 colour.</p>
      );
    }

    return (
      <div className="container p-3">
        {this.state.redirectToHome ? <Redirect to="/shop" /> : null}

        <div className="card flex-column border-0 shadow rounded-3 overflow-hidden p-4 m-4">
          <h2 className=" text-center mt-3  ">Edit Product</h2>
          <div className="form-container m-4">
            <Form>
              <Form.Group className="mt-2" controlId="productName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  name="productName"
                  value={this.state.productName}
                  onChange={this.handleChange}
                />
                {productNameError}
              </Form.Group>

              <Form.Group className="mt-2" controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  name="price"
                  value={this.state.price}
                  onChange={this.handleChange}
                />
                {priceError}
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  as="textarea"
                  value={this.state.description}
                  onChange={this.handleChange}
                />
                {descriptionError}
              </Form.Group>

              <Form.Group className="mt-2" controlId="categories">
                <Form.Label>Categories</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="selectedCategory"
                    as="select"
                    onChange={this.handleChange}
                    defaultValue={"DEFAULT"}
                  >
                    <option value="DEFAULT" disabled>
                      Select category...
                    </option>
                    {CATEGORIES.filter(
                      (g) => !this.state.categories.includes(g)
                    ).map((g) => (
                      <option key={g} value={g}>
                        {g.toUpperCase()}
                      </option>
                    ))}
                  </Form.Control>

                  <Button
                    variant="outline-secondary"
                    onClick={this.addCategory}
                  >
                    Add Category
                  </Button>
                </InputGroup>
                {this.state.categories.map((g) => (
                  <span className="badge badge-secondary p-1 mt-2 mr-2" key={g}>
                    {g.toUpperCase()}
                    <XLg
                      data-id={g}
                      className="ml-1"
                      onClick={this.removeCategory}
                    />
                  </span>
                ))}
                {categoriesError}
              </Form.Group>

              <Form.Group className="mt-2" controlId="stock">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="text"
                  name="stock"
                  value={this.state.stock}
                  onChange={this.handleChange}
                />
                {stockError}
              </Form.Group>

              <Form.Group className="mt-2" controlId="colours">
                <Form.Label>Colours</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="selectedColours"
                    as="select"
                    onChange={this.handleChange}
                    defaultValue={"DEFAULT"}
                  >
                    <option value="DEFAULT" disabled>
                      Select colour...
                    </option>
                    {Object.keys(COLOURS)
                      .filter((g) => !this.state.colours.includes(g))
                      .map((g) => (
                        <option key={g} value={g}>
                          {g.toUpperCase()}
                        </option>
                      ))}
                  </Form.Control>

                  <Button variant="outline-secondary" onClick={this.addColour}>
                    Add Colour
                  </Button>
                </InputGroup>
                {this.state.colours.map((g) => (
                  <span className="badge badge-secondary p-1 mt-2 mr-2" key={g}>
                    {g.toUpperCase()}
                    <XLg
                      data-id={g}
                      className="ml-1"
                      onClick={this.removeColour}
                    />
                  </span>
                ))}
                {coloursError}
              </Form.Group>
              <Form.Group controlId="photos" className="mt-2">
                <Form.Label>Photos</Form.Label>
                <Form.Control
                  type="file"
                  multiple
                  onChange={this.handleFileChange}
                />
                <div className="d-flex">
                  {this.state.photos.map((photo) => (
                    <>
                      <img
                        className="rounded mt-3  mr-3 ml-0"
                        key={photo._id}
                        id={photo._id}
                        width="200px"
                        alt="Product"
                      />
                      <Trash />
                    </>
                  ))}
                </div>
              </Form.Group>

              <br />

              <button
                className="btn btn-success mt-3 mr-2"
                onClick={this.handleSubmit}
                disabled={!inputsAreAllValid}
              >
                Edit
              </button>

              <Link to={"/shop"}>
                <button className="btn btn-danger mt-3 ml-2">Cancel</button>
              </Link>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(EditProduct);

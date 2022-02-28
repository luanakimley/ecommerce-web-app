import React from "react";
import { SERVER_HOST } from "../../config/global_constants";
import axios from "axios";

class OrderDetailsRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      price: 0,
    };
  }
  componentDidMount() {
    axios
      .get(`${SERVER_HOST}/products/${this.props.product.productId}`)
      .then((res) => {
        this.setState({ productName: res.data.productName });
        this.setState({ price: res.data.price });
      });
  }

  render() {
    let totalPrice = this.state.price * this.props.product.quantity;
    return (
      <div className="product border-bottom mt-0 mb-2">
        {console.log(this.props.product)}
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-8">
            <div className="info">
              <div className="row">
                <div className="col-md-5">
                  <div>
                    <h6>{this.state.productName}</h6>
                  </div>
                </div>
                <div className="col-md-4 quantity">
                  <label>Quantity:</label>

                  <span className="">{this.props.product.quantity}</span>
                </div>
                <div className="col-md-3 price">
                  <span>
                    €{(Math.round(totalPrice * 100) / 100).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderDetailsRow;

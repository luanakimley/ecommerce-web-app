import React from "react";
import axios from "axios";
import { SERVER_HOST } from "../../config/global_constants";
import ShopBanner from "../ShopBanner";
import OrderDetailsRow from "./OrderDetailsRow";

class OrderDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      user: "",
      photos: [],
      quantity: [],
    };
  }

  componentDidMount() {
    axios.defaults.withCredentials = true;

    axios
      .get(`${SERVER_HOST}/orders/${this.props.match.params.id}`, {
        headers: { authorization: localStorage.token },
      })
      .then((res) => {
        let products = [];
        res.data.products.map((product, index) => {
          products[index] = product;
          this.setState({ products: products });
        });

        if (res.data.userId !== "undefined") {
          axios
            .get(`${SERVER_HOST}/users/${res.data.userId}`, {
              headers: { authorization: localStorage.token },
            })
            .then((res) => {
              this.setState({ user: res.data.email });
            });
        } else {
          this.setState({ user: "guest" });
        }
      });
  }

  render() {
    return (
      <div>
        <ShopBanner title="Order Details" />
        {this.state.products.map((product) => (
          <OrderDetailsRow key={product._id} product={product} />
        ))}
      </div>
    );
  }
}

export default OrderDetails;

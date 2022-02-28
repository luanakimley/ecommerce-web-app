import React from "react";
import ProfileTopBar from "./AccountTopBar";
import Profile from "./Profile";
import Password from "./Password";
import AllPurchases from "../Purchases/AllPurchases";

class AccountGrid extends React.Component {
  render() {
    return (
      <div className="col-12 col-md-8 col-lg-9">
        <div className="shop_grid_product_area ml-5 mr-5">
          <ProfileTopBar title={this.props.title} />
          {this.props.profilePage ? <Profile /> : null}
          {this.props.passwordPage ? <Password /> : null}
          {this.props.allPurchasesPage ? <AllPurchases /> : null}
        </div>
      </div>
    );
  }
}

export default AccountGrid;

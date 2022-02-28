import React from "react";
import AccountGrid from "../components/Account/AccountGrid";
import { Person, Bag, Key } from "react-bootstrap-icons";
import ShopBanner from "../components/ShopBanner";

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "profile",
      profilePage: true,
      allPurchasesPage: false,
      passwordPage: false,
    };
  }

  handleProfileClick = (e) => {
    this.toggleProfile();
  };

  toggleProfile() {
    this.setState({ title: "profile" });
    this.setState({ profilePage: true });
    this.setState({ allPurchasesPage: false });
    this.setState({ passwordPage: false });
  }

  handlePasswordClick = (e) => {
    this.togglePassword();
  };

  togglePassword() {
    this.setState({ title: "password" });
    this.setState({ profilePage: false });
    this.setState({ allPurchasesPage: false });
    this.setState({ passwordPage: true });
  }

  handleAllPurchasesClick = (e) => {
    this.togglePurchases();
  };

  togglePurchases() {
    this.setState({ title: "My Purchases" });
    this.setState({ profilePage: false });
    this.setState({ allPurchasesPage: true });
    this.setState({ passwordPage: false });
  }

  render() {
    return (
      <main>
        <ShopBanner title="My Account" />
        <section>
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-4 col-lg-3">
                <div className="shop_sidebar_area ml-3 mr-3">
                  <div className="widget catagory mb-50">
                    <h6 className="widget-title mb-30 text-capitalize">
                      {`Welcome, ${localStorage.name.split(" ")[0]}!`}
                    </h6>

                    <div className="catagories-menu">
                      <ul
                        id="menu-content2"
                        className="menu-content collapse show"
                      >
                        <li onClick={this.handleProfileClick}>
                          <a>
                            <Person className="mr-2 " />
                            Profile
                          </a>
                        </li>
                        <li onClick={this.handlePasswordClick}>
                          <a>
                            <Key className="mr-2 mb-0" />
                            Password
                          </a>
                        </li>
                        <li onClick={this.handleAllPurchasesClick}>
                          <a>
                            <Bag className="mr-2 mb-0" />
                            My Purchases
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <AccountGrid
                title={this.state.title}
                profilePage={this.state.profilePage}
                allPurchasesPage={this.state.allPurchasesPage}
                passwordPage={this.state.passwordPage}
              />
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default Account;

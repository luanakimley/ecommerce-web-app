import React from "react";

class NewCollection extends React.Component {
  render() {
    return (
      <section className="welcome_area bg-img background-overlay">
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12">
              <div className="hero-content">
                <h6>2022</h6>
                <h2>New Collection</h2>
                <a href="#" className="btn essence-btn">
                  view collection
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default NewCollection;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      links: ["Dashboard", "Inventory List", "Charts"],
      toggle: false
    };
  }

  showMenu = () => {
    this.setState({ toggle: !this.state.toggle });
  };

  render() {
    let displayLinks = this.state.links.map((el, i) => {
      return <li key={i}>{el}</li>;
    });
    return (
      <div className="header">
        <div className="subheading">
          <div className="profile_hamburger">
            <Link to="Profile">
              <div className="profile"> </div>
            </Link>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAYFBMVEX///9AQEAoKCj09PQ9PT0vLy9UVFQ6OjosLCzJycnd3d14eHg1NTUpKSn5+fk4ODgiIiJcXFydnZ1+fn7k5OTt7e25ubnPz8/g4OCIiIiurq5OTk5iYmJvb29FRUWSkpKqxDk4AAACUUlEQVR4nO3dDVLqQBBF4ZkwMQNM/kMiIrr/XQq+qreD7qvxfDs4lRSYpjOGAAAAAAAAAAAAAAAAAAAAoNcdvHWeedtcKn9l3pz6LmPbRIWmHS8egSdR37/Gk33gpU2ywBhTa38VR90VfGpG68CtlQbG2Fp/3MzaS/i4iLNxYREHxlhsA7tKHRgr26/+ww8oPFBIIYVqFFJIIYW/vnD/f7WFpHz+fUrJNjBce3FhfzUuPKlv08p8UnPXXsT+bh0Yul46ieodBsOXRvecX5LLwLSbh6K4jqkM1jOa/5ZpLLn2lcs4LV6BAAAAAABgN7rl5G3xXL9cxyr7q8bVqe8Ua83INNXRYTUxhOOgGwmn4Wgf+DrI+p6GV/PCm/bntXSzDjxmaWCM2fo+Pcu3L8/GhbU4MMbaNnD/v+PvfxeDQgoppJBCCin8C4XhBxTaBoYP+fblh3Hhp3z78tO4cNEOMWIczBejrtr384r1Au3DTfmU35iPaR66F91zfv3iM/ieqrpJ/pq6mlz6Hrp1Hl+8jfPqenAEAAAAAADYhWU7etsc3yDtpr51fkf2qe0np0HNMauGwsV85evbm3KuP7zZB27i7Uv7U1ob8fal9dEmYVWv7tXWy953+fal9dEf6gXaGLNtINuXHoVsm1BIoTqQQgoppPD3F/6B7Uvxy3kOr+dN6oP1i/Ve1EW+fWl+ruCkfcivHVbb3pX3aXm3DwzhnlWfNinbn176bU25NP5KTl5HDoSwTfPZ2zx5/UMrAAAAAAAAAAAAAAAAAAAAAACAffsCIF5UDcwW8RkAAAAASUVORK5CYII="
              alt="menu"
              onClick={this.showMenu}
            />
          </div>
          <ul className="header_ul">
            <Link to="/Dashboard">
              <li className="header_li">Dashboard</li>
            </Link>
            <Link to="/InventoryList">
              <li className="header_li">Inventory List</li>
            </Link>
            <Link to="/Charts">
              <li className="header_li">Charts</li>
            </Link>
          </ul>
          <form className="calendar">
            <input type="date" />
          </form>

          {this.state.toggle && <ul className="hiddenMenu">{displayLinks}</ul>}
        </div>
      </div>
    );
  }
}

export default Header;

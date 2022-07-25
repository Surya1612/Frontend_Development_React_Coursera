import { Navbar, NavbarBrand } from 'reactstrap';
import React,{Component} from 'react';
import Menu from './components/Menu'
import {DISHES} from '../shared/dishes'


class Main extends Component {

  constructor(props){
   super(props);

   this.state={
    dishes:DISHES,
    SelectedDish:null
   }
  }

  render() {
    return (
      <div >
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <Menu  dishes={this.state.dishes} />
      </div>
    );
  }
}

export default Main;

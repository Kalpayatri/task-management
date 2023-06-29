import React from "react";
import ManageTable from "./manage-table";
import Home from "./home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Form from "./manage-table/form";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/manage-table" component={ManageTable}></Route>
        <Route exact path="/form" component={Form}></Route>
      </Router>
    </Provider>
  );
};

export default App;

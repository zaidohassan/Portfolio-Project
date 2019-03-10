import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import "./Reviews.css";

const Reviews = () => {
  return (
    <div className="reviewContainer animated fadeInUpBig">
      <Card className="card animated bounceInUp">
        <CardHeader
          avatar={
            <Avatar
              aria-label="Recipe"
              src="https://images.unsplash.com/photo-1542178243-bc20204b769f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80"
            />
          }
          title="Nothing like out there"
          subheader="Lorem ipsum dolor sit amet, his ea meliore tibique, equidem electram erroribus ne usu, id quem facer mucius sea. Et fugit munere timeam mel. Cu mutat percipitur philosophia vel, usu falli erant necessitatibus ne."
          className="eachCard"
        />
      </Card>
      <Card className="card animated bounceInUp">
        <CardHeader
          avatar={
            <Avatar
              aria-label="Recipe"
              src="https://images.unsplash.com/photo-1495147334217-fcb3445babd5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"
            />
          }
          title="Holy! This app escalated my book business by ten fold"
          subheader="Mutat iusto epicuri id eam, simul postea invenire duo in. Quot urbanitas consequuntur est in. Phaedrum ocurreret delicatissimi et ius, qui duis delicatissimi ei."
          className="eachCard"
        />
      </Card>
      <Card className="card animated bounceInUp">
        <CardHeader
          avatar={
            <Avatar
              aria-label="Recipe"
              src="https://images.unsplash.com/photo-1529008475023-5d5271a6fe50?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1055&q=80"
            />
          }
          title="Best Book Scanning App out there in the Market!"
          subheader="Ne brute facer mei, no vide persequeris his"
          className="eachCard"
        />
      </Card>
    </div>
  );
};

export default Reviews;

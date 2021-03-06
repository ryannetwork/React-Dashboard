import React from "react";
import PropTypes from "prop-types";


// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
import LockOutline from "@material-ui/icons/LockOutline";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";

const loginService = require('../../service/login');

class LoginPage extends React.Component {
    constructor (props) {
        super(props);
        // we use this to make the card to appear after the page has been rendered
        this.state = {
            userEmail: "",
            userPwd: "",
            cardAnimaton: "cardHidden"
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePwChange = this.handlePwChange.bind(this);
    }
    handleEmailChange (event) {
        this.setState({ userEmail: event.target.value });
    }

    handlePwChange (event) {
        this.setState({ userPwd: event.target.value });
    }

    componentDidMount () {
        // we add a hidden class to the card and after 700 ms we delete it and the transition appears
        this.timeOutFunction = setTimeout(
            function () {
                this.setState({ cardAnimaton: "" });
            }.bind(this),
            700
        );
    }
    componentWillUnmount () {
        clearTimeout(this.timeOutFunction);
        this.timeOutFunction = null;
    }
    AutheticateUser () {
        this.setState({ isLoggedIn: true });
        console.log("set state");
    }

    handleClick () {
    onChange(key, value){
        console.log('Key: ', key, 'Value: ', value);
        var userDetails = this.state.userDetails;
        console.log('userDetails: ', userDetails);
        userDetails[key] = value;
        this.setState({ userDetails: userDetails });
    }

    handleClick(){
        console.log("handle CLick");
        loginService.login({ a: 2, b: 3 })
    }

    render () {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={6} md={4}>
                        <form>
                            <Card login className={classes[this.state.cardAnimaton]}>
                                <CardHeader
                                    className={`${classes.cardHeader} ${classes.textCenter}`}
                                    color="rose"
                                >
                                    <h4 className={classes.cardTitle}>Log in</h4>
                                    {/*<div className={classes.socialLine}>
                                        {[
                                            "fab fa-facebook-square",
                                            "fab fa-twitter",
                                            "fab fa-google-plus"
                                        ].map((prop, key) => {
                                            return (
                                                <Button
                                                    color="transparent"
                                                    justIcon
                                                    key={key}
                                                    className={classes.customButtonClass}
                                                >
                                                    <i className={prop} />
                                                </Button>
                                            );
                                        })}
                                    </div>*/}
                                </CardHeader>
                                <CardBody>
                                    <CustomInput
                                        labelText="First Name.."
                                        id="firstname"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <Face className={classes.inputAdornmentIcon} />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Email..."
                                        id="email"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            onChange: event =>
                                                this.handleEmailChange(event, "userEmail", "email"),
                                            type: "email",
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <Email className={classes.inputAdornmentIcon} />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                    <CustomInput
                                        onChange={this.handlePwChange}
                                        labelText="Password"
                                        id="password"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            onChange: event =>
                                                this.handlePwChange(event, "userPwd", "password"),
                                            type: "password",
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <Icon className={classes.inputAdornmentIcon}>
                                                        lock_outline
                                                    </Icon>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </CardBody>
                                <CardFooter className={classes.justifyContentCenter}>
                                    <Button color="rose" simple size="lg" onClick={() => {
                                        let auth = new Auth();
                                        loginService.login(this.state.userEmail, this.state.userPwd)
                                            .then(response => {
                                                if (response.state === "success") {
                                                    this.props.history.push("/dashboard");
                                                } else {
                                                    alert("Access Denied");
                                                }
                                            });
                                    }} >
                                        Let's Go
                                    </Button>
                                </CardFooter>
                            </Card>
                        </form>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

LoginPage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(LoginPage);

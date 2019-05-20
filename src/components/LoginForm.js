import React,{ Component } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { Card, CardSection, Input, Button, Spinner } from './common';
import { emailChanged, passwordChanged, loginUser } from '../action'
import { connect } from 'react-redux'


class LoginForm extends Component{

    onEmailChange(text){
        this.props.emailChanged(text)
    }

    onPasswordChange(text){
        this.props.passwordChanged(text)
    }

    onButtonPress(){
        const {email, password} = this.props
        this.props.loginUser({email, password})
    }

    renderButton(){
        if(this.props.loading){
            return <Spinner size="large"/>
        }
        return (
            <Button onPress = {this.onButtonPress.bind(this)}>
                LogIn
            </Button>
        )
    }

    renderError(){
        if(this.props.error){
            return (
                <View style={{backgroundColor: 'white', }}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>
                </View>
            )
        }
    }

    render(){
        return(
            <Card>
                <CardSection>
                    <Input
                        label={"Email"}
                        placeholder={"user@gmail.com"}
                        onChangeText={this.onEmailChange.bind(this)}
                        value = {this.props.email}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        secureTextEntry
                        label={"Password"}
                        placeholder={"Password"}
                        onChangeText={this.onPasswordChange.bind(this)}
                        value = {this.props.password}
                    />
                </CardSection>
                {this.renderError()}
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        )
    }
}

const styles = StyleSheet.create({
    errorTextStyle: {
        fontSize: 20,
        alignSelf: "center",
        color: 'red'
    }
})

const mapStateToProps = (state)=>{
    return{
        email: state.auth.email,
        password: state.auth.password,
        error: state.auth.error,
        loading: state.auth.loading
    }
}


export default connect(mapStateToProps,{ 
    emailChanged, passwordChanged, loginUser,
})(LoginForm)
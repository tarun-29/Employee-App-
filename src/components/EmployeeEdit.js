import _ from 'lodash'
import React,{ Component } from 'react';
import { connect } from 'react-redux'
import EmployeeForm from './EmployeeForm'
import { Card, CardSection, Button, Confirm } from './common';
import { employeeUpdate, employeesSave, employeeeDelete } from '../action';
import Communication from 'react-native-communications'


class EmployeeEdit extends Component{ 

    state ={
        showModal : false
    }

    componentWillMount(){
        _.each(this.props.employee, (value, prop)=>{
            this.props.employeeUpdate({ prop, value })
        });
    }

    onButtonPress(){
        const { name, phone, shift } = this.props;
        this.props.employeesSave({ name, phone, shift, uid: this.props.employee.uid})        
    }

    onTextPress(){
       const { phone, shift } = this.props
       Communication.text(phone, `Your upcoming shift is on ${shift}`)
    }

    onAccept(){
        const { uid } = this.props.employee
        this.props.employeeeDelete({ uid })
    }

    onDecline(){
        this.setState({  showModal: false})
    }

    render(){
        return(
            <Card>
                <EmployeeForm/>
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Save Changes
                    </Button>
                </CardSection>

                <CardSection>
                    <Button
                        onPress={this.onTextPress.bind(this)}
                    >
                    Text Schedule
                    </Button>
                </CardSection>

                <CardSection>
                    <Button onPress={()=>this.setState({ showModal: !this.state.showModal })}>
                        Fire Employee
                    </Button>
                </CardSection>

                <Confirm 
                    visible={this.state.showModal}
                    onAccept={this.onAccept.bind(this)}
                    onDecline={this.onDecline.bind(this)}
                >
                    Are you sure you want to delete this? 
                </Confirm>

            </Card>
        )
    }
}

const mapStateToProps = (state)=>{
    const { name, phone, shift } = state.employeeForm ;
    return { name, phone, shift }
}

export default connect(mapStateToProps, { 
    employeeUpdate, employeesSave, employeeeDelete 
})(EmployeeEdit);
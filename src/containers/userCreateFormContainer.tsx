import React from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import UserCreateForm from '../components/userCreateForm';
import { State } from '../store/initialState';
import { createUser } from '../actions/usersActions';
import { locationChange } from '../actions/navActions';

class UserCreateFormValues {
    primaryEmail: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
    organizations: any[];
}

class UserCreateFormContainer extends React.Component {
    props: any;

    async onSubmit(values: UserCreateFormValues) {
        await this.props.actions.createUser(values.primaryEmail, values.firstName, values.lastName, values.password, values.confirmPassword, values.organizations.map((organization:any) => {return organization.value}));
    };

    async navigateToUserManagement() {
        this.props.actions.locationChange('/users');
    }

    render() {
        return (
            <div>
                <UserCreateForm navigateToUserManagement={this.navigateToUserManagement.bind(this)} onSubmit={this.onSubmit.bind(this)} organizations={this.props.authSession.user.userOrganizations.map((userOrganization:any) => { return userOrganization.organization})} />
            </div>
        );
    }
}

function mapStateToProps(state: State) {
    return {
        authSession: state.authSession
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({createUser, locationChange}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(UserCreateFormContainer);
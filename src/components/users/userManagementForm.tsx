import React from 'react'
import {Field, reduxForm, FieldArray } from 'redux-form'
import { TextboxElement, ButtonElement, PickerElement, Wrapper, CheckboxElement } from '@reperio/ui-components';

const organizationsFieldArray = (props: any) => (
    <div>
        <hr />
        {props.initialValues.map((member:any, index:number) =>
            <div key={index}>
                <div className="row">
                    <div className="col-xs-8 management-organizations">
                        {props.initialValues[index].label}
                    </div>
                    <div className="col-xs-4">
                        <ButtonElement type="button" color="danger" text="Leave" onClick={() => props.removeOrganization(index)} />
                    </div>
                </div>
                <div className="row">
                    <hr />
                </div>
            </div>
        )}
    </div>
);

const userEmailFieldArray = (props: any) => (
    <div>
        {props.fields.map((member:string, index:number) =>
            <div key={index}>
                <div className="row">
                    <div className="col-xs-8 management-organizations">
                        <Field  disabled={true} 
                                name={`${member}.email`} 
                                placeholder="Email Address" 
                                type="email" 
                                component={TextboxElement} />
                    </div>
                    <div className="col-xs-4">
                        <ButtonElement  type="button"
                                        title="Remove Email"
                                        color="danger" 
                                        children={
                                            <i className="fa fa-trash"></i>
                                        }
                                        onClick={() => props.removeEmailAddress(index)}/>
                        <ButtonElement  type="button"
                                        title="Send Verification Email"
                                        color="neutral" 
                                        disabled={props.initialValues.userEmails[index] && props.initialValues.userEmails[index].emailVerified == true || !props.initialValues.userEmails[index].id}
                                        children={
                                            <i className="fa fa-paper-plane"></i>
                                        } 
                                        onClick={() => props.sendVerificationEmail(index)}/>
                        <Field  checked={props.initialValues.userEmails[index].primary == null || !props.initialValues.primaryEmailAddress ? false : props.initialValues.userEmails[index].primary}
                                id={`${index}`}
                                title="Set As Primary Email Address"
                                name={`${member}.primary`} 
                                label="Primary" 
                                onChange={() => props.setPrimaryEmailAddress(index)}
                                component={CheckboxElement} />
                    </div>
                </div>
            </div>
        )}
    </div>
);

const rolesAndPermissions = (props: any) => (
    <div>
        <hr />
        {props.initialValues.map((member:any, index:number) =>
            <div key={index}>
                <div className="row">
                    <div className="col-xs-8 roles-permissions-row" onClick={() => props.toggle ? props.toggleRoleDetails(index) :  null}>
                        <div className={`fa ${props.initialValues[index].role.visible ? 'fa-caret-down' : 'fa-caret-right'} fa-lg roles-permissions-row-arrow`}></div>
                        {props.organizations.filter((x:any) => x.id == props.initialValues[index].organizationId)[0].name + ' - ' + props.initialValues[index].label}
                    </div>
                    <div className="col-xs-4">
                        <ButtonElement type="button" color="danger" text="Remove" onClick={() => props.removeRole(index)} />
                    </div>
                </div>
                <hr />
                {props.toggle && props.initialValues[index].role.visible ? 
                    <div className="row roles-permissions-detail-container">
                        <div className="roles-permissions-detail-header">Permissions</div>
                        {props.initialValues[index].role.rolePermissions.map((rolePermission: any, index: number) => {
                            return (
                                <div key={index}>
                                    <div className="roles-permissions-detail-permission-name">
                                        {rolePermission.permission.name}
                                    </div>
                                    <div className="roles-permissions-detail-permission-description">
                                        {rolePermission.permission.description}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                : null }
            </div>
        )}
    </div>
);

const UserManagementForm = (props: any) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
        {props.initialValues ? 
            <div className="management-container">
                <div className="management-left">
                    <div className="row management-top">
                        <Wrapper>
                            <div className="col-xs-6">
                                <div className="profile-circle">
                                    {props.initialValues.firstName.charAt(0).toUpperCase()}{props.initialValues.lastName.charAt(0).toUpperCase()}
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="row">
                                    <div className="management-name">
                                        {props.initialValues.firstName} {props.initialValues.lastName}
                                    </div>
                                    <div className="profile-primaryEmailAddress">
                                        {props.initialValues.primaryEmailAddress}
                                    </div>
                                </div>
                            </div>
                        </Wrapper>
                    </div>
                    <div className="row">
                        <Wrapper>
                            <div className="col-xs-12">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h2>General Information</h2>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-6">
                                        <label>First Name</label>
                                        <Field name="firstName" placeholder="First Name" type="text" component={TextboxElement} />
                                    </div>
                                    <div className="col-xs-6">
                                        <label>Last Name</label>
                                        <Field name="lastName" placeholder="Last Name" type="text" component={TextboxElement} />
                                    </div>
                                </div>
                            </div>
                        </Wrapper>
                    </div>
                    <div className="row">
                        <Wrapper>
                            <div className="col-xs-12">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h2>Emails</h2>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-8">
                                        <Field  name="email"
                                                placeholder="Email Address"
                                                component={TextboxElement} />
                                    </div>
                                    <div className="col-xs-4">
                                        <ButtonElement type="button" color="neutral" text="Add" onClick={() => {props.addEmailAddress()}} />
                                    </div>
                                </div>
                                <div className="row">
                                    <FieldArray name="userEmails"
                                                initialValues={{userEmails: props.initialValues.userEmails, primaryEmailAddress: props.initialValues.primaryEmailAddress}}
                                                setPrimaryEmailAddress={props.setPrimaryEmailAddress}
                                                sendVerificationEmail={props.sendVerificationEmail}
                                                removeEmailAddress={props.removeEmailAddress}
                                                component={userEmailFieldArray}/>
                                </div>
                            </div>
                        </Wrapper>
                    </div>
                    <div className="row">
                        <Wrapper>
                            <div className="col-xs-12">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h2>Organizations</h2>
                                        {props.authSession.isError ? <p className="alert alert-danger">{props.authSession.errorMessage}</p> : ""}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-8">
                                        <Field  name="selectedOrganization"
                                                options={
                                                    props.organizations
                                                        .filter((organization:any) => {
                                                            return !props.initialValues.selectedOrganizations.map((x:any)=> x.value).includes(organization.id)
                                                        })
                                                        .map((organization:any, index: number) => { 
                                                            return {
                                                                value: organization.id,
                                                                label:organization.name
                                                            }
                                                        })
                                                }
                                                pickerValue={props.selectedOrganization ? props.selectedOrganization: ""}
                                                placeholder="Organizations" 
                                                component={PickerElement} 
                                                onChange={props.selectOrganization} />
                                    </div>
                                    <div className="col-xs-4">
                                        <ButtonElement type="button" color="neutral" text="Add" onClick={() => {props.addOrganization(props.selectedOrganization)}} />
                                    </div>
                                </div>
                                <div className="row">
                                    <FieldArray name="organizations"
                                                rerenderOnEveryChange={true}
                                                initialValues={props.initialValues.selectedOrganizations}
                                                removeOrganization={props.removeOrganization}
                                                component={organizationsFieldArray}/>
                                </div>
                            </div>
                        </Wrapper>
                    </div>
                    <div className="row">
                        <Wrapper>
                            <div className="col-xs-12">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h2>Roles and Permissions</h2>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-8">
                                        <Field  name="selectedRole"
                                                options={
                                                    props.roles
                                                        .filter((role:any) => {
                                                            return !props.initialValues.selectedRoles.map((x:any)=> x.value).includes(role.id)
                                                        })
                                                        .map((role:any, index: number) => { 
                                                            return {
                                                                value: role.id,
                                                                label:role.name
                                                            }
                                                        })
                                                }
                                                pickerValue={props.selectedRole ? props.selectedRole: ""}
                                                placeholder="Roles" 
                                                component={PickerElement} 
                                                onChange={props.selectRole} />
                                    </div>
                                    <div className="col-xs-4">
                                        <ButtonElement type="button" color="neutral" text="Add" onClick={() => {props.addRole(props.selectedRole)}} />
                                    </div>
                                </div>
                                <div className="row">
                                    <FieldArray name="roles"
                                                rerenderOnEveryChange={true}
                                                initialValues={props.initialValues.selectedRoles}
                                                organizations={props.organizations}
                                                toggleRoleDetails={props.toggleRoleDetails}
                                                removeRole={props.removeRole}
                                                toggle={true}
                                                component={rolesAndPermissions}/>
                                </div>
                            </div>
                        </Wrapper>
                    </div>
                    <div className="row management-controls-bottom">
                        <Wrapper>
                            <div className="col-xs-12 management-submission-controls-container">
                                <div className="col-xs-6 management-submission-controls">
                                    <ButtonElement type="button" color="cancel" wide text="Cancel" onClick={() => props.navigateToUsers()} />
                                </div>
                                <div className="col-xs-6 management-submission-controls">
                                    <ButtonElement type="submit"  color="success" wide text="Save" />
                                </div>
                            </div>
                        </Wrapper>
                    </div>
                </div>
                <div className="management-right">
                    <div className="row">
                        <Wrapper>
                            <div className="col-xs-6">
                                <div className="profile-circle">
                                    {props.initialValues.firstName.charAt(0).toUpperCase()}{props.initialValues.lastName.charAt(0).toUpperCase()}
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="row">
                                    <div className="management-name">
                                        {props.initialValues.firstName} {props.initialValues.lastName}
                                    </div>
                                    <div className="profile-primaryEmailAddress">
                                        {props.initialValues.primaryEmailAddress}
                                    </div>
                                </div>
                            </div>
                        </Wrapper>
                    </div>
                    <div className="row">
                        <Wrapper>
                            <div className="col-xs-12 management-submission-controls-container">
                                <div className="col-xs-6 management-submission-controls">
                                    <ButtonElement type="button" color="cancel" wide text="Cancel" onClick={() => props.navigateToUsers()} />
                                </div>
                                <div className="col-xs-6 management-submission-controls">
                                    <ButtonElement type="submit"  color="success" wide text="Save" />
                                </div>
                            </div>
                        </Wrapper>
                    </div>
                </div>
            </div>
        : null }
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'userManagementForm', enableReinitialize: true })(UserManagementForm) as any; 
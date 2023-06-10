## User

Description: User is an entity which is used for authentication purposes and represents authentication data of app's users.

#### Public API

 - Types:
`IUser` - interface that contains properties of User that are required for authentication;
`IUserState` - interface that depicts state of User entity in global redux store;

 - Reducers:
`userReducer` - reducer for user action in global redux store;

 - Actions:
`userActions` - set of actions related to user that might be dispatched to global redux store;

 - Selectors:
`getUserAuthData` - selector to retrieve the whole object of user from store;
`getUserInitialized` - selector to retrieve boolean flag which indicates whether user has been iniatialized or not;
`isRoleManager` - selector to define whether User is Manager;
`isRoleAdmin` - selector to define whether User is Administrator;
`isRoleUser` - selector to define whether User has user role;
`getUserRoles` - selector to retrieve the whole list of user roles.

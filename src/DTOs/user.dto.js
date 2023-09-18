export default class UserDto{


  constructor(user){ 
    this.fullName=`${user.first_name} ${user.last_name}`
  }
}

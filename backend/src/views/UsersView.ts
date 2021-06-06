import { Users } from "../models/Users";

export default {
  render(user: Users) {
    return {
      id_owner: user.id_owner,
      id_user: user.id_user,
      name: user.name,
      login: user.login
    }
  },

  renderMany(user: Users[]) {
    return user.map(user => this.render(user));
  }
}
import { Owners } from "../models/Owners";

export default {
  render(owner: Owners) {
    return {
      id_owner: owner.id_owner,
      name: owner.name,
      company_name: owner.company_name,
      CNPJ: owner.CNPJ,
      phone: owner.phone
    }
  },

  renderMany(owners: Owners[]) {
    return owners.map(owner => this.render(owner));
  }
}
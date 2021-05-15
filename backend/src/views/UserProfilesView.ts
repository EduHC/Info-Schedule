import { UsersProfiles } from "../models/UsersProfiles";

export default {
  render(arrayOfProfiles: Array<UsersProfiles>) {
    const profiles: any[] = []; 
    const profiles_id: Number[] = [];

    arrayOfProfiles.forEach(profile => {
      profiles.push(profile?.id_profile);  
    });

    profiles.forEach(profile => {
      profiles_id.push(profile.id_profile);
    });

    return {
      profile: profiles_id
    };
  }
};
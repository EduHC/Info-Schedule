interface IRawGroups {
  id_group: number,
  start_hour: string,
  end_hour: string,
  id_user: number,
  groupName: string,
  name: string
}

interface IUsers {
  id_user?: number,
  name?: string
}

interface IGroupData {
  id_group: number,
  start_hour: string,
  end_hour: string,
  groupName: string
}

let groupsControl: number[] = [];
let usersControl: number[] = [];

function validateUser(id: number) {
  let result = 0;

  if (id === null) {
    return 2;
  }

  if (usersControl.length === 0)
    return result;
      
  for(let i = 0; i < usersControl.length; i++) {
    if (usersControl[i] === id) {
      result = 1;
      break;
    }
  }

  return result;
}

function validateGroup(id: number) {
  let result = 0;

  if (groupsControl.length === 0) 
    return result;

  for (let i = 0; i < groupsControl.length; i ++) {
    if (groupsControl[i] === id) {
      result = 1;
      break;
    }
  }

  return result;
}


export default {
  render(data: any) {
    let response: any = {
      groups: []
    }

    if (data.length === 0) {
      return response;
    }

    let users: IUsers[] = [];
    let groupData: IGroupData;
    let counter: number = 0;

    usersControl.length = 0;
    groupsControl.length = 0;

    data.forEach((row: IRawGroups) => {
      counter++;

      if (validateUser(row.id_user) === 0) {
        users.push({
          id_user: row.id_user,
          name: row.name
        });

        usersControl.push(row.id_user);
      } else if (validateUser(row.id_user) === 2) {
        users = [];
      }
    
      if (validateGroup(row.id_group) === 0) {
        if (groupsControl.length !== 0) {

          response.groups.push({
            id_group: groupData.id_group,
            start_hour: groupData.start_hour,
            end_hour: groupData.end_hour,
            groupName: groupData.groupName,
            users: users
          });

          users.length = 0;
          usersControl.length = 0;

          if (row.id_user !== null && row.name !== null){
            users.push({
              id_user: row.id_user,
              name: row.name
            });
          }

          usersControl.push(row.id_user);
        }

        groupsControl.push(row.id_group);

        groupData = {
          id_group: row.id_group,
          start_hour: row.start_hour,
          end_hour: row.end_hour,
          groupName: row.groupName
        }
      }

      if (counter === data.length) {
        response.groups.push({
          id_group: groupData.id_group,
          start_hour: groupData.start_hour,
          end_hour: groupData.end_hour,
          groupName: groupData.groupName,
          users: users
        });
      }
    });

    return response;
  }
}
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
let users: IUsers[] = [];
let groupData: IGroupData;
let response: any = {
  groups: []
}

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

function addUsers({ id_user, name }: IRawGroups) {
  users.push({
    id_user: id_user,
    name: name
  });

  usersControl.push(id_user);
}

function addGroups() {
  response.groups.push({
    id_group: groupData.id_group,
    start_hour: groupData.start_hour,
    end_hour: groupData.end_hour,
    groupName: groupData.groupName,
    users: [...users]
  });
}

function handleRemoveUser(id_user: number) {
  let temporaryUsers = users.filter(item => {
    return item.id_user !== id_user
  });

  users = temporaryUsers;
}

export default {
  render(data: any) {
    let counter: number = 0;

    usersControl.length = 0;
    groupsControl.length = 0;
    response.groups.length = 0;
    
    if (data.length === 0) {
      return response;
    }

    data.forEach((row: IRawGroups) => {
      counter++;

      if (validateUser(row.id_user) === 0) {
        addUsers(row);
      } else if (validateUser(row.id_user) === 2) {
        addGroups();
        users = [];
      }
    
      if (validateGroup(row.id_group) === 0) {
        if (groupsControl.length !== 0) {

          if (users.length !== 0) {
            handleRemoveUser(row.id_user);
          }

         if (row.id_user !== null) {
            addGroups();
         }

          users.length = 0;
          usersControl.length = 0;

          if (row.id_user !== null && row.name !== null){
            addUsers(row);
          }
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
        addGroups();

        usersControl.length = 0;
        groupsControl.length = 0;
        users.length = 0;
      }
    });

    return response;
  }
}
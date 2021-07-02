interface IRawWorkschedule {
  id_workschedule: number,
  id_group: number,
  start_hour: string,
  end_hour: string,
  id_user: number,
  name: string,
  groupName: string,
  date: Date
}

interface IUsers {
  id_user: number,
  name: string
}

interface IGroups {
  id_group: number,
  start_hour: string,
  end_hour: string,
  groupName: string,
  users: Array<IUsers>
}

interface IWorkscheduleData {
  id_workschedule: number,
  date: string
}

interface IGroupData {
  id_group: number,
  start_hour: string,
  end_hour: string,
  groupName: string
}

let workscheduleData: IWorkscheduleData;
let groupData: IGroupData;
let workscheduleControl: number[] = [];
let groupsControl: number[] = [];
let usersControl: number[] = [];
let users: IUsers[] = [];
let groups: IGroups[] = [];
let response: any = {
  workschedules: []
};

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

  if (id === null) {
    return 2;
  }

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

function validateWorkschedule(id: number) {
  let result = 0;

  if (workscheduleControl.length === 0)
    return result;
  
  for(let i = 0; i < workscheduleControl.length; i++) {
    if (workscheduleControl[i] === id) {
      result = 1;
      break;
    }
  }

  return result;
}

function handleRemoveUser(id_user: number) {
  let temporaryUsers = users.filter(item => {
    return item.id_user !== id_user
  });

  users = temporaryUsers;
}

function handleRemoveGroup(id_group: number) {
  let temporaryGroups = groups.filter(item => {
    return item.id_group !== id_group
  });

  groups = temporaryGroups;
}

function addUsers({ id_user, name }: IRawWorkschedule) {
  users.push({
    id_user: id_user,
    name: name
  });

  usersControl.push(id_user);
}

function addGroups() {
  groups.push({
    id_group: groupData.id_group,
    start_hour: groupData.start_hour,
    end_hour: groupData.end_hour,
    groupName: groupData.groupName,
    users: [...users]
  });
}

function addWorkschedules() {
  response.workschedules.push({ 
    id_workschedule: workscheduleData.id_workschedule,
    date: workscheduleData.date,
    groups: [...groups]
  });
}

export default {
  render(data: any) {
    let counter: number = 0;
    let ableToRemoveUser = 0;
    let ableToRemoveGroup = 0;

    groupData = null;
    workscheduleData = null;
    groupsControl.length = 0;
    usersControl.length = 0;
    workscheduleControl.length = 0;
    users.length = 0;
    groups.length = 0;
    response.workschedules.length = 0;

    if (data.length === 0) {
      return response;
    }

    data.forEach((row: IRawWorkschedule) => {
      counter++;
      ableToRemoveUser = 0;
      ableToRemoveGroup = 0;

      if (validateUser(row.id_user) === 0) {
        addUsers(row);

        if ( counter > 1 && row.id_group !== groupData.id_group ) {
          ableToRemoveUser = 1;
        }

      } else if (validateUser(row.id_user) === 2 ) {
        addGroups();
        users = [];
      }

      if (validateGroup(row.id_group) === 0) {
        if (groupsControl.length !== 0) {
          if (users.length !== 0 && ableToRemoveUser === 1) {
            handleRemoveUser(row.id_user);
          }

          if (counter > 1 && row.id_group !== groupData.id_group) {
            ableToRemoveGroup = 1;
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
      } else if (validateGroup(row.id_group) === 2) {
        addWorkschedules();
        groups = [];
      }

      if (validateWorkschedule(row.id_workschedule) === 0) {
        if (workscheduleControl.length !== 0) {
          
          if(groups.length !== 0 && ableToRemoveGroup === 1) {
            handleRemoveGroup(row.id_group);
          }

          if (row.id_group !== null) {
            addWorkschedules();
          }

          // Reseting control variables
          groupsControl.length = 0;
          usersControl.length = 0;

          // Reseting auxiliary variables
          users.length = 0;
          groups.length = 0;
        }

        workscheduleControl.push(row.id_workschedule);

        // Setting workschedule main data
        workscheduleData = {
          date: row.date.toISOString().split("T")[0],
          id_workschedule: row.id_workschedule
        }
      }

      if (counter === data.length) {
        addWorkschedules();
      }
    }); 

    return response;
  }
}

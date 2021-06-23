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

let workscheduleControl: number[] = [];
let groupsControl: number[] = [];
let usersControl: number[] = [];
let users: IUsers[] = [];
let groups: IGroups[] = [];
let workscheduleData: IWorkscheduleData;
let groupData: IGroupData;
let counter: number = 0;

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
    users: users
  });
}

export default {
  render(data: any) {
    let response: any = {
      workschedules: []
    };

    if (data.length === 0) {
      return response;
    }

    groupsControl.length = 0;
    usersControl.length = 0;
    workscheduleControl.length = 0;
  
    data.forEach((row: IRawWorkschedule) => {
      counter++;

      if (validateUser(row.id_user) === 0) {
        addUsers(row);
      } else if (validateUser(row.id_user) === 2) {
        addGroups();
        users = [];
      }

      if (validateGroup(row.id_group) === 0) {
        if (groupsControl.length !== 0) {
          // Acaba adicionado o mesmo grupo 2x se o user = null
          addGroups();

          users.length = 0;
          usersControl.length = 0;

          addUsers(row);
        }

        groupsControl.push(row.id_group);

        groupData = {
          id_group: row.id_group,
          start_hour: row.start_hour,
          end_hour: row.end_hour,
          groupName: row.groupName
        }
      } else if (validateGroup(row.id_group) === 2) {
        groups = [];
      }

      if (validateWorkschedule(row.id_workschedule) === 0) {
        if (workscheduleControl.length !== 0) {
          response.workschedules.push({
            id_workschedule: workscheduleData.id_workschedule,
            date: workscheduleData.date,
            groups: groups
          });

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
        if (row.id_group !== null) {
          addGroups();
        }

        response.workschedules.push({ 
          id_workschedule: workscheduleData.id_workschedule,
          date: workscheduleData.date,
          groups: groups
        });
      }
    }); 

    return response;
  }
}

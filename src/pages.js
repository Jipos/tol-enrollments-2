import {Enum} from 'enumify';

/*
Example User object
{
  "id": "q0064518",
  "givenName": "Kevin",
  "familyName": "Rogiers",
  "email": "kevin.rogiers@kuleuven.be",
  "photo": null,
  "student": false,
  "staff": true,
  "administrator": true,
  "helpdesk": true,
  "toledoTeam": true,
  "affiliations": null
}
*/

class Pages extends Enum {}
Pages.initEnum({
  // Everyone
  LIST_ENROLLMENTS: (function () {
    var _id = 0;
    return {
      setId: (id) => _id = id,
      getId: () => _id,
      isAccessibleBy: (user) => user && user.email
    }
  }()),
  ENROLL: {
    _id: 0,
    get id() {
      return this._id;
    },
    set id(id) {
      this._id = id;
    },
    get inverse() { return Pages.LIST_ENROLLMENTS },
    isAccessibleBy: (user) => user && user.email
  },
  UNENROLL: {
    id: 0,
    requiredUserType: (user) => user && user.email
  },
  // Staff
  LEARNING_UNIT_AVAILABILITY: {
    requiredUserType: (user) => user.staff
  },
  LEARNING_UNIT_SECURITY: {
    requiredUserType: (user) => user.staff
  },
  COMMUNITY_MANAGE: {
    requiredUserType: (user) => user.staff
  },
  COMMUNITY_CREATE: {
    requiredUserType: (user) => user.staff
  },
  // Helpdesk
  FIND_USER_AND_LIST_ENROLLMENTS: {
    requiredUserType: (user) => user.helpdesk
  },
  // Local admin
  FIND_USER_AND_LIST_ENROLLMENTS_AND_ENROLL_AS_ASSISTANT: {
    requiredUserType: (user) => user.administrator
  },
  ENROLL_AS_ASSISTANT: {
    requiredUserType: (user) => user.administrator
  },
  BCOURSE_MANAGE: {
    requiredUserType: (user) => user.administrator
  },
  BCOURSE_CREATE: {
    requiredUserType: (user) => user.administrator
  },
  BATCH_ENROLL: {
    requiredUserType: (user) => user.administrator
  }
});

export default Pages

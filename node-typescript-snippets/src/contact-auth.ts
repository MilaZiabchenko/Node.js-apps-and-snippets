interface Contact {
  name: string;
}

type Role = 'ContactViewer' | 'ContactEditor';

interface User extends Contact {
  roles: Role[];
  isAuthenticated: () => boolean;
  isInRole: (role: Role) => boolean;
}

const currentUser: User = {
  name: 'Milù',
  roles: ['ContactViewer', 'ContactEditor'],
  isAuthenticated() {
    return true;
  },
  isInRole(role: Role) {
    return this.roles.includes(role);
  }
};

// class decorator
const logger = (target: any) => {
  console.log({ target });
};

const sealed = (constructor: Function) => {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
};

const singleton = <T extends { new (...args: any[]): {} }>(constructor: T) =>
  class Singleton extends constructor {
    static _instance = null;

    constructor(...args: any[]) {
      super(...args);

      if (Singleton._instance) {
        throw new Error('Singleton instance already exists');
      }

      Singleton._instance = this;
    }
  };

// decorator factory
const authorize =
  (role: Role, user: User) =>
  // method decorator
  (_target: any, _property: string, descriptor: PropertyDescriptor) => {
    const wrappedMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      if (!user.isAuthenticated()) {
        throw Error('User is not authenticated!');
      }

      if (!user.isInRole(role)) {
        throw Error(
          `User not in role '${role}' and is not authorized to execute this action!`
        );
      }

      try {
        return wrappedMethod.apply(this, args);
      } catch (err) {
        throw err;
      }
    };
  };

@logger
@sealed
@singleton
class ContactRepository {
  private _admin = currentUser;
  private _contacts: Contact[] = [{ name: this._admin.name }];

  @authorize('ContactViewer', currentUser)
  getAdminName() {
    return this._admin.name;
  }

  @authorize('ContactViewer', currentUser)
  getContacts() {
    return this._contacts;
  }

  @authorize('ContactViewer', currentUser)
  getContactByName(name: Contact['name']): Contact | null {
    return this._contacts.find(c => c.name === name);
  }

  @authorize('ContactEditor', currentUser)
  save(contact: Contact, allowedUsers: Contact['name'][]) {
    if (!allowedUsers.includes(contact.name)) {
      console.log(`${contact.name} cannot be added to this repository!`);

      return null;
    }

    const contactExists = this.getContactByName(contact.name);

    if (contactExists) {
      console.log(`${contact.name} is already added to this repository.`);
    } else {
      this._contacts.push(contact);
    }
  }
}

const contactRepository = Object.seal(new ContactRepository());
const currentContactName = contactRepository.getAdminName();
const currentRepositoryContacts = contactRepository.getContacts();

console.log({ ContactRepository });
console.log({ contactRepository });
console.log({ currentContactName });
console.log({ currentRepositoryContacts });

const listOfAllowedUsers = ['Milù', 'Leo', 'Bo', 'Rishi'];

contactRepository.save({ name: currentUser.name }, listOfAllowedUsers);
contactRepository.save({ name: 'Milù' }, listOfAllowedUsers);
contactRepository.save({ name: 'Leo' }, listOfAllowedUsers);
contactRepository.save({ name: 'Leo' }, listOfAllowedUsers);
contactRepository.save({ name: 'Rishi' }, listOfAllowedUsers);
contactRepository.save({ name: 'Rishi' }, listOfAllowedUsers);
contactRepository.save({ name: 'Massimo' }, listOfAllowedUsers);

console.log({ currentRepositoryContacts });

const getContactInfoFromContactRepository = (name: Contact['name']) =>
  contactRepository.getContactByName(name) ??
  `Contact '${name}' does not exist in this repository.`;

console.log(getContactInfoFromContactRepository('Leo'));
console.log(getContactInfoFromContactRepository('Rishi'));
console.log(getContactInfoFromContactRepository('Massimo'));

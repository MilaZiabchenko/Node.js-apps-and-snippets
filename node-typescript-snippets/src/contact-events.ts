type Location = Record<'city' | 'country', string>;

type ContactStatus = 'active' | 'inactive' | 'new';

type Contact = {
  id: number;
  name: string;
  location: Location;
  status: ContactStatus;
};

type ContactData = [
  name: Contact['name'],
  city: Location['city'],
  country: Location['country']
];

type Query<T> = {
  matches: (value: T) => boolean;
};

type ContactQuery = {
  [K in keyof Contact]: Query<Contact[K]>;
};

type IdAndStatusQuery = Partial<Pick<ContactQuery, 'id' | 'status'>>;

interface ContactEvent {
  contactId: Contact['id'];
}

interface ContactStatusChangedEvent extends ContactEvent {}
interface ContactDeletedEvent extends ContactEvent {}
interface ContactAddedEvent extends ContactEvent {}

type ContactEvents = {
  contactStatusChanged: ContactStatusChangedEvent;
  contactDeleted: ContactDeletedEvent;
  contactAdded: ContactAddedEvent;
};

const handleContactEvent = <T extends keyof ContactEvents>(
  eventName: T,
  contacts: Contact[],
  id: Contact['id'],
  status: Contact['status'],
  newContactData: ContactData,
  handler: (evt: ContactEvents[T]) => void
) => {
  const contact = contacts.find(c => c.id === id);

  if (contact) {
    if (eventName === 'contactStatusChanged') {
      handler({
        contactId: contact.id
      });

      return contacts.map(c =>
        c.id === contact.id ? { ...contact, status } : c
      );
    }

    if (eventName === 'contactDeleted') {
      handler({
        contactId: contact.id
      });

      return contacts.filter(c => c.id !== contact.id);
    }
  }

  if (eventName === 'contactAdded') {
    const id = Math.max(...contacts.map(c => c.id)) + 1;
    const [name, city, country] = newContactData;

    const newContact = {
      id,
      name,
      location: {
        city,
        country
      },
      status
    } as Contact;

    handler({
      contactId: id
    });

    return [...contacts, newContact];
  }
};

const searchContacts = (contacts: Contact[], query: IdAndStatusQuery) =>
  contacts.filter(contact => {
    for (const property of Object.keys(contact)) {
      if (query[property]?.matches(contact[property])) {
        return true;
      }
    }

    return false;
  });

const initialContactsData: ContactData[] = [
  ['Oleksandra', 'Kyiv', 'Ukraine'],
  ['Anna', 'Copenhagen', 'Denmark'],
  ['Jared', 'Los Angeles', 'USA']
];

const initialContacts: Contact[] = initialContactsData.map(
  ([name, city, country], i) => ({
    id: i + 1,
    name,
    location: {
      city,
      country
    },
    status: 'active'
  })
);

const filteredInitialContacts = searchContacts(initialContacts, {
  id: { matches: id => id === 3 }
});

const updatedContacts_1 = handleContactEvent(
  'contactDeleted',
  initialContacts,
  2,
  null,
  null,
  evt => evt
);

const updatedContacts_2 = handleContactEvent(
  'contactStatusChanged',
  updatedContacts_1,
  3,
  'inactive',
  null,
  evt => evt
);

const updatedContacts_3 = handleContactEvent(
  'contactAdded',
  updatedContacts_2,
  null,
  'new',
  ['Laura', 'Barcelona', 'Spain'],
  evt => evt
);

const filteredUpdatedContacts = searchContacts(updatedContacts_3, {
  status: { matches: status => status !== 'inactive' }
});

console.log('INITIAL CONTACTS:');
console.log(initialContacts);
console.log('FILTERED INITIAL CONTACTS THAT MATCH ID === 3:');
console.log(filteredInitialContacts);
console.log('ONE CONTACT DELETED:');
console.log(updatedContacts_1);
console.log('ONE CONTACT UPDATED:');
console.log(updatedContacts_2);
console.log('ONE CONTACT ADDED:');
console.log(updatedContacts_3);
console.log('FILTERED UPDATED CONTACTS THAT MATCH ACTIVE AND NEW CONTACTS');
console.log(filteredUpdatedContacts);

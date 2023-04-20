// Type Annotations

let name: string;
let myName: 'Mila' | 'Milu' | 'Mi' = 'Mila';

// Type Casting (overriding a type)

// Upcasting

// During the process of upcasting, a variable of a more specific type is assigned to a variable of a more general type

name = myName;

// The variable 'name' has a type of string, and the variable 'myName' has a type of three specific strings. The assignment of 'myName' to 'name' is allowed because the type of 'myName' is a proper subset of the type of 'name', which makes it type-safe.

// Reversing the assignment will be downcasting, which is normally disallowed

// Type Inferences

const isCool = true;

// Type Aliases | Union Types

type Species = 'homo sapiens' | 'feline';

type LivingCreature = {
  species: Species;
};

// Interfaces

interface PersonalityFullName {
  firstName: string;
  lastName: string;
}

// Extending Interfaces | Constructing Types from Types

// Extending interfaces or constructing new types from existing ones allows us to reduce duplication and signal that there is a relation between the base and derived types

// Ways of using existing Interfaces and/or Type Aliases to construct a new Interface or Type Alias:

// 1. using 'extends' keyword => combination of types

interface HumanInfo extends LivingCreature, PersonalityFullName {
  readonly species: Species;
  readonly catName: string;
  isCool: boolean;
}

// 2. using Intersection Types => combination of types

type Feline = LivingCreature & {
  readonly species: 'feline';
};

// 3. using Utility Types => selection of properties of type

type CatInfo = Omit<HumanInfo, 'catName'>;

// 4. using Union Types => intersection of properties of types (properties in common)

type PersonalityGeneralInfo = HumanInfo | CatInfo;

// Classes | Access Modifiers

class Human implements HumanInfo {
  readonly species: Species = 'homo sapiens';

  constructor(
    readonly firstName: string,
    readonly lastName: string,
    public isCool: boolean,
    public hasAdorableCat: boolean,
    readonly catName: string,
    protected catBreed: string
  ) {}

  getHumanNameInfo() {
    return `This person's name is ${this.firstName} ${this.lastName}.`;
  }
}

class Cat implements CatInfo {
  readonly species: Species = 'feline';
  firstName = 'Leo';
  lastName = 'Ziablick';
  isCool = isCool;

  meow() {
    console.log(`${this.firstName} says meow!`);
  }

  getCatNameInfo() {
    return `This gorgeous creature is ${this.species}, and it's name is ${this.firstName} ${this.lastName}.`;
  }
}

console.log(Human);
console.log(Cat);

const mi = new Human(myName, 'Ziablick', isCool, true, 'Leo', 'Scottish Fold');
const myBestFriend = new Cat();

console.log(mi);
console.log(myBestFriend);

// Type Narrowing | Type Guards

// A type guard is a way to narrow the type of a variable within a conditional block and assert that a variable has a certain type

// Instanceof Narrowing

const logNameInfo = (somebody: unknown) => {
  if (somebody instanceof Human) return somebody.getHumanNameInfo();
  if (somebody instanceof Cat) return somebody.getCatNameInfo();

  return `We don't have any info about '${somebody}'.`;
};

console.log(logNameInfo(mi));
console.log(logNameInfo(myBestFriend));
console.log(logNameInfo('some cool creature in the Universe'));

// In Operator Narrowing | Classes as Types

// TypeScript treats a class as both value and type. This implicit type declared by TypeScript describes the shape of the instance a class produces. Therefore when a class is used as a type, TypeScript checks if the value has all the public properties of the Class

const canAdoptACat = (somebody: Human | Cat) =>
  'catName' in somebody
    ? `${somebody.firstName} is a human being who loves cats.`
    : `${somebody.firstName} is an adorable cat.`;

console.log(canAdoptACat(mi));
console.log(canAdoptACat(myBestFriend));

// Is Operator Narrowing | Type Predicates

const livingCreatureIsFeline = (
  livingCreature: LivingCreature
): livingCreature is Cat => livingCreature.species === 'feline';

// 'livingCreature is Cat' is a type predicate and a return type of the function 'livingCreatureIsFeline'. A predicate takes the form parameterName is Type, where parameterName must be the name of a parameter from the current function signature. Any time 'livingCreatureIsFeline' is called with some variable, TypeScript will narrow that variable to that specific type if the original type is compatible

if (livingCreatureIsFeline(myBestFriend)) {
  myBestFriend.meow();
}

const greetPersonAndCat = (personWithACat: Human) =>
  `Hey, ${personWithACat.firstName} and ${personWithACat.catName}!`;

const greetCat = (cat: Cat) => `Hey, ${cat.firstName}!`;

const greet = (somebody: Human | Cat) =>
  livingCreatureIsFeline(somebody)
    ? greetCat(somebody)
    : greetPersonAndCat(somebody);

console.log(greet(mi));
console.log(greet(myBestFriend));

// Function Types:

// 1. Function Interfaces

interface SumUp {
  (...args: number[]): number;
}

// 2. Function Type Aliases

type Concatenate = (...args: string[]) => string;

const addUpNumbers: SumUp = (num_1, num_2, num_3) => num_1 + num_2 + num_3;
const returnSum =
  (): SumUp =>
  (...numbers) =>
    numbers.reduce((sum, num) => sum + num, 0);
const concatenate = (fn: Concatenate) => fn('3', '5', '7');

console.log(addUpNumbers(3, 5, 7));
console.log(returnSum()(1, 3, 5, 7, 9));
console.log(concatenate((num_1, num_2, num_3) => num_1 + num_2 + num_3));

// Generics

const sortItems = <T>(
  items: readonly T[],
  compareFn: (a: T, b: T) => number
): T[] => [...items].sort(compareFn);

const numbers = [3, 973, 55, 39, 95];
const ascendingNumbers = sortItems<number>(numbers, (a, b) => a - b);
const descendingNumbers = sortItems<number>(numbers, (a, b) => b - a);

console.log(ascendingNumbers);
console.log(descendingNumbers);

const names = ['Leo', 'Dan', 'Shaun'];
const sortedNames = sortItems<string>(names, (a, b) => a.localeCompare(b));

console.log(sortedNames);

// Indexed Access Types

type CatSpecies = Feline['species'];
type CatName = HumanInfo['catName'];

type CatInfoInDetail = {
  species?: CatSpecies;
  catName: CatName;
  catBreed?: string;
  catGender?: string;
};

// Keyof Type Operator

// Keyof operator is a great way to constrain generic types

const getObjectProperty = <T, K extends keyof T>(obj: T, key: K) => obj[key];

// - 'keyof T' returns a union of string literal types;
// - 'extends' keyword constrains K to be one of the string literal types only;
// - 'K extends keyof T' means that any value of type K can be assigned to the string literal union types

const cat: CatInfoInDetail = {
  species: 'feline',
  catName: 'bulochka',
  catGender: 'female'
};

console.log(getObjectProperty(cat, 'species'));
console.log(getObjectProperty(cat, 'catGender'));

// Mapped Types

// Mapped types build on the syntax for index signatures

// A mapped type is a generic type which uses a union of PropertyKeys (frequently created via a keyof) to iterate through keys to create a type

// Template Literal Types

// Capitalize<StringType>

// Converts the first character in the string to an uppercase equivalent

type CapitalizedCatInfo = {
  [K in keyof CatInfoInDetail]: Capitalize<CatInfoInDetail[K]>;
};

const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

// Types Assertions

const capitalizedCat: CapitalizedCatInfo = {
  catName: capitalize(cat.catName) as Capitalize<CatInfoInDetail['catName']>,
  catGender: capitalize(cat.catGender) as Capitalize<
    CatInfoInDetail['catGender']
  >
};

console.log(getObjectProperty(capitalizedCat, 'catName'));
console.log(getObjectProperty(capitalizedCat, 'catGender'));

// Utility Types

// TypeScript provides several utility types to facilitate common type transformations. These utilities are available globally

// Record<Keys, Type>

// Constructs an object type whose property keys are Keys and whose property values are Type. This utility can be used to map the properties of a type to another type

type PersonAndCat = Record<HumanInfo['firstName'], CatInfoInDetail>;

const personAndCatInfo: PersonAndCat = {
  Mila: { catName: 'Leo', catBreed: 'Scottish Fold' },
  Taras: { catName: 'Bulochka' }
};

console.log(personAndCatInfo.Mila);
console.log(personAndCatInfo.Taras);

// ReturnType<Type>

// Constructs a type consisting of the return type of function Type

type HasQuality = ReturnType<
  typeof getObjectProperty<PersonalityGeneralInfo, 'isCool'>
>;

// Partial<Type>

// Constructs a type with all properties of Type set to optional (the opposite of Required)

type PersonalQualitiesInfo = Partial<
  Record<'isSmart' | 'isCourageous' | 'isProfessional', HasQuality>
>;

// Pick<Type, Keys>

// Constructs a type by picking the subset of properties Keys from Type (the opposite of Omit)

type PersonInfoInDetail = Pick<HumanInfo, 'firstName' | 'lastName' | 'isCool'> &
  PersonalQualitiesInfo;

const reporters: PersonInfoInDetail[] = [
  {
    firstName: 'Claudio',
    lastName: 'Locatelli',
    isCool: isCool,
    isSmart: true,
    isCourageous: true
  },
  {
    firstName: 'Greta',
    lastName: 'Cristini',
    isCool: isCool,
    isProfessional: true
  },
  {
    firstName: 'Luca',
    lastName: 'Steinmann',
    isCool: isCool,
    isCourageous: true
  }
];

console.log({ reporters });

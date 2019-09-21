class Student {
    fullName: string;
    constructor(public firstName: string, public middleInitial: string, public lastName: string) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function studentGreeter(person: Student) {
return "Hello, " + person.fullName;
}

function personGreeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

function stringGreeter(person: string) {
    return "Hello, " + person;
}

function greeter(person) {
    return "Hello, " + person;
}

let studentUser = new Student("Jane", "M.", "User");
let personUser = { firstName: "Jane", lastName: "User "};
let stringUser = "Jane User";

document.body.textContent = studentGreeter(studentUser);
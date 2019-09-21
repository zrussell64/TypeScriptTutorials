var Student = /** @class */ (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    return Student;
}());
function studentGreeter(person) {
    return "Hello, " + person.fullName;
}
function personGreeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
function stringGreeter(person) {
    return "Hello, " + person;
}
function greeter(person) {
    return "Hello, " + person;
}
var studentUser = new Student("Jane", "M.", "User");
var personUser = { firstName: "Jane", lastName: "User " };
var stringUser = "Jane User";
document.body.textContent = studentGreeter(studentUser);

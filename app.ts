#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class Student{
    name:string;
    constructor(Name:string){
        this.name = Name
    }
}
class Person{
    students:Student[] = []
    addStudent(obj:Student){
        this.students.push(obj)
    }
}
const persons = new Person();
const programStart = async(persons:Person)=>{
    while(true)
{
    console.log("Welcome");
    
    const ans = await inquirer.prompt({
    name:"select",
    type:"list",
    message:"Whom would you like to interact with?",
    choices:["Staff","Student","exit"]
});
if(ans.select === "Staff"){
    console.log(`${chalk.bold.italic.blue("You approach the staff room. Please feel free to ask any question")}`);
}else if(ans.select === "Student"){
    const ans = await inquirer.prompt({
        name:"student",
        type:"input",
        message:"Enter the student name would you like to engage with?",
        validate:function(value){
            if(value.trim() === ""){
                return "Please enter a name"
                
            }else{
                return true;
            }
        }
    });
    const student = persons.students.find(value=>value.name.toLowerCase() === ans.student.toLowerCase());
    if(!student){
        const name = new Student(ans.student);
        persons.addStudent(name);
        console.log(`${chalk.bold.italic.blue(`Hellow I am ${name.name}.Nice to meet you!`)}\n${chalk.bold.italic.green(`New Student added\nCurrent Student List:`)}`);
        console.log(persons.students);
        
    }else{
    console.log(`${chalk.bold.italic.blue(`Hellow I am ${student.name}.Nice to see you again!`)}${chalk.bold.italic.green(`\nExisting Student List:\n`)}`);
    console.log(persons.students);
    
    }
}
else if(ans.select === "exit"){
    console.log(chalk.bold.italic.red("Exiting the program..."));
    process.exit();
}
}
}
programStart(persons);
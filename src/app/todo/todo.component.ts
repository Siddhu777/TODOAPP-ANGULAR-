import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TodoService } from './todo.service';
interface ToDoInterace{
  TaskId:number;
  Description:string;
  IsComplete:number;
  Email:any;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todoInterface: ToDoInterace[];
  singeToDo:ToDoInterace[];
  userDetails:any;
  searchValue:number;
  isComplete:number=0;
  userName:any;
  constructor(private router:Router,private todoServ:TodoService,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.fnGetAllToDoList();

    const storage = localStorage.getItem('google_auth');
  
    if(storage){
      this.userDetails = JSON.parse(storage)
    } else{
      this.signOut();
    }
  }

  signOut(){
    localStorage.removeItem('google_auth');
    this.router.navigate(['/'])
  }

  filtAll(){
    this.searchValue =0;
  }
  filtActive(){ 
    let a=0
    this.searchValue = a;
  }
  filtComplete(){
    this.searchValue = 1;
  }
  allTasks:any;
  fnGetAllToDoList(){
    this.todoServ.getAllToDoList().subscribe((res:ToDoInterace[])=>{
      this.todoInterface = res;
    })
  }
  
  addNewToDoList(todo:NgForm){
      this.todoServ.postToDoList(todo).subscribe((res:any)=>{
        this.fnGetAllToDoList();
      })
     
  }

  fnDeleteToDo(id:number){
    this.todoServ.deleteToDo(id).subscribe((res:any)=>{
      console.log(res)
      this.fnGetAllToDoList();
    })
  }
  fnRemoveAllCompletedToDo(){
    this.todoServ.removeCompletedToDo().subscribe((res:any)=>{
      console.log(res);
      this.fnGetAllToDoList();
    })
  }

//Check all ToDos
fnCheckAllTodo(){
  this.todoServ.checkAllToDo().subscribe((res:any)=>{
    this.fnGetAllToDoList();
  })
}

  fnEditToDoForm(templateRef: any){
    let dialogRef = this.dialog.open(templateRef, { disableClose: true });
  }
  toDoID:number;
  edit(taskId:any){
    this.toDoID = taskId;
    return this.todoServ.getSingleToDo(taskId).subscribe((res:ToDoInterace[])=>{
      this.singeToDo = res;
      
    })  
    
  }

  fnUpdateSingleToDo(form){
    this.todoServ.putSingleToDo(this.toDoID,form).subscribe((res:any)=>{
      this.fnGetAllToDoList();    })
  }

}

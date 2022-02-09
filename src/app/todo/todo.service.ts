import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  baseUrl = "http://localhost:5000/";
  httpHeaders = new HttpHeaders({'content-type':'application/json'});
  constructor(private http:HttpClient,) { }
  getAllToDoList(){
    return this.http.get(`${this.baseUrl}todo`,{headers:this.httpHeaders})
  }
  getSingleToDo(taskId:number){
    return this.http.get(`${this.baseUrl}todo/${taskId}`,{headers:this.httpHeaders})
  }
  postToDoList(form:any){
    return this.http.post(`${this.baseUrl}todo`,form,{headers:this.httpHeaders})
  }
  deleteToDo(id:number){
    return this.http.delete(`${this.baseUrl}todo/${id}`);
  }
  removeCompletedToDo(){
    return this.http.put('http://localhost:5000/todo/completed_todo',{headers:this.httpHeaders});
  }
  checkAllToDo(){
    return this.http.put('http://localhost:5000/todo/check_all',{headers:this.httpHeaders});
  }

  //Update single ToDO
  putSingleToDo(id:number,form:any){
    return  this.http.put(`${this.baseUrl}todo/single_todo/${id}`,form);
  }
}

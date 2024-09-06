import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminMembersService } from 'src/app/adminServices/admin-members.service';
import { RouterModule, Router } from '@angular/router';
import { from } from 'rxjs';
import { tap,map } from 'rxjs/operators';
import { IMember } from 'src/app/adminmodule/members/members';
import { FileDetector } from 'protractor';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private memberSer: AdminMembersService, private router: Router) { }
  user;
  public members;
  temp;

  userSubmit(form: NgForm) {
    this.user = form.value;
    // console.log(this.user);
    // console.log(this.user.username);
    // console.log(this.user.password);
    this.temp = false;
    console.log(this.temp);

    this.members.forEach(member => {
      if (member.email == this.user.username) {
        if (member.password == this.user.password) {
          console.log("Success!!");

          console.log(member.id);

          alert("You have been successfully logged in...");

          //local storage
          sessionStorage.setItem("userid", member.id);
          this.router.navigate(['user/profile']);
          this.temp = true;
          form.reset();

        }
        else {
          alert("Invalid password...");
          this.temp = true;

        }
      } else {
        form.reset();
      }

    });
    if (this.temp == false) {
      alert("Invalid user id or password...");

    }
  }


  get() {
    // this.memberSer.getMember()
    //   .subscribe(data => {
    //     this.members = data
    //     console.log(data);
    //   });
  }


  ngOnInit() {
    this.memberSer.getMember()
    .pipe(
      map(data=>{
        const fildata = [];
        data.forEach(mem =>{
          const t1 = {
            "email": mem.umail,
            "password":mem.upassword,
            "id" : mem.id
          }
          fildata.push(t1);
        })
        return fildata;
      })
    )
    .subscribe(data => {
      this.members = data;
      console.log('Assigned members:', this.members); // Logs the assigned data to members
    });

  }

}

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'find-anyone';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }
  data = "";
  response: any;
  spinner = false;
  err = false;

  getUser() {

    const localData = localStorage.getItem(this.data);

    if (localData) {

      this.err = false;
      this.response = JSON.parse(localData);
    }
    else {

      this.spinner = true;
      console.log(this.data);
      this.http.get('https://api.github.com/users/' + this.data).subscribe(userDetail => {
        this.response = userDetail;
        console.log(this.response);
        localStorage.setItem(this.data, JSON.stringify(this.response));
        this.spinner = false;
        this.err = false;

      },
        err => {
          this.spinner = false;
          this.err = true;
          this.response = false;
          if (this.data) {
            this.snackBar.open("incorrot Data", "ok", { duration: 3000, });
 
          }
          else
          {   this.snackBar.open("No Data", "ok", { duration: 3000, });
        }
        });

    }

  }

}







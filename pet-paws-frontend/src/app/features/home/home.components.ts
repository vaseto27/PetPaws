import { Component, inject, OnInit } from "@angular/core";
import { UserService } from "../../core/services/user.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component..scss'
})
export class HomeComponent implements OnInit {
  private userService = inject(UserService);
  constructor() {}

  ngOnInit(): void {


  }

  makeReq() {
    this.userService.getUserProfile().subscribe((data) => {
      console.log(data)
    })
  }
}

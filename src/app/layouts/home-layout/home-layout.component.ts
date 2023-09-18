import { Component } from '@angular/core';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css']
})
export class HomeLayoutComponent {


  ngOnInit(): void {
  }

  clickBtnToggle(){
    let sidebar = document.querySelector("#sidebar");
    if(sidebar != null)
      sidebar.classList.toggle("collapsed");
  }
}

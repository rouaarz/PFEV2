import { Component } from '@angular/core';
import { SideBarCompComponent } from "../Layout/side-bar-comp/side-bar-comp.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarCompComponent } from "../Layout/navbar-comp/navbar-comp.component";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
  standalone: true,
  imports: [SideBarCompComponent, ReactiveFormsModule, FormsModule, HttpClientModule, CommonModule, RouterModule, NavbarCompComponent],
})
export class AdminLayoutComponent {

}

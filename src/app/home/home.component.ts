import { HomeService } from './home.service';
import { Component } from '@angular/core';
import { SpinComponent } from '../ui/spin/spin.component';
import { Product } from '../interface';
import { MenuComponent } from '../ui/menu/menu.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SpinComponent, MenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private homeService: HomeService) {}
  food!: Product[];

  ngOnInit() {
    this.homeService.getFood().subscribe((data) => {
      this.food = data;
    });
  }
}

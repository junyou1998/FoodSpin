import {
  Component,
  computed,
  effect,
  ElementRef,
  input,
  Input,
  InputSignal,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Product } from '../../interface';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-spin',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './spin.component.html',
  styleUrl: './spin.component.scss',
})
export class SpinComponent {

  items: InputSignal<Product[]> = input<Product[]>([]);
  count = computed(() => this.items().length);
  degUnit = computed(() => 360 / this.count());

  itemEffect = effect(() => {
    if (!this.items()) return;
    this.items().forEach((element, index) => {

      const transform = `translateX(-50%) rotate(${this.degUnit() * index}deg)`;
      this.item.toArray()[index].nativeElement.style.transform = transform;
    });
  });

  focus = 0;
  isAnimating = false;
  nowDegree = 0;

  @ViewChild('spinContent') spinContent!: ElementRef;
  @ViewChildren('item') item!: QueryList<ElementRef>;

  /** 輪播
   * @param direction -1: prev, 1: next
   */
  navigate(direction: -1 | 1) {
    
    this.focus = (this.focus + direction + this.count()) % this.count(); // 更新焦點
    this.nowDegree -= direction * this.degUnit(); // 旋轉角度
    this.spinContent.nativeElement.style.transform = `rotate(${this.nowDegree}deg)`; // 更新旋轉角度

    this.triggerAnimation();
  }

  private triggerAnimation() {
    this.isAnimating = true;
    setTimeout(() => {
      this.isAnimating = false;
    }, 500);
  }

  // prev(){
  //   console.log('ee',this.spinContent.nativeElement);

  //   if(this.focus === this.count - 1){
  //     this.focus = -1;
  //   }
  //   this.focus ++;

  //   console.log('prev',this.focus);
  //   this.nowDegree -= this.degUnit;
  //   this.spinContent.nativeElement.style.transform = `rotate(${this.nowDegree}deg)`;

  //   this.triggerAnimation();

  // }

  // next(){

  //   if(this.focus === 0){
  //     this.focus = this.count;
  //   }
  //   this.focus --;
  //   console.log('next',this.focus);

  //   this.nowDegree += this.degUnit;
  //   this.spinContent.nativeElement.style.transform = `rotate(${this.nowDegree}deg)`;

  //   this.triggerAnimation();

  // }
}
function VideChildren(
  arg0: string
): (target: SpinComponent, propertyKey: 'item') => void {
  throw new Error('Function not implemented.');
}

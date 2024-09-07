import { Component } from '@angular/core';
declare const lottie: any; 
@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css','./title.scss' ]
})
export class TitleComponent {
  ngOnInit(): void {
    this.loadLottieAnimation();
  }

  loadLottieAnimation() {
    const animationContainer = document.getElementById('lottieContainer');
    lottie.loadAnimation({
      container: animationContainer,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'assets/assets/lotties/welcome.json'
    });
  }
}

import { Component } from '@angular/core';
import { UserScore } from '../models/userScore';
import { UserScoreService } from '../services/user-score.service';

@Component({
  selector: 'app-user-score',
  templateUrl: './user-score.component.html',
  styleUrls: ['./user-score.component.css']
})
export class UserScoreComponent {
  scoreList: UserScore[] = [];
  selectedScore: UserScore | undefined;


  constructor(
    private userScoreService: UserScoreService,
   
  ) {}

  ngOnInit(): void {
    this.displayScore();
  }

  displayScore() {
    this.scoreList = [];
    this.userScoreService.getAllScores().subscribe(res => {
      res.forEach(element => {
        this.scoreList.push(element);
      });
    });
  }

  selectScore(s: UserScore) {
    this.selectedScore = s;
    this.openModal();
  }

  deleteScore() {
    if (this.selectedScore && this.selectedScore.id) {
      this.userScoreService
        .deleteScore(this.selectedScore.id)
        .subscribe((res) => {
          console.log(res);
          this.displayScore();
          this.closeModal();
        });
    }
  }

  openModal() {
    document.getElementById('deleteModal')!.style.display = 'block';
  }

  closeModal() {
    document.getElementById('deleteModal')!.style.display = 'none';
  }

 
}

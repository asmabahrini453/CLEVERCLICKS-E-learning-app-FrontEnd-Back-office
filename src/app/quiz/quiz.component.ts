import { Component } from '@angular/core';
import { Quiz } from '../models/quiz';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuizService } from '../services/quiz.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
changeStatus(arg0: number,arg1: string) {
throw new Error('Method not implemented.');
}

  quizList: Quiz[] = [];
  selectedQuiz: Quiz | undefined;

  searchQuizForm!: FormGroup;

  constructor(
    private quizService: QuizService,
    private router: Router,
    private route: ActivatedRoute 
  ) {}

  ngOnInit(): void {
    this.displayQuiz();
  }

  displayQuiz() {
    this.quizList = [];
    this.quizService.getAllQuizzes().subscribe(res => {
      res.forEach(element => {
        this.quizList.push(element);
      });
    });
  }

  selectQuiz(quiz: Quiz) {
    this.selectedQuiz = quiz;
    this.openModal();
  }

  deleteQuiz() {
    if (this.selectedQuiz && this.selectedQuiz.id) {
      this.quizService
        .deleteQuiz(this.selectedQuiz.id)
        .subscribe((res) => {
          console.log(res);
          this.displayQuiz();
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

  navigateToQuestion() {
    this.router.navigate(['/question']);
  }
  navigateToUserScores() {
    this.router.navigate(['/score']);
    }
}

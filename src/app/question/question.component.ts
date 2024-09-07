import { Component } from '@angular/core';
import { Question } from '../models/question';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  questionList: Question[] = [];
  selectedQuestion: Question | undefined;


  constructor(
    private questionService: QuestionService,
   
  ) {}

  ngOnInit(): void {
    this.displayQuestion();
  }

  displayQuestion() {
    this.questionList = [];
    this.questionService.getAllQuestions().subscribe(res => {
      res.forEach(element => {
        this.questionList.push(element);
      });
    });
  }

  selectQuestion(question: Question) {
    this.selectedQuestion = question;
    this.openModal();
  }

  deleteQuestion() {
    if (this.selectedQuestion && this.selectedQuestion.id) {
      this.questionService
        .deleteQuestion(this.selectedQuestion.id)
        .subscribe((res) => {
          console.log(res);
          this.displayQuestion();
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Chapter } from 'src/app/models/chapter';
import { Quiz } from 'src/app/models/quiz';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-details-question',
  templateUrl: './details-question.component.html',
  styleUrls: ['./details-question.component.css']
})
export class DetailsQuestionComponent implements OnInit {
  questionForm!: FormGroup;
  submitted = false;
  questionId: string | null = null;
  quizList: Quiz[] = [];
  isNewQuestion: boolean = false;
  quiz!: Quiz;

  constructor(
    private quizService: QuizService,
    private questionService: QuestionService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.questionId = this.route.snapshot.paramMap.get('id');
    this.isNewQuestion = this.questionId === null;
    this.displayQuiz();

    this.questionForm = this.fb.group({
      id: [null],
      questionText: ['', Validators.required],
      option1: ['', Validators.required],
      option2: ['', Validators.required],
      option3: ['', Validators.required],
      rightAnswerIndex: [null, Validators.required],
      quizId: [null, Validators.required],
    });

    if (!this.isNewQuestion) {
      this.displayQuestion(Number(this.questionId));
    }
  }

  displayQuiz() {
    this.quizService.getAllQuizzes().subscribe((res) => {
      this.quizList = res;
    });
  }

  displayQuestion(id: number) {
    this.questionService.getQuestionById(id).subscribe((res) => {
      this.questionForm.patchValue(res);
      this.questionForm.controls['quizId'].setValue(res.quiz!.id);
    });
  }

  saveQuestion() {
    this.submitted = true;
    if (this.questionForm.valid) {
      if (this.questionForm.value.id) {
        this.updateQuestion();
      } else {
        this.addQuestion();
      }
    }
  }

  updateQuestion() {
    if (this.questionForm.valid && this.questionId !== null) {
      const qIdNumber: number = +this.questionId;
      const formData = new FormData();

      formData.append('questionText', this.questionForm.get('questionText')!.value);
      formData.append('option1', this.questionForm.get('option1')!.value);
      formData.append('option2', this.questionForm.get('option2')!.value);
      formData.append('option3', this.questionForm.get('option3')!.value);
      formData.append('rightAnswerIndex', this.questionForm.get('rightAnswerIndex')!.value);
      formData.append('quizId', this.questionForm.get('quizId')!.value);

      this.questionService.updateQuestion(qIdNumber, formData).subscribe(
        (response) => {
          this.snackBar.open('Question updated successfully', 'Close', { duration: 3000 });
          this.router.navigate(['/question']);
        },
        (error) => {
          console.error('Error :', error);
        }
      );
    } else {
      Object.values(this.questionForm.controls).forEach((control) => {
        control.markAsDirty();
      });
    }
  }

  addQuestion() {
    this.submitted = true;
    if (this.questionForm.valid) {
      const formData = new FormData();

      formData.append('questionText', this.questionForm.get('questionText')!.value);
      formData.append('option1', this.questionForm.get('option1')!.value);
      formData.append('option2', this.questionForm.get('option2')!.value);
      formData.append('option3', this.questionForm.get('option3')!.value);
      formData.append('rightAnswerIndex', this.questionForm.get('rightAnswerIndex')!.value);
      formData.append('quizId', this.questionForm.get('quizId')!.value);

      this.questionService.addQuestion(formData).subscribe(
        (response) => {
          this.snackBar.open('Question added successfully', 'Close', { duration: 3000 });
          this.router.navigate(['/question']);
        },
        (error) => {
          console.error('Error adding question:', error);
        }
      );
    } else {
      Object.values(this.questionForm.controls).forEach((control) => {
        control.markAsDirty();
      });
    }
  }
}

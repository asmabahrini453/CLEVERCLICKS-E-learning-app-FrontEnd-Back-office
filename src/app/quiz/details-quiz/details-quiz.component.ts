import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Chapter } from 'src/app/models/chapter';
import { ChapterService } from 'src/app/services/chapter.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-details-quiz',
  templateUrl: './details-quiz.component.html',
  styleUrls: ['./details-quiz.component.css']
})
export class DetailsQuizComponent implements OnInit  {
  quizForm!: FormGroup;
  submitted = false;
  quizId: string | null = null;
  chapterList: Chapter[] = [];
  isNewQuiz: boolean = false;
  chapter!: Chapter;

  constructor(
    private quizService: QuizService,
    private chapterService: ChapterService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.quizId = this.route.snapshot.paramMap.get('id');
    if (this.quizId !== null ) {
      this.displayChapter();
      this.displayQuiz(Number(this.quizId));

      this.quizForm = this.fb.group({
        id: [null],
        quizTitle: ['', Validators.required],
        status: [true, Validators.required],
        chapterId: [null, Validators.required]
      });
    }
  }

  displayChapter() {
    this.chapterService.getChapter().subscribe((res) => {
      this.chapterList = res;
    });
  }

  displayQuiz(id: number) {
    this.quizService.getQuizById(id).subscribe((res) => {
      this.quizForm.patchValue(res);
      this.quizForm.controls['chapterId'].setValue(res.chapter!.id);
    });
  }

  saveQuiz() {
    this.submitted = true;
    if (this.quizForm.valid) {
      if (this.quizForm.value.id) {
        this.updateQuiz();
      } else {
        this.addQuiz();
      }
    }
  }

  updateQuiz() {
    if (this.quizForm.valid && this.quizId !== null) {
      const quizIdNumber: number = +this.quizId;
      const formData = new FormData();
      formData.append('quizTitle', this.quizForm.get('quizTitle')!.value);
      formData.append('status', this.quizForm.get('status')!.value);
      formData.append('chapterId', this.quizForm.get('chapterId')!.value);

      this.quizService.updateQuiz(quizIdNumber, formData).subscribe(
        (response) => {
          this.snackBar.open('Quiz updated successfully', 'Close', { duration: 3000 });
          this.router.navigate(['/quiz']);
        },
        (error) => {
          console.error('Error :', error);
        }
      );
    } else {
      Object.values(this.quizForm.controls).forEach((control) => {
        control.markAsDirty();
      });
    }
  }

  addQuiz() {
    this.submitted = true;
    if (this.quizForm.valid) {
      const formData = new FormData();
      formData.append('quizTitle', this.quizForm.get('quizTitle')!.value);
      formData.append('status', this.quizForm.get('status')!.value);
      formData.append('chapterId', this.quizForm.get('chapterId')!.value);

      this.quizService.addQuiz(formData).subscribe(
        (response) => {
          this.snackBar.open('Quiz created successfully', 'Close', { duration: 3000 });
          this.router.navigate(['/quiz']);
        },
        (error) => {
          console.error('Error adding quiz:', error);
        }
      );
    } else {
      Object.values(this.quizForm.controls).forEach((control) => {
        control.markAsDirty();
      });
    }
  }
}

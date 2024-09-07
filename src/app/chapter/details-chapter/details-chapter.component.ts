import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Chapter } from 'src/app/models/chapter';
import { Course } from 'src/app/models/course';
import { ChapterService } from 'src/app/services/chapter.service';
import { CourseService } from 'src/app/services/course.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-details-chapter',
  templateUrl: './details-chapter.component.html',
  styleUrls: ['./details-chapter.component.css'],
})
export class DetailsChapterComponent implements OnInit {
  chapterForm!: FormGroup;
  chapterId: string | null = null;
  chapter?: Chapter;
  imagePreviews: string[] = [];
  courseList: Course[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private chapterService: ChapterService,
    private courseService: CourseService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.chapterId = this.route.snapshot.paramMap.get('id');
    this.initializeForm();
    this.loadCourses();
    if (this.chapterId !== null && this.chapterId !== 'new') {
      this.loadChapterDetails(Number(this.chapterId));
    }
  }

  initializeForm() {
    this.chapterForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      status: ['ACTIVE', Validators.required],
      courseId: ['', Validators.required],
      images: [[]],
    });
  }

  loadChapterDetails(id: number) {
    this.chapterService.getChapterById(id).subscribe((res) => {
      this.chapter = res;
      this.chapterForm.patchValue({
        title: this.chapter.title,
        content: this.chapter.contents.join('\n'),
        status: this.chapter.status,
        courseId: this.chapter.course.id,
      });

      this.imagePreviews = this.chapter.images.map(
        (image) => 'data:image/png;base64,' + image.byteImg
      );
    });
  }

  loadCourses() {
    this.courseService.getCourse().subscribe((res) => {
      this.courseList = res;
    });
  }

  onSubmit(): void {
    if (this.chapterForm.invalid) {
      this.snackBar.open('Please fill the form correctly', 'Close', {
        duration: 2000,
      });
      return;
    }
    const formData = new FormData();
    formData.append('title', this.chapterForm.get('title')!.value);
    formData.append('contents', this.chapterForm.get('content')!.value);
    formData.append('status', this.chapterForm.get('status')!.value.toString());
    formData.append('courseId', this.chapterForm.get('courseId')!.value);

    const images = this.chapterForm.get('images')!.value;
    if (images && images.length > 0) {
      for (const image of images) {
        formData.append('images', image);
      }
    }

    if (this.chapterId === 'new') {
      this.addChapter(formData);
    } else {
      this.updateChapter(formData);
    }
  }

  addChapter(chapterData: FormData): void {
    this.chapterService.addChapter(chapterData).subscribe(
      (response) => {
        console.log('Chapter added successfully:', response);
        this.snackBar.open('Chapter created successfully', 'Close', {
          duration: 2000,
        });
        this.router.navigate(['/chapter']);
      },
      (error) => {
        console.error('Error adding chapter:', error);
        this.snackBar.open('Error creating chapter', 'Close', {
          duration: 2000,
        });
      }
    );
  }

  updateChapter(chapterData: FormData): void {
    this.chapterService.updateChapter(+this.chapterId!, chapterData).subscribe(
      (response) => {
        console.log('Chapter updated successfully:', response);
        this.snackBar.open('Chapter updated successfully', 'Close', {
          duration: 2000,
        });
        this.router.navigate(['/chapter']);
      },
      (error) => {
        console.error('Error updating chapter:', error);
        this.snackBar.open('Error updating chapter', 'Close', {
          duration: 2000,
        });
      }
    );
  }

  onImageChange(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (files !== null && files.length > 0) {
      this.imagePreviews = [];
      for (const file of Array.from(files)) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreviews.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }

      this.chapterForm.patchValue({ images: Array.from(files) });
    }
  }
}

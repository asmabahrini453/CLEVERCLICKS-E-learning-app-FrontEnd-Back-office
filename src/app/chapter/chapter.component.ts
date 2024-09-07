import { Component, OnInit } from '@angular/core';
import { Chapter } from '../models/chapter';
import { ChapterService } from '../services/chapter.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit {
  chapters: Chapter[] = [];
  showAllContents: boolean[] = [];
  searchForm!: FormGroup;
  filteredChapters: Chapter[] = [];
  currentPage: number = 1;
  pageSize: number = 2;
  totalPages: number = 0;
  pages: number[] = [];
  noChapterFound: boolean = false;

  constructor(private chapterService: ChapterService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.retrieveAllChapters();
    this.searchForm = this.fb.group({
      title: ['', Validators.required]
    });
  }

  retrieveAllChapters() {
    this.chapterService.getChapter().subscribe(chapters => {
      this.filteredChapters = this.chapters = chapters.map(chapter => ({
        ...chapter, images: chapter.images.map(image => ({
          ...image,
          processedImg: image.byteImg ? 'data:image/png;base64,' + image.byteImg : null
        }))
      }));
      this.calculateTotalPages();
    });
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.filteredChapters.length / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.updateChapterList();
  }

  updateChapterList() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.chapters = this.filteredChapters.slice(start, end);
  }

  submitForm() {
    if (!this.searchForm.valid) {
      return;
    }
    const title = this.searchForm.get('title')!.value.toLowerCase();
    this.filteredChapters = this.chapters.filter(chapter =>
      chapter.title.toLowerCase().includes(title)
    );
    this.currentPage = 1;
    this.noChapterFound = this.filteredChapters.length === 0;
    this.calculateTotalPages();
  }
  

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateChapterList();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateChapterList();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updateChapterList();
  }

  processImages(): void {
    this.chapters.forEach(chapter => {
      chapter.images.forEach(image => {
        if (image.byteImg) {
          image.processedImg = 'data:image/png;base64,' + image.byteImg;
        }
      });
    });
  }
  resetChapterList(): void {
    this.retrieveAllChapters();
    this.searchForm.reset();
    this.currentPage = 1;
    this.noChapterFound = false;
  }
  
  changeChapterStatus(id: number, newStatus: string): void {
    this.chapterService.changeStatus(id, newStatus).subscribe(
      (updatedChapter: Chapter) => {
        console.log("Chapter status changed successfully");
        // Find the chapter in the chapters array and update its status
        const index = this.chapters.findIndex(chapter => chapter.id === id);
        if (index !== -1) {
          this.chapters[index].status = newStatus; // Directly set the new status
          // Trigger change detection to update the UI
          this.chapters = [...this.chapters];
        }
      },
      error => {
        console.error("Error changing chapter status:", error);
      }
    );
  }

  

  toggleShowAllContents(chapterIndex: number): void {
    this.showAllContents[chapterIndex] = !this.showAllContents[chapterIndex];
  }

  onDelete(id: number): void {
    this.chapterService.deleteChapter(id).subscribe(response => {
      console.log('Chapter deleted successfully:', response);
      this.retrieveAllChapters();
    }, error => {
      console.error('Error deleting chapter:', error);
    });
  }
}

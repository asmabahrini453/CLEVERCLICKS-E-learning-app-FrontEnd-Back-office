import { Component, OnInit } from '@angular/core';
import { Feedback } from '../models/feedback';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  fList: Feedback[] = [];
  selectedf: Feedback | undefined;


  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.displayfeedback();
   
  }

 

  displayfeedback() {
    this.fList = [];
    this.feedbackService.getAllFeedbacks().subscribe(res => {
      res.forEach(element => {
        this.fList.push(element);
      });
    });
  }

  selectFeedback(f: Feedback) {
    this.selectedf = f;
    this.openModal();
  }

  deleteFeedback() {
    if (this.selectedf && this.selectedf.id) {
      this.feedbackService
        .deleteFeedback(this.selectedf.id)
        .subscribe((res) => {
          console.log(res);
          this.displayfeedback();
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

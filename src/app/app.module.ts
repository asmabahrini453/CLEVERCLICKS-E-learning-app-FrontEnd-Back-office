import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { WelcomeComponent } from './auth/welcome/welcome.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { UpdatePasswordComponent } from './admin/update-password/update-password/update-password.component';
import { CourseComponent } from './course/course.component';
import { CategoryComponent } from './category/category.component';
import { DetailsCategoryComponent } from './category/details-category/details-category.component';
import { DetailsCourseComponent } from './course/details-course/details-course.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OrderComponent } from './order/order.component';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailsAdminComponent } from './admin/details-admin/details-admin.component';
import { ChapterComponent } from './chapter/chapter.component';
import { DetailsChapterComponent } from './chapter/details-chapter/details-chapter.component';
import { QuizComponent } from './quiz/quiz.component';
import { DetailsQuizComponent } from './quiz/details-quiz/details-quiz.component';
import { QuestionComponent } from './question/question.component';
import { DetailsQuestionComponent } from './question/details-question/details-question.component';
import { UserScoreComponent } from './user-score/user-score.component';
import { UserComponent } from './user/user.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { OrderEarningsComponent } from './order-earnings/order-earnings.component';
import { TitleComponent } from './auth/welcome/title/title.component';
import { NotFoundComponent } from './pagination/not-found.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TestStuffComponent } from './test-stuff/test-stuff.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    WelcomeComponent,
    AdminComponent,
    UpdatePasswordComponent,
    CourseComponent,
    CategoryComponent,
    DetailsCategoryComponent,
    DetailsCourseComponent,
    FooterComponent,
    SidebarComponent,
    NavbarComponent,
    OrderComponent,
    DetailsAdminComponent,
    ChapterComponent,
    DetailsChapterComponent,
    QuizComponent,
    DetailsQuizComponent,
    QuestionComponent,
    DetailsQuestionComponent,
    UserScoreComponent,
    UserComponent,
    FeedbackComponent,
    AnalyticsComponent,
    OrderEarningsComponent,
    TitleComponent,
    NotFoundComponent,
    TestStuffComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatSnackBarModule,
    BrowserAnimationsModule,   

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

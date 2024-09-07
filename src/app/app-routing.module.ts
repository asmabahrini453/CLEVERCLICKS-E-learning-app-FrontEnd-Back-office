
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { WelcomeComponent } from './auth/welcome/welcome.component';
import { authGuard } from './auth/guard/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { UpdatePasswordComponent } from './admin/update-password/update-password/update-password.component';
import { CourseComponent } from './course/course.component';
import { CategoryComponent } from './category/category.component';
import { DetailsCategoryComponent } from './category/details-category/details-category.component';
import { DetailsCourseComponent } from './course/details-course/details-course.component';
import { FooterComponent } from './footer/footer.component';
import { OrderComponent } from './order/order.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DetailsAdminComponent } from './admin/details-admin/details-admin.component';
import { ChapterComponent } from './chapter/chapter.component';
import { DetailsChapterComponent } from './chapter/details-chapter/details-chapter.component';
import { QuizComponent } from './quiz/quiz.component';
import { DetailsQuizComponent } from './quiz/details-quiz/details-quiz.component';
import { QuestionComponent } from './question/question.component';
import { DetailsQuestionComponent } from './question/details-question/details-question.component';
import { UserScoreComponent } from './user-score/user-score.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { OrderEarningsComponent } from './order-earnings/order-earnings.component';
import { TitleComponent } from './auth/welcome/title/title.component';
import { UserComponent } from './user/user.component';
import { NotFoundComponent } from './pagination/not-found.component';
import { TestStuffComponent } from './test-stuff/test-stuff.component';

const routes: Routes = [
  { path: '', component: LoginComponent }, 
  { path: 'footer', component: FooterComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'sidebar', component: SidebarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'welcome', component: WelcomeComponent, canActivate: [authGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard] },
  { path: 'admin/:id', component: DetailsAdminComponent },
  { path: 'admin/password/:id', component: UpdatePasswordComponent },
  { path: 'category', component: CategoryComponent, canActivate: [authGuard] },
  { path: 'category/:id', component: DetailsCategoryComponent },
  { path: 'course', component: CourseComponent },
  { path: 'course/:id', component: DetailsCourseComponent },
  { path: 'order', component: OrderComponent },
  { path: 'chapter', component: ChapterComponent },
  { path: 'chapter/:id', component: DetailsChapterComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'quiz/:id', component: DetailsQuizComponent },
  { path: 'question', component: QuestionComponent },
  { path: 'question/:id', component: DetailsQuestionComponent },
  { path: 'score', component: UserScoreComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'OE', component: OrderEarningsComponent },
  { path: 'title', component: TitleComponent},
  { path: 'user', component: UserComponent},

  { path: 'notfound', component: NotFoundComponent},
  { path: 'test', component: TestStuffComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

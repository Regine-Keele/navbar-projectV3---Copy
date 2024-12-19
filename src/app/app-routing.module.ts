import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DiaryComponent } from './diary/diary.component';

const routes: Routes = [
  {
    path: '', 
    redirectTo: '/home',
    pathMatch: 'full' 
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'diary',
    loadChildren: () => import('./diary/diary.module').then(m => m.DiaryModule),  
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

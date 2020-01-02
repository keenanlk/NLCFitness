import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./services/user/auth.guard";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "home",
    loadChildren: "./home/home.module#HomePageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "login",
    loadChildren: "./pages/login/login.module#LoginPageModule"
  },
  {
    path: "profile",
    loadChildren: "./pages/profile/profile.module#ProfilePageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "reset-password",
    loadChildren:
      "./pages/reset-password/reset-password.module#ResetPasswordPageModule"
  },
  {
    path: "signup",
    loadChildren: "./pages/signup/signup.module#SignupPageModule"
  },
  {
    path: "new-workout/:id",
    loadChildren: "./pages/new-workout/new-workout.module#NewWorkoutPageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "previous-workouts",
    loadChildren:
      "./pages/previous-workouts/previous-workouts.module#PreviousWorkoutsPageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "add-weight",
    loadChildren: "./pages/add-weight/add-weight.module#AddWeightPageModule"
  },
  {
    path: "weight-list",
    loadChildren: "./pages/weight-list/weight-list.module#WeightListPageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "workout-details/:id",
    loadChildren:
      "./pages/workout-details/workout-details.module#WorkoutDetailsPageModule",
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

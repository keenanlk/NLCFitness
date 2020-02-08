import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../../services/user/auth.guard";
import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "tabs",
    component: TabsPage,
    children: [
      {
        path: "home",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../home/home.module").then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: "home/profile",
        loadChildren: () =>
          import("../profile/profile.module").then(m => m.ProfilePageModule)
      },
      {
        path: "previous-workouts",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../previous-workouts/previous-workouts.module").then(
                m => m.PreviousWorkoutsPageModule
              )
          }
        ]
      },
      {
        path: "previous-workouts/workout-details/:id",
        loadChildren: () =>
          import("../workout-details/workout-details.module").then(
            m => m.WorkoutDetailsPageModule
          )
      },
      {
        path: "previous-workouts/new-workout/:id",
        loadChildren: () =>
          import("../new-workout/new-workout.module").then(
            m => m.NewWorkoutPageModule
          )
      },

      {
        path: "weight-list",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../weight-list/weight-list.module").then(
                m => m.WeightListPageModule
              )
          }
        ]
      },
      {
        path: "weight-list/add-weight",
        loadChildren: () =>
          import("../add-weight/add-weight.module").then(
            m => m.AddWeightPageModule
          )
      },
      {
        path: "",
        redirectTo: "/tabs/home",
        pathMatch: "full"
      }
    ]
  },
  {
    path: "",
    redirectTo: "/tabs/home",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}

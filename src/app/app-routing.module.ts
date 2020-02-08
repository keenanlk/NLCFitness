import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./services/user/auth.guard";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "login",
    loadChildren: "./pages/login/login.module#LoginPageModule"
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
    path: "tabs",
    loadChildren: () =>
      import("./pages/tabs/tabs.module").then(m => m.TabsPageModule)
  },
  { path: "", loadChildren: "./pages/tabs/tabs.module#TabsPageModule" }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

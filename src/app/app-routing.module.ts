import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthenticationGuard } from "./core/authentication/authentication.guard";

const routes: Routes = [

  {
    path: "",
    loadChildren: () => import("app/home/home.module").then((m) => m.HomeModule),
  },

  // ADMIN++++++
  {
    path: "admin",
    loadChildren: () => import("app/admin/admin.module").then((m) => m.AdminModule),
  },

  // Fallback when no prior route is matched
  {
    path: "**",
    redirectTo: "pages/404",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule { }

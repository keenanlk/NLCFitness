import { Component, OnInit } from "@angular/core";
import { WorkoutService } from "src/app/services/workout.service";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-previous-workouts",
  templateUrl: "./previous-workouts.page.html",
  styleUrls: ["./previous-workouts.page.scss"]
})
export class PreviousWorkoutsPage implements OnInit {
  public workoutList: Array<any>;
  public loading: HTMLIonLoadingElement;

  constructor(
    private workoutService: WorkoutService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.loadData();
    console.log(this.router.url);
  }
  async loadData() {
    this.loading = await this.loadingCtrl.create();
    await this.loading.present();
    this.workoutService
      .getWorkoutList()
      .orderBy("date", "desc")
      .get()
      .then(weightListSnapshot => {
        this.workoutList = [];
        weightListSnapshot.forEach(snap => {
          this.workoutList.push({
            id: snap.id,
            date: snap.data().date,
            name: snap.data().name
          });

          return false;
        });
      });
    this.loading.dismiss();
  }

  viewDetails(id: string) {
    this.router.navigate(["/workout-details", id]);
  }
}

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { WorkoutService } from "src/app/services/workout.service";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-workout-details",
  templateUrl: "./workout-details.page.html",
  styleUrls: ["./workout-details.page.scss"]
})
export class WorkoutDetailsPage implements OnInit {
  id: string;
  private sub: any;
  public workoutList: Array<any>;
  public loading: HTMLIonLoadingElement;

  constructor(
    private route: ActivatedRoute,
    private workoutService: WorkoutService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params["id"];
    });
    console.log(this.id);
    this.loadData();
  }

  async loadData() {
    this.loading = await this.loadingCtrl.create();
    await this.loading.present();
    this.workoutService
      .getWorkouts(this.id)
      .get()
      .then(workoutListSnapshot => {
        this.workoutList = [];
        workoutListSnapshot.forEach(snap => {
          this.workoutList.push({
            id: snap.id,
            name: snap.data().name,
            sets: snap.data().sets,
            reps: snap.data().reps,
            weight: snap.data().weight
          });
          return false;
        });
      });
    this.loading.dismiss();
  }
}

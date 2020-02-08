import { Component, OnInit } from "@angular/core";
import { WorkoutService } from "src/app/services/workout.service";
import { Router } from "@angular/router";
import { LoadingController, AlertController } from "@ionic/angular";
import { stringify } from "querystring";

@Component({
  selector: "app-previous-workouts",
  templateUrl: "./previous-workouts.page.html",
  styleUrls: ["./previous-workouts.page.scss"]
})
export class PreviousWorkoutsPage implements OnInit {
  public workoutList: Array<any>;
  public loading: HTMLIonLoadingElement;
  workoutName: string;
  private id: string;

  constructor(
    private workoutService: WorkoutService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrol: AlertController
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
    this.router.navigateByUrl(`tabs/previous-workouts/workout-details/${id}`);
  }

  async addWorkout() {
    const alert = await this.alertCtrol.create({
      header: "Workout Name",
      cssClass: "customAlert",
      inputs: [
        {
          name: "name",
          placeholder: "Squat"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Create",
          handler: data => {
            this.workoutName = data.name;
          }
        }
      ]
    });
    await alert.present();
    alert.onDidDismiss().then(data => {
      this.id = this.workoutService.newWorkout(this.workoutName);
      this.router.navigateByUrl(
        `tabs/previous-workouts/new-workout/${this.id}`
      );
    });
  }
}

import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { ProfileService } from "../services/user/profile.service";
import { Observable } from "rxjs";
import { AlertController } from "@ionic/angular";
import { WorkoutService } from "../services/workout.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  workoutName: string;
  weight: Observable<number>;
  docId: string;
  constructor(
    private router: Router,
    private alertCtrol: AlertController,
    private workoutService: WorkoutService
  ) {}

  ngOnInit() {
    console.log(this.router.url);
  }

  addWeight() {
    this.router.navigateByUrl("add-weight");
  }
  weightList() {
    this.router.navigateByUrl("weight-list");
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
      this.workoutService.newWorkout(this.workoutName);
    });
  }

  viewWorkouts() {
    this.router.navigateByUrl("previous-workouts");
  }
}

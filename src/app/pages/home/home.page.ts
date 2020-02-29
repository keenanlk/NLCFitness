import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { ProfileService } from "../../services/user/profile.service";
import { Observable } from "rxjs";
import { AlertController } from "@ionic/angular";
import { WorkoutService } from "../../services/workout.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  workoutName: string;
  weight: Observable<number>;
  docId: string;
  public userProfile: any;

  constructor(
    private router: Router,
    private alertCtrol: AlertController,
    private workoutService: WorkoutService,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    console.log(this.router.url);
  }

  ionViewWillEnter() {
    this.getUser();
  }

  getUser() {
    this.profileService
      .getUserProfile()
      .get()
      .then(data => {
        this.userProfile = data.data();
      });
  }

  addWeight() {
    this.router.navigateByUrl("tabs/weight-list/add-weight");
  }
  weightList() {
    this.router.navigateByUrl("tabs/weight-list");
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
      this.workoutService.newWorkout(this.workoutName).then(dat => {
        this.docId = dat;
        this.router.navigateByUrl(
          `tabs/previous-workouts/new-workout/${this.docId}`
        );
      });
    });
  }

  viewWorkouts() {
    this.router.navigateByUrl("tabs/previous-workouts");
  }
}

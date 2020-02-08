import { Component, OnInit } from "@angular/core";
import { WorkoutService } from "src/app/services/workout.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AlertController } from "@ionic/angular";

interface exercise {
  name: string;
  amount: string;
}

@Component({
  selector: "app-new-workout",
  templateUrl: "./new-workout.page.html",
  styleUrls: ["./new-workout.page.scss"]
})
export class NewWorkoutPage implements OnInit {
  public workoutList: Array<any>;
  exerciseList: any = [];
  id: string;
  private sub: any;
  constructor(
    private workoutService: WorkoutService,
    private router: Router,
    private route: ActivatedRoute,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params["id"];
    });
  }

  async addEx() {
    const alert = await this.alertCtrl.create({
      header: "Add Exercise",
      cssClass: "customAlert",
      inputs: [
        {
          name: "name",
          placeholder: "Name"
        },
        {
          name: "reps",
          placeholder: "Reps"
        },
        {
          name: "sets",
          placeholder: "Sets"
        },
        {
          name: "weight",
          placeholder: "Weight"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: data => {
            console.log("Canceled");
          }
        },
        {
          text: "Add",
          handler: data => {
            this.exerciseList.push({
              name: data.name,
              reps: data.reps,
              sets: data.sets,
              weight: data.weight
            });
          }
        }
      ]
    });
    await alert.present();
  }

  submit() {
    this.workoutService.addWorkout(this.id, this.exerciseList);
    this.router.navigateByUrl("tabs/previous-workouts");
  }
}

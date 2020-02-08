import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class WorkoutService {
  public workoutListRef: firebase.firestore.CollectionReference;
  public exerciseListRef: firebase.firestore.CollectionReference;
  public userProfile: firebase.firestore.DocumentReference;
  public currentUser: firebase.User;
  public docId: string;
  constructor(private router: Router) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.workoutListRef = firebase
          .firestore()
          .collection(`/userProfile/${user.uid}/workouts`);
      }
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
        this.userProfile = firebase.firestore().doc(`/userProfile/${user.uid}`);
      }
    });
  }
  date = new Date();

  addWorkout(id: string, list: Array<any>) {
    const arrayLength = list.length;
    for (var i = 0; i < arrayLength; i++) {
      this.workoutListRef
        .doc(id)
        .collection("exercises")
        .add(list[i]);
    }
  }
  //new exercises
  getWorkouts(id: string): firebase.firestore.CollectionReference {
    this.exerciseListRef = this.workoutListRef.doc(id).collection("exercises");
    return (this.exerciseListRef = this.exerciseListRef);
  }

  getWorkoutList(): firebase.firestore.CollectionReference {
    return (this.workoutListRef = this.workoutListRef);
  }

  newWorkout(wName: string): string {
    this.workoutListRef
      .add({
        date: new Date(),
        name: wName
      })
      .then(docRef => {
        //console.log(docRef.id);
        this.docId = docRef.id;
        return this.docId;
      });

    return;
  }
}

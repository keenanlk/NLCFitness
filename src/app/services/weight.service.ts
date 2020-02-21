import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { AuthService } from "../services/user/auth.service";

@Injectable({
  providedIn: "root"
})
export class WeightService {
  public weightListRef: firebase.firestore.CollectionReference;
  public userProfile: firebase.firestore.DocumentReference;
  public currentUser: firebase.User;
  curWeight: number;

  constructor(private authService: AuthService) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.weightListRef = firebase
          .firestore()
          .collection(`/userProfile/${user.uid}/weightList`);
      }
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
        this.userProfile = firebase.firestore().doc(`/userProfile/${user.uid}`);
      }
    });
  }

  addWeight(
    userWeight: number,
    userDate: Date
  ): Promise<firebase.firestore.DocumentReference> {
    this.updateCurrentWeight(userWeight);
    return this.weightListRef.add({
      weight: userWeight,
      date: userDate
    });
  }

  updateCurrentWeight(curWeight: number): Promise<any> {
    return this.userProfile.update({ curWeight });
  }

  getCurWeight(): firebase.firestore.DocumentReference {
    return this.userProfile;
  }

  getWeightList(): firebase.firestore.CollectionReference {
    return (this.weightListRef = this.weightListRef);
  }
  deleteWeight(id: string) {
    this.weightListRef.doc(id).delete();
  }
}

import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { AuthService } from "../services/user/auth.service";

@Injectable({
  providedIn: "root"
})
export class PhotoService {
  public photoListRef: firebase.firestore.CollectionReference;
  public userProfile: firebase.firestore.DocumentReference;
  public currentUser: firebase.User;

  constructor(private authService: AuthService) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.photoListRef = firebase
          .firestore()
          .collection(`/userProfile/${user.uid}/photos`);
      }
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
        this.userProfile = firebase.firestore().doc(`/userProfile/${user.uid}`);
      }
    });
  }

  async uploadPhoto(
    buffer: ArrayBuffer,
    name: string
  ): Promise<firebase.firestore.DocumentReference> {
    let blob = new Blob([buffer], { type: "image/jpeg" });

    return this.photoListRef.add({ blob, date: new Date() });
  }
}

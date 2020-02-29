import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Profile } from "./profile.model";
import {} from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ProfileService {
  public userProfile: firebase.firestore.DocumentReference;
  public currentUser: firebase.User;
  readonly rootUrl: "http://localhost:5000/api/";
  profile: Profile;
  userid: string;

  constructor(private http: HttpClient) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
        this.userid = this.currentUser.uid.toString();
        this.userProfile = firebase.firestore().doc(`/userProfile/${user.uid}`);
      }
    });
    this.currentUser = firebase.auth().currentUser;
    this.userProfile = firebase
      .firestore()
      .doc(`/userProfile/${this.currentUser.uid}`);
  }

  getUserProfile(): firebase.firestore.DocumentReference {
    return this.userProfile;
  }

  updateName(firstName: string, lastName: string): Promise<any> {
    return this.userProfile.update({ firstName, lastName });
  }

  updateDOB(birthDate: Date): Promise<any> {
    return this.userProfile.update({ birthDate });
  }

  updateEmail(newEmail: string, password: string): Promise<any> {
    const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(
      this.currentUser.email,
      password
    );

    return this.currentUser
      .reauthenticateWithCredential(credential)
      .then(() => {
        this.currentUser.updateEmail(newEmail).then(() => {
          this.userProfile.update({ email: newEmail });
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  updatePassword(newPassword: string, oldPassword: string): Promise<any> {
    const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(
      this.currentUser.email,
      oldPassword
    );

    return this.currentUser
      .reauthenticateWithCredential(credential)
      .then(() => {
        this.currentUser.updatePassword(newPassword).then(() => {
          console.log("Password Changed");
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
  getUserId() {
    return this.userid;
  }

  addUser(profile: Profile) {
    profile.UserId = this.userid;
    this.profile = profile;

    console.log(JSON.stringify(this.profile));
    const headers = new HttpHeaders();
    headers.set("Content-Type", "application/json; charset=utf-8");

    this.http
      .post("http://localhost:5000/api/profile", JSON.stringify(this.profile), {
        headers: headers
      })
      .subscribe(data => {
        console.log(data);
      });
  }
}

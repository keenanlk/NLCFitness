import { Component, OnInit, Query } from "@angular/core";
import { WeightService } from "../../services/weight.service";
import { ProfileService } from "src/app/services/user/profile.service";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-weight-list",
  templateUrl: "./weight-list.page.html",
  styleUrls: ["./weight-list.page.scss"]
})
export class WeightListPage implements OnInit {
  public weightList: Array<any>;
  public weight: number;
  public loading: HTMLIonLoadingElement;

  constructor(
    private weightService: WeightService,
    private profileService: ProfileService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.loadData();
  }
  async loadData() {
    this.loading = await this.loadingCtrl.create();
    await this.loading.present();
    this.weightService
      .getWeightList()
      .orderBy("date", "desc")
      .get()
      .then(weightListSnapshot => {
        this.weightList = [];
        weightListSnapshot.forEach(snap => {
          this.weightList.push({
            id: snap.id,
            weight: snap.data().weight,
            date: snap.data().date
          });
          this.weightList.sort(function(a, b) {
            return b - a;
          });
          return false;
        });
        this.loading.dismiss();
      });
  }
}

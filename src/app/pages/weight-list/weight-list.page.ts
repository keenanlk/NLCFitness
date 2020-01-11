import { Component, OnInit, Query } from "@angular/core";
import { WeightService } from "../../services/weight.service";
import { ProfileService } from "src/app/services/user/profile.service";
import { LoadingController } from "@ionic/angular";
import { Chart } from "chart.js";

@Component({
  selector: "app-weight-list",
  templateUrl: "./weight-list.page.html",
  styleUrls: ["./weight-list.page.scss"]
})
export class WeightListPage implements OnInit {
  public weightList: Array<any>;
  public labels: Array<any>;
  public data: Array<any>;
  public weight: number;
  public loading: HTMLIonLoadingElement;
  middle: number;
  end: number;
  dateEnd: string;
  dateMiddle: string;
  dateStart: string;

  constructor(
    private weightService: WeightService,
    private profileService: ProfileService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.loadData();
  }
  async loadData() {
    this.loading = await this.loadingCtrl.create({
      spinner: "bubbles"
    });
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
          this.end = this.weightList.length - 1;
          this.middle = Math.floor(this.weightList.length / 2);
          this.weightList.sort(function(a, b) {
            return b - a;
          });
          return false;
        });
        this.getChart();
        this.loading.dismiss();
      });
  }

  getChart() {
    const label1 = this.getFormattedDate(this.weightList[this.end].date);
    const label2 = this.getFormattedDate(this.weightList[this.middle].date);
    const label3 = this.getFormattedDate(this.weightList[0].date);
    var lineChart = new Chart("lineChart", {
      type: "line",
      data: {
        labels: [label1, label2, label3],
        datasets: [
          {
            label: "Weights",
            data: [
              this.weightList[this.end].weight,
              this.weightList[this.middle].weight,
              this.weightList[0].weight
            ],
            fill: false,
            borderColor: "#f04141",
            backgroundColor: "#ffffff"
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              display: true,
              ticks: {
                fontColor: "#ffffff"
              }
            }
          ],
          yAxes: [
            {
              display: true,
              ticks: {
                fontColor: "#ffffff"
              }
            }
          ]
        }
      }
    });
  }

  getFormattedDate(date: any) {
    console.log(date);
    var start = date.toDate();
    let year = start.getFullYear();
    let month = (1 + start.getMonth()).toString().padStart(2, "0");
    let day = start
      .getDate()
      .toString()
      .padStart(2, "0");

    return month + "/" + day + "/" + year;
  }
}

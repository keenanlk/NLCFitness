import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { WeightService } from "../../services/weight.service";

@Component({
  selector: "app-add-weight",
  templateUrl: "./add-weight.page.html",
  styleUrls: ["./add-weight.page.scss"]
})
export class AddWeightPage implements OnInit {
  curWeight: number;
  imageSrc: any;
  url: ArrayBuffer;
  constructor(private router: Router, private weightService: WeightService) {}

  ngOnInit() {}

  addWeight(curWeight: number): void {
    if (curWeight === undefined) {
      return;
    }
    this.weightService.addWeight(curWeight, new Date()).then(() => {
      this.router.navigateByUrl("tabs/weight-list");
    });
  }
  readURL(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = event => {
        // called once readAsDataURL is completed
        this.imageSrc = reader.result;
      };
    }
  }
}

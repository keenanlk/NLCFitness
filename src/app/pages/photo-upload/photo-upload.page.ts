import { Component, OnInit } from "@angular/core";
import { File } from "@ionic-native/file/ngx";
import { FileChooser } from "@ionic-native/file-chooser/ngx";
import { PhotoService } from "src/app/services/photo.service";

@Component({
  selector: "app-photo-upload",
  templateUrl: "./photo-upload.page.html",
  styleUrls: ["./photo-upload.page.scss"]
})
export class PhotoUploadPage implements OnInit {
  constructor(
    private file: File,
    private fileChooser: FileChooser,
    private photoService: PhotoService
  ) {}

  ngOnInit() {}

  choose() {
    this.fileChooser.open().then(uri => {
      alert(uri);

      this.file.resolveLocalFilesystemUrl(uri).then(newUri => {
        alert(JSON.stringify(newUri));

        let dirPath = newUri.nativeURL;
        let dirPathSegments = dirPath.split("/");
        dirPathSegments.pop();
        dirPath = dirPathSegments.join("/");

        this.file.readAsArrayBuffer(dirPath, newUri.name).then(async buffer => {
          await this.photoService.uploadPhoto(buffer, newUri.name);
        });
      });
    });
  }
}

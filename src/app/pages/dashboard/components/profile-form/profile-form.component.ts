import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Profile } from 'src/app/models/profile.interface';
import { ImageService } from 'src/app/services/data-services/image.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
})
export class ProfileFormComponent implements OnInit {
  @ViewChild('imgInput') imgInput!: HTMLInputElement;
  @Output() dataChange = new EventEmitter<Profile>();
  @Input() data: Profile = {
    id: 0,
    name: '',
    subtitle: '',
    adress: '',
    description: '',
    image: '',
  };
  file: any;
  preview: string = '';
  form!: FormGroup;
  API_URL = environment.API_URL;
  constructor(private fb: FormBuilder, private imgService: ImageService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      subtitle: ['', Validators.required],
      adress: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {}  

  onFileChange(event: Event): any {
    const target = event.target as HTMLInputElement;
    const file = target.files?.length ? target.files[0] : null;
    if (file) {
      this.file = file;
      this.imgService.getBase64(file).then((base64) => {
        this.preview = base64;
      });
    } else {
      this.file = null;
    }
  }  

  uploadImage(): void {
    const file = new FormData();
    file.append('file', this.file, this.file.name);
    this.imgService.postImage(file).subscribe((res: any) => {
      console.log(res);
    });
  }

  onSubmit(event: Event): void {
    try {
      event.preventDefault();      
      this.data = this.form.value;      
      this.data.image = this.file.name;
      this.dataChange.emit(this.data);
      console.log(this.data);
      this.uploadImage();
      this.form.reset();
      this.preview = '';
    } catch (error) {
      console.log(error);
    }
  }
}

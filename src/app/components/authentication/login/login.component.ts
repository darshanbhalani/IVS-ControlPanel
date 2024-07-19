import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SVGIconModule } from '@progress/kendo-angular-icons';
import { InputsModule, TextBoxComponent } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { SVGIcon, eyeIcon, eyeSlashIcon } from '@progress/kendo-svg-icons';
import { LayoutServiceService } from '../../../services/layout/layout-service.service';
import { UserService } from '../../../services/user/user.service';
import { Router } from '@angular/router';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputsModule,
    LabelModule,
    FormsModule,
    SVGIconModule,
    SVGIconModule,
    ButtonModule

  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    @ViewChild("password") public textbox!: TextBoxComponent;
  
    error:string="";
    form :any;
    public eyeSVG: SVGIcon = eyeIcon;

  public ngAfterViewInit(): void {
    this.textbox.input.nativeElement.type = "password";
  }

  public toggleVisibility(): void {
    const inputEl = this.textbox.input.nativeElement;
    inputEl.type = inputEl.type === "password" ? "text" : "password";
    this.eyeSVG = this.eyeSVG===eyeIcon ? eyeSlashIcon:eyeIcon
  }

  constructor(
    private fb: FormBuilder,private router:Router,
    private layoutService : LayoutServiceService,
    private userService: UserService,
    private loader:NgxUiLoaderService
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public login(): void {
    this.loader.start;
    if (this.form.valid) {
      this.userService.login(this.form.value["username"], this.form.value["password"]).subscribe(
        (response:any) => {
          if(response.success){
            this.router.navigate(['/dashboard'], { replaceUrl: true });
          }else{
            this.error=response.body.error;
          }
        },
        (error:any) => {
          console.log('Login failed', error);
        }
      );
    } else {
      this.error = 'Please fill in all required fields';
    }
  }

  public clearForm(): void {
    this.form.reset();
  }
}

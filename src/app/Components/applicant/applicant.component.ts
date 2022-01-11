import { Component, OnInit } from '@angular/core';
import { ApplicantService } from 'src/app/httpService/applicant-service';
import { Applicant } from 'src/app/model/applicant';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CustomvalidationService } from 'src/app/services/customvalidation.service';

@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.css']
})
export class ApplicantComponent implements OnInit {
  applicantList:Applicant[]
  applicantForm:FormGroup
  applicant:Applicant;
  addApplicant:Applicant;
  submitted = false;
  isUpdate:boolean= false;
  selectedToDeleteItem:number;
  constructor(public applicantService:ApplicantService,private modalService: NgbModal
    ,private fb: FormBuilder, private customValidator: CustomvalidationService) {
   }

  ngOnInit(): void {
    this.getApplcantList();
  }
  get name() { return this.applicant.name; }
  addNewApplicant(modalName: any){
    this.addApplicant=new Applicant;
    this. buidFormGroup(this.addApplicant);
    this.modalService.open(modalName);
    this.isUpdate=false;


  }
  onSubmit(){
    this.submitted = true;
    if (!this.applicantForm.invalid) {
      if(this.isUpdate){
        this.applicantService.upadteApplicant(this.applicantForm.value).subscribe(
          (data)=>{
            this.modalService.dismissAll();
            this.getApplcantList();
          }
        );
      }
      else{
        this.applicantService.addApplicant(this.applicantForm.value).subscribe(
          (data)=>{
            this.modalService.dismissAll();
            this.getApplcantList();
          }
        );
      }
    
   }
  }
  editApplcant(applicant:Applicant,modalName: any){
    debugger
    this.buidFormGroup(applicant);
    this.modalService.open(modalName);
    this.isUpdate=true;

  }
  getApplcantList(){
    this.applicantService.getApplicantList().subscribe((data)=>{
      this.applicantList=data;
    })
  }
  buidFormGroup(applicant:Applicant){
    this.applicantForm = this.fb.group({
      name:new FormControl(applicant.name, [Validators.required,Validators.minLength(5)]),
      familyName:new FormControl(applicant.familyName, [Validators.required,Validators.minLength(5)]),
      address:new FormControl(applicant.address,  [Validators.required,Validators.minLength(10)]),
      countryOfOrigin: [applicant.countryOfOrigin, [Validators.required], this.customValidator.validateCountryName.bind(this.customValidator)],
      age:new FormControl(applicant.age,[ Validators.required,Validators.min(20),Validators.max(60)]),
      hired:new FormControl(applicant.hired),
      emailAdress:new FormControl(applicant.eMailAdress, Validators.email),
      id:new FormControl(applicant.id)
    });
  }
  get registerFormControl() {
    return this.applicantForm.controls;
  }
  removeApplcant(id:number,modalName:any){
  this.selectedToDeleteItem=id;
  this.modalService.open(modalName);
  }
  onConfirm(){
    this.applicantService.deleteApplicant(this.selectedToDeleteItem).subscribe(()=>{
      this.modalService.dismissAll();
      this.getApplcantList();
    })
  }

}


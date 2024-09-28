import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GroupsService} from "../../services/groups.service";
import {IGroup} from "../../models/group";
import {ToasterService} from "../../modules/toast/toaster.service";
import { Modal } from 'flowbite';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {
  GroupForm: FormGroup;
  groups!: IGroup[];
  private modalInstance: any;


  constructor(private fb:FormBuilder, private groupService: GroupsService, private toastService: ToasterService) {
    this.GroupForm = this.fb.group({
      name: ['', Validators.required],
    })
  }


  ngOnInit() {
    this.getGroups();
    // Close the modal programmatically after the group is created
    const modalElement = document.getElementById('crud-modal');
    if (modalElement) {
      const modalOptions = {
        backdrop: true,
        backdropClasses: 'bg-gray-900 bg-opacity-50 fixed inset-0 z-40',
        closable: true,
      };
      // @ts-ignore
      this.modalInstance = new Modal(modalElement, modalOptions);
    }
  }

  openModal() {
    // Open the modal using the stored instance
    if (this.modalInstance) {
      this.modalInstance.show();
    }
  }

  closeModal() {
    // Close the modal using the stored instance
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }


  getGroups(){
    this.groupService.index().subscribe((data) => {
      this.groups = data;
    })
  }

  createGroup() {
   this.groupService.create(this.GroupForm.value).subscribe((data:IGroup)=>{
     this.toastService.showToast(`Group: ${data.name} Created!`, 'success');
     this.groups.unshift(data)
     this.closeModal();
   })
  }

}

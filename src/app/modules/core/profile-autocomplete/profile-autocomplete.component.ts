import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatInput} from '@angular/material';
import {Profile} from '../../../models/profile-configuration';
import {ProfileService} from '../../../services/profile-configuration.service';
import {GroupService} from "../../../services/group.service";
import {Group} from "../../../models/group";

@Component({
  selector: 'app-profile-autocomplete',
  templateUrl: './profile-autocomplete.component.html',
  styleUrls: ['./profile-autocomplete.component.scss'],
  providers: [GroupService]
})
export class ProfileAutocompleteComponent implements OnInit {

  @ViewChild('autodescription')
  chipInput: MatInput;

  group: Group[] = [];

  @Input()
  nameSearchProfile: String = '';

  @Input()
  required: boolean = false;

  /*recebe o item e exibe na tela.*/
  @Input()
  groupSelected: Group;

  /* seleciona o item*/
  @Output() updateProfile = new EventEmitter();

  constructor(private groupService: GroupService) { }

  ngOnInit() {
    this.getProfileAll();
  }


  onKeyUpProfile(value) {
    this.nameSearchProfile = value;
  }

  changeProfiel(item) {
    this.updateProfile.emit({text: item });
  }

  getProfileAll(): void {
    this.groupService.getAll().subscribe(response => {
        this.group = response;
      },
      ex => { });
  }


  public compareProfile(c1: Group, c2: Group): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}

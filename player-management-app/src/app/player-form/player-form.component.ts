import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Player } from '../player';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.css']
})
export class PlayerFormComponent implements OnInit {
  @Input() player: Player = { name: '', position: '', age: '', team: '' };
  @Output() cancelForm = new EventEmitter<void>();

  buttonText = 'Add Player';

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {}

  onSubmit(formData: any): void {
    if (this.player) {
      // Update existing player
      this.playerService.updatePlayer({
        _id: this.player._id,
        name: formData.name,
        age: formData.age,
        position: formData.position,
        team: formData.team
      }).subscribe(() => {
        this.resetForm();
        this.playerService.refreshPlayers();
      });
    } else {
      // Create new player
      this.playerService.addPlayer({
        name: formData.name,
        age: formData.age,
        position: formData.position,
        team: formData.team
      }).subscribe(() => {
        this.resetForm();
        this.playerService.refreshPlayers();
      });
    }
  }
  resetForm() {
    throw new Error('Method not implemented.');
  }


  cancel(): void {
    this.player = { name: '', position: '', age: '', team: '' };
    this.buttonText = 'Add Player';
    this.cancelForm.emit();
  }
}

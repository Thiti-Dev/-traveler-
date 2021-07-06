import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { GetAllProofThreadResponse, ProofThread } from '../proto/proof_pb';
import { ProofService } from '../shared/services/proof.service';

@Component({
  selector: 'app-proof-thread',
  templateUrl: './proof-thread.component.html',
  styleUrls: ['./proof-thread.component.scss'],
})
export class ProofThreadComponent implements OnInit {
  enteredProofCode = new FormControl('', [Validators.required]);
  threads: null | ProofThread.AsObject[] = [];
  focused_panel: number = -1;
  constructor(private proofService: ProofService) {}

  private async fetchAllProofThreads() {
    const mapped_response = await this.proofService.getActiveThreads();
    if (mapped_response.success) {
      this.threads = mapped_response.data!.proofThreadsList;
    }
  }

  public triggerPanel(panel_id: number) {
    if (this.focused_panel === panel_id) {
      this.focused_panel = -1;
      return;
    }
    this.focused_panel = panel_id;
  }

  ngOnInit(): void {
    this.fetchAllProofThreads();
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DialogLayoutDisplay } from '@costlydeveloper/ngx-awesome-popup';
import { GetAllProofThreadResponse, ProofThread } from '../proto/proof_pb';
import { ProofService } from '../shared/services/proof.service';
import { ToastService } from '../shared/services/toast.service';
import { calculateDayPassed } from '../shared/utilities/time';

@Component({
  selector: 'app-proof-thread',
  templateUrl: './proof-thread.component.html',
  styleUrls: ['./proof-thread.component.scss'],
})
export class ProofThreadComponent implements OnInit {
  enteredProofCode = new FormControl('', [Validators.required]);
  threads: null | ProofThread.AsObject[] = [];
  focused_panel: number = -1;
  constructor(
    private proofService: ProofService,
    private toastService: ToastService
  ) {}

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
    this.enteredProofCode.reset(); // clear everytimes on triggering panel
    this.focused_panel = panel_id;
  }

  public async proofThread() {
    // we already have pointer of the thread_id and the input code
    const mapped_response = await this.proofService.proofTheSpecificThread(
      this.focused_panel,
      this.enteredProofCode.value
    );
    if (mapped_response.success) {
      const proofResponse = mapped_response.data;
      if (!proofResponse?.resultMsg?.success) {
        console.log('the code is invalid');
        this.toastService.showToastMessage(DialogLayoutDisplay.DANGER, {
          title: 'Error',
          message: 'The code is invalid',
        });
        return;
      }
      console.log('valid code');
      this.toastService.showToastMessage(DialogLayoutDisplay.SUCCESS, {
        title: 'Congratuation . . .',
        message: 'You cracked this thread before it would be reveal',
      });
      console.log(proofResponse.updatedThread);

      /*let old_thread = this.threads!.find(
        (data) => data.id === this.focused_panel
      );
      if (old_thread) {
        old_thread.isSolved = true;
      }*/
      const old_thread_id = this.threads!.findIndex(
        (data) => data.id === this.focused_panel
      );
      if (old_thread_id) {
        this.threads![old_thread_id] = proofResponse.updatedThread!;
      }
    } else {
      // error happen
    }
  }

  //
  // ─── VIS ────────────────────────────────────────────────────────────────────────
  //
  public isRevealPeriod(thread: ProofThread.AsObject) {
    const revealAt = new Date(thread.revealAt!.seconds * 1000);
    const today = new Date(Date.now());
    /*const createdAt = new Date(thread.createdAt!.seconds * 1000);
    const dayPassed = calculateDayPassed(revealAt, createdAt);
    if (dayPassed >= thread.amountOfDayWouldBeLastUntil) {
      return true;
    }
    return false;*/
    if (today >= revealAt) {
      return true;
    }
    return false;
  }
  getRemainingDay(thread: ProofThread.AsObject) {
    const revealAt = new Date(thread.revealAt!.seconds * 1000);
    const createdAt = new Date(thread.createdAt!.seconds * 1000);
    const today = new Date(Date.now());
    const dayPassed = calculateDayPassed(revealAt, today);

    if (today >= revealAt) {
      // because the (fn)calculateDayPassed does an abs
      return -dayPassed;
    }

    return dayPassed;
  }
  getDateStringFromSeconds(timestamp_seconds: number) {
    const date = new Date(timestamp_seconds * 1000);
    return date.toISOString();
  }
  // ────────────────────────────────────────────────────────────────────────────────

  ngOnInit(): void {
    this.fetchAllProofThreads();
  }
}

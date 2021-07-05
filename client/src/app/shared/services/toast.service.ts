import { Injectable } from '@angular/core';
import {
  DialogLayoutDisplay,
  ToastNotificationInitializer,
  ToastPositionEnum,
  ToastProgressBarEnum,
} from '@costlydeveloper/ngx-awesome-popup';

@Injectable({ providedIn: 'root' })
export class ToastService {
  showToastMessage(
    type: DialogLayoutDisplay,
    config: { title: string; message: string }
  ) {
    const toast = new ToastNotificationInitializer();
    toast.setTitle(config.title);
    toast.setMessage(config.message);
    toast.setConfig({
      LayoutType: type,
      ProgressBar: ToastProgressBarEnum.NONE,
      ToastPosition: ToastPositionEnum.BOTTOM_CENTER,
    });
    toast.openToastNotification$();
  }
}

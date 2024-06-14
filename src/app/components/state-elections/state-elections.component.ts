import { Component } from '@angular/core';
import { GridModule } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-state-elections',
  standalone: true,
  imports: [GridModule],
  templateUrl: './state-elections.component.html',
  styleUrl: './state-elections.component.scss'
})
export class StateElectionsComponent {
  gridData=[];
  public pageableSettings: any = {
    buttonCount: 5,
    info: true,
    type: 'numeric',
    pageSizes: [10, 20, 40, 50, 100, 'All'],
    previousNext: true
  };

  removeKendoInvalidLicance() {
    setTimeout(() => {
      // Remove the banner with the unique text content
      const banner = Array.from(document.querySelectorAll('div')).find((el) =>
        el.textContent?.includes('No valid license found for Kendo UI for Angular')
      );
      if (banner) banner.remove();
  
      // Remove the watermark element
      const watermarkElement = document.querySelector('div[kendowatermarkoverlay]');
      if (watermarkElement) {
        watermarkElement.remove();
        console.log('Watermark removed successfully.');
      } else {
        console.log('Watermark element not found.');
      }
    }, 0); 
  }
}

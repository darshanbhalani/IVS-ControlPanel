import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveElectionsComponent } from './live-elections.component';

describe('LiveElectionsComponent', () => {
  let component: LiveElectionsComponent;
  let fixture: ComponentFixture<LiveElectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveElectionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LiveElectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

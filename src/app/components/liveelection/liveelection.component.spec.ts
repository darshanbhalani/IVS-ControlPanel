import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveelectionComponent } from './liveelection.component';

describe('LiveelectionComponent', () => {
  let component: LiveelectionComponent;
  let fixture: ComponentFixture<LiveelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LiveelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

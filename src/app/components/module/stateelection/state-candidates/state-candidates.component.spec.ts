import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateCandidatesComponent } from './state-candidates.component';

describe('StateCandidatesComponent', () => {
  let component: StateCandidatesComponent;
  let fixture: ComponentFixture<StateCandidatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateCandidatesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StateCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

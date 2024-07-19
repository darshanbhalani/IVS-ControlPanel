import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateResultsComponent } from './state-results.component';

describe('StateResultsComponent', () => {
  let component: StateResultsComponent;
  let fixture: ComponentFixture<StateResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateResultsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StateResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

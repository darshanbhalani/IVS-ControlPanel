import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateElectionsComponent } from './state-elections.component';

describe('StateElectionsComponent', () => {
  let component: StateElectionsComponent;
  let fixture: ComponentFixture<StateElectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateElectionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StateElectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

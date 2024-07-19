import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateAssemblyComponent } from './state-assembly.component';

describe('StateAssemblyComponent', () => {
  let component: StateAssemblyComponent;
  let fixture: ComponentFixture<StateAssemblyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateAssemblyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StateAssemblyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

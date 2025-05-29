import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionalCuisinesComponent } from './regional-cuisines.component';

describe('RegionalCuisinesComponent', () => {
  let component: RegionalCuisinesComponent;
  let fixture: ComponentFixture<RegionalCuisinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegionalCuisinesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegionalCuisinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

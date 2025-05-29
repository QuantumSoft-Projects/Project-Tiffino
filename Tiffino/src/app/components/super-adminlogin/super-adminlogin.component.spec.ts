import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminloginComponent } from './super-adminlogin.component';

describe('SuperAdminloginComponent', () => {
  let component: SuperAdminloginComponent;
  let fixture: ComponentFixture<SuperAdminloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperAdminloginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuperAdminloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

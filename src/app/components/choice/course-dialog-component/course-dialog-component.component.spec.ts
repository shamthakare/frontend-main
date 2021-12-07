import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDialogComponentComponent } from './course-dialog-component.component';

describe('CourseDialogComponentComponent', () => {
  let component: CourseDialogComponentComponent;
  let fixture: ComponentFixture<CourseDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseDialogComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

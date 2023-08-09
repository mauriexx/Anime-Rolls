import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MalExComponent } from './mal-ex.component';

describe('MalExComponent', () => {
  let component: MalExComponent;
  let fixture: ComponentFixture<MalExComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MalExComponent]
    });
    fixture = TestBed.createComponent(MalExComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

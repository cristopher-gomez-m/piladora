import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductOpComponent } from './view-product-op.component';

describe('ViewProductOpComponent', () => {
  let component: ViewProductOpComponent;
  let fixture: ComponentFixture<ViewProductOpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewProductOpComponent]
    });
    fixture = TestBed.createComponent(ViewProductOpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

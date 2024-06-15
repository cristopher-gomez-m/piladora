import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductOpComponent } from './edit-product-op.component';

describe('EditProductOpComponent', () => {
  let component: EditProductOpComponent;
  let fixture: ComponentFixture<EditProductOpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditProductOpComponent]
    });
    fixture = TestBed.createComponent(EditProductOpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

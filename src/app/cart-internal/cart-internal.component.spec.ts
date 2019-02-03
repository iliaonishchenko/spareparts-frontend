import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartInternalComponent } from './cart-internal.component';

describe('CartInternalComponent', () => {
  let component: CartInternalComponent;
  let fixture: ComponentFixture<CartInternalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartInternalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartInternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

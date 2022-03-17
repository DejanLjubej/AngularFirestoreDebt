import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AditClientComponent } from './adit-client.component';

describe('AditClientComponent', () => {
  let component: AditClientComponent;
  let fixture: ComponentFixture<AditClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AditClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AditClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

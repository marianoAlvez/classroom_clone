import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomPagesComponent } from './room-pages.component';

describe('RoomPagesComponent', () => {
  let component: RoomPagesComponent;
  let fixture: ComponentFixture<RoomPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomPagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

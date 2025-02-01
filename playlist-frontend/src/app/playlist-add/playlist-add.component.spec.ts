import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistAddComponent } from './playlist-add.component';

describe('PlaylistAddComponent', () => {
  let component: PlaylistAddComponent;
  let fixture: ComponentFixture<PlaylistAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

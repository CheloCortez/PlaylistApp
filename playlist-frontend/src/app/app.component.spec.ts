import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PlaylistListComponent } from './playlist-list/playlist-list.component';
import { PlaylistAddComponent } from './playlist-add/playlist-add.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        PlaylistListComponent,
        PlaylistAddComponent
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
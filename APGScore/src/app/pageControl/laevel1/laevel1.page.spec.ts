import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Laevel1Page } from './laevel1.page';

describe('Laevel1Page', () => {
  let component: Laevel1Page;
  let fixture: ComponentFixture<Laevel1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Laevel1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Laevel1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

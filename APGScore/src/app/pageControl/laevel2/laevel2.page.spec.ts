import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Laevel2Page } from './laevel2.page';

describe('Laevel2Page', () => {
  let component: Laevel2Page;
  let fixture: ComponentFixture<Laevel2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Laevel2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Laevel2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

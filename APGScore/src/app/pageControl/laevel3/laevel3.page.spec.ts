import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Laevel3Page } from './laevel3.page';

describe('Laevel3Page', () => {
  let component: Laevel3Page;
  let fixture: ComponentFixture<Laevel3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Laevel3Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Laevel3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
